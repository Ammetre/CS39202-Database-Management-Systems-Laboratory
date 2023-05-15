#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "libpq-fe.h"

void perform_query(const char *query)
{
    char* names=(char*)calloc(100,sizeof(char));    //maybe PQconnectdb using constant string works too, but this works so I didnt change it
    names = strcat(names,"host=127.0.0.1 port=5432 dbname=20CS30006 user=20CS30006 password=20CS30006");
    PGconn *conn = PQconnectdb(names);      //connecting to the database
    if (PQstatus(conn) == CONNECTION_OK)
    {
        PGresult *res = PQexec(conn, query);    //execute query on the connection (of course it has to take the connection as an argument as there is no notin of a class)
        if (PQresultStatus(res) == PGRES_TUPLES_OK)     //if results are OK
        {
            int rows = PQntuples(res);      //number of tuples
            int fields = PQnfields(res);    //number of fields
            int i, j;                       //loop variable

            for (i = 0; i < fields; i++)
            {
                char n[3] = {'\0', '\0', '\0'}; 
                sprintf(n, "%d", 91+i);
                char clr[20];
                clr[0]='\0';
                strcat(clr,"\033[1;4;");
                strcat(clr,n);
                strcat(clr,"m");                //7 lines for custom coloured output (it is very awkward to handle strings in C)
                char* op = NULL;                //string to get the field name
                op = PQfname(res, i);           //getting the field name
                printf("%s%s\033[m", clr, op);  //printing the field name
                for(int i = 0; i < 20-strlen(op); i++){
                    printf(" ");                //fixed width of 20 for each field for better formatting
                }
            }
            printf("\n");                       //newline

            for (i = 0; i < rows; i++)
            {
                for (j = 0; j < fields; j++)
                {
                    char n[3] = {'\0', '\0', '\0'};
                    sprintf(n, "%d", 31+j);
                    char clr[20];
                    clr[0]='\0';
                    strcat(clr,"\033[2;");
                    strcat(clr,n);
                    strcat(clr,"m");            //7 lines for custom colouring output (it is very awkward to handle strings in C)
                    char* op = NULL;            //string to get the tuple value
                    op = PQgetvalue(res, i, j); //getting the tuple value
                    printf("%s%s\033[m", clr, op);  //printing the tuple value
                    for(int i = 0; i < 20-strlen(op); i++){
                        printf(" ");            //fixed width of 20 for each field for better formatting
                    }
                }
                printf("\n");                   //newline
            }
        }
        else
        {
            printf("Error: Unable to execute the query\n");     //error handling
        }

        PQclear(res);                           //freeing up stuff
        PQfinish(conn);                         //freeing up stuff
    }
    else
    {
        printf("Error: Unable to connect to the database\n");   //erro handling
    }
}

int main(void)
{
    int choice = -1;        //initializing
    char* query = NULL;     //query string (is used in 13th query)

    while (choice != 0)
    {
        printf("SQL Task Menu\n");  //Menu printing
        for(int i=1;i<=13;i++){
            printf("%d. Perform Query %d\n",i,i);   //printing the options
        }
        printf("0. Exit\n");        //exit option
        printf("Enter your choice: ");  //now it wants user to input
        scanf("%d", &choice);       //takes in the choice
        if (choice == 1)
        {   //performs query 1
            perform_query("SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery') AS Details;");
        }
        else if (choice == 2)
        {   //perform query 2
            perform_query("SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\", Department, Affiliated_with WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery' AND Department.Name='Cardiology' AND Department.DepartmentID=Affiliated_with.Department AND Physician.EmployeeID=Affiliated_with.Physician) AS Details;");
        }
        else if (choice == 3)
        {   //perform query 3
            perform_query("SELECT Name FROM (SELECT DISTINCT Nurse.EmployeeID, Nurse.Name as Name FROM Nurse, Room, On_Call WHERE Nurse.EmployeeID=On_Call.Nurse AND On_Call.BlockCode=Room.BlockCode AND On_Call.BlockFloor=Room.BlockFloor AND Room.Number=123) AS Details;");
        }
        else if (choice == 4)
        {   //perform query 4
            perform_query("SELECT Name, Address FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.Address AS Address FROM Patient, Prescribes, Medication WHERE Patient.SSN=Prescribes.Patient AND Prescribes.Medication=Medication.Code AND Medication.Name='remdesivir' ) AS Details ;");
        }
        else if (choice == 5)
        {   //perform query 5
            perform_query("SELECT Name, InsuranceID FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.InsuranceID AS InsuranceID FROM Patient, Room, Stay WHERE Patient.SSN=Stay.Patient AND Stay.Room=Room.Number AND Room.Type='icu' AND DATE_PART('day', Stay.\"End\"::timestamp - Stay.Start::timestamp)>15 ) AS Details ;");
        }
        else if (choice == 6)
        {   //perform query 6
            perform_query("SELECT Name FROM (SELECT DISTINCT Nurse.Name AS Name FROM Nurse, Undergoes, \"Procedure\" WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery') AS Details ;");
        }
        else if (choice == 7)
        {   //perform query 7
            perform_query("SELECT Nurse.Name AS \"Nurse_Name\", Nurse.Position AS \"Nurse_Position\", Physician.Name AS \"Physician_Name\" FROM Nurse, Undergoes, \"Procedure\", Physician WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery' AND Undergoes.Physician=Physician.EmployeeID ;");
        }
        else if (choice == 8)
        {   //perform query 8
            perform_query("SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes WHERE Physician.EmployeeID=Undergoes.Physician AND (Physician.EmployeeID, Undergoes.\"Procedure\") NOT IN ( SELECT Physician, Treatment FROM Trained_In ) ) AS Details ;");
        }
        else if (choice == 9)
        {   //perform query 9
            perform_query("SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes, Trained_In WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 ) AS Details ;");
        }
        else if (choice == 10)
        {   //perform query 10
            perform_query("SELECT Physician.Name AS Physician_Name, \"Procedure\".Name AS Procedure_Name, Patient.Name AS Patient_Name, Undergoes.Date AS Date FROM Physician, Undergoes, Trained_In, \"Procedure\", Patient WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 AND Undergoes.\"Procedure\"=\"Procedure\".Code AND Undergoes.Patient=Patient.SSN ;");
        }
        else if (choice == 11)
        {   //perform query 11
            perform_query("SELECT Patient_Name, Physician_Name FROM ( SELECT DISTINCT Patient.Name as Patient_Name, PCP.Name AS Physician_Name FROM Patient, Physician AS PCP, Prescribes, Undergoes, \"Procedure\" WHERE Patient.SSN=Prescribes.Patient AND Patient.SSN=Undergoes.Patient AND Prescribes.Physician=Patient.PCP AND PCP.EmployeeID=Patient.PCP AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Cost>5000 AND PCP.EmployeeID NOT IN ( SELECT Head FROM Department ) AND ( SELECT COUNT(*) FROM Patient, Physician AS GP, Appointment, Department, Affiliated_with WHERE Patient.SSN=Appointment.Patient AND GP.EmployeeID=Appointment.Physician AND GP.EmployeeID=Affiliated_with.Physician AND Department.DepartmentID=Affiliated_with.Department AND Department.name='Cardiology' )>=2 ) AS Details ;");
        }
        else if (choice == 12)
        {   //perform query 12
            perform_query("WITH Med_Stat(Freq, Code, Name, Brand) AS ( SELECT COUNT(*), Medication.Code, Medication.Name, Medication.Brand FROM Medication, Prescribes WHERE Prescribes.Medication=Medication.Code GROUP BY Medication.Code, Medication.Name, Medication.Brand ) SELECT Name, Brand FROM Med_Stat WHERE Freq >= ALL ( SELECT Freq FROM Med_Stat ) ;");
        }
        else if (choice == 13)
        {
            query=(char*)malloc(1024*sizeof(char));
            printf("Enter a Procedure: \n");    //give user input prompt
            char proc[100];
            fflush(stdout);
            scanf("%s",proc);   //take in the procedure name
            //print the full query to 'query' variable
            sprintf(query, "SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='%s') AS Details;", proc);
            //printf("%s\n",query);
            //perform query 13
            perform_query(query);
            //memory leak prevention
            free(query);
        }
        else if (choice == 0)
        {
            printf("Exiting the program...\n");     //exit
        }
        else
        {
            printf("Invalid choice. Try again.\n");     //invalidity
        }
    }

    return 0;
}
