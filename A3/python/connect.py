import psycopg2 

def perform_query(query):
    connection = 0
    #connecting to the database
    connection = psycopg2.connect(
        host="127.0.0.1",           #host ip
        port="5432",                #host port
        database="20CS30006",       #database name
        user="20CS30006",           #username
        password="20CS30006"        #password
    )
    # print(connection)
    cursor = connection.cursor()    #cursor object for executing queries
    cursor.execute(query)           #executing query
    result = cursor.fetchall()      #result of the execution
    columns = [column[0] for column in cursor.description]      #getting the column names
    for i in range(len(columns)):
        n=91+i
        clr='\033[1;4;'+str(n)+'m'          #for coloured output (for better user interface)
        print(clr+str(columns[i])+'\033[0m',end=' '*(20-len(str(columns[i]))))  #fixed with of 20 for each field for better formatting
    print("")                           #newline
    for row in result:                  #for each row
        for i in range(len(row)):
            n=31+i
            clr='\033[2;'+str(n)+'m'        #for coloured output (for better user interface)
            print(clr+str(row[i])+'\033[0m',end=' '*(20-len(str(row[i]))))      #fixed with of 20 fie each field for better formatting
        print("")                       #newline
    if connection:
        connection.close()              #closing up the connection

def main_menu():
    choice = -1     #initial value
    while choice != 0:      #loop until '0' is pressed
        print("SQL Task Menu")
        for i in range(1,14):
            print(str(i)+". Perform Query "+str(i))     #print the menu
        print("0. Exit")        #print the exit option
        choice = int(input("Enter your choice: "))  #take in the input
        if choice == 1:         #perform query 1
            query = "SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery') AS Details;"
            perform_query(query)
        elif choice == 2:       #perform query 2
            query = "SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\", Department, Affiliated_with WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery' AND Department.Name='Cardiology' AND Department.DepartmentID=Affiliated_with.Department AND Physician.EmployeeID=Affiliated_with.Physician) AS Details;"
            perform_query(query)
        elif choice == 3:       #perform query 3
            query = "SELECT Name FROM (SELECT DISTINCT Nurse.EmployeeID, Nurse.Name as Name FROM Nurse, Room, On_Call WHERE Nurse.EmployeeID=On_Call.Nurse AND On_Call.BlockCode=Room.BlockCode AND On_Call.BlockFloor=Room.BlockFloor AND Room.Number=123) AS Details;"
            perform_query(query)
        elif choice == 4:       #perform query 4
            query = "SELECT Name, Address FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.Address AS Address FROM Patient, Prescribes, Medication WHERE Patient.SSN=Prescribes.Patient AND Prescribes.Medication=Medication.Code AND Medication.Name='remdesivir' ) AS Details ;"
            perform_query(query)
        elif choice == 5:       #perform query 5
            query = "SELECT Name, InsuranceID FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.InsuranceID AS InsuranceID FROM Patient, Room, Stay WHERE Patient.SSN=Stay.Patient AND Stay.Room=Room.Number AND Room.Type='icu' AND DATE_PART('day', Stay.\"End\"::timestamp - Stay.Start::timestamp)>15 ) AS Details ;"
            perform_query(query)
        elif choice == 6:       #perform query 6
            query = "SELECT Name FROM (SELECT DISTINCT Nurse.Name AS Name FROM Nurse, Undergoes, \"Procedure\" WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery') AS Details ;"
            perform_query(query)
        elif choice == 7:       #perform query 7
            query = "SELECT Nurse.Name AS \"Nurse_Name\", Nurse.Position AS \"Nurse_Position\", Physician.Name AS \"Physician_Name\" FROM Nurse, Undergoes, \"Procedure\", Physician WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery' AND Undergoes.Physician=Physician.EmployeeID ;"
            perform_query(query)
        elif choice == 8:       #perform query 8
            query = "SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes WHERE Physician.EmployeeID=Undergoes.Physician AND (Physician.EmployeeID, Undergoes.\"Procedure\") NOT IN ( SELECT Physician, Treatment FROM Trained_In ) ) AS Details ;"
            perform_query(query)
        elif choice == 9:       #perform query 9
            query = "SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes, Trained_In WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 ) AS Details ;"
            perform_query(query)
        elif choice == 10:      #perform query 10
            query = "SELECT Physician.Name AS Physician_Name, \"Procedure\".Name AS Procedure_Name, Patient.Name AS Patient_Name, Undergoes.Date AS Date FROM Physician, Undergoes, Trained_In, \"Procedure\", Patient WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 AND Undergoes.\"Procedure\"=\"Procedure\".Code AND Undergoes.Patient=Patient.SSN ;"
            perform_query(query)
        elif choice == 11:      #perform query 11
            query = "SELECT Patient_Name, Physician_Name FROM ( SELECT DISTINCT Patient.Name as Patient_Name, PCP.Name AS Physician_Name FROM Patient, Physician AS PCP, Prescribes, Undergoes, \"Procedure\" WHERE Patient.SSN=Prescribes.Patient AND Patient.SSN=Undergoes.Patient AND Prescribes.Physician=Patient.PCP AND PCP.EmployeeID=Patient.PCP AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Cost>5000 AND PCP.EmployeeID NOT IN ( SELECT Head FROM Department ) AND ( SELECT COUNT(*) FROM Patient, Physician AS GP, Appointment, Department, Affiliated_with WHERE Patient.SSN=Appointment.Patient AND GP.EmployeeID=Appointment.Physician AND GP.EmployeeID=Affiliated_with.Physician AND Department.DepartmentID=Affiliated_with.Department AND Department.name='Cardiology' )>=2 ) AS Details ;"
            perform_query(query)
        elif choice == 12:      #perform query 12
            query = "WITH Med_Stat(Freq, Code, Name, Brand) AS ( SELECT COUNT(*), Medication.Code, Medication.Name, Medication.Brand FROM Medication, Prescribes WHERE Prescribes.Medication=Medication.Code GROUP BY Medication.Code, Medication.Name, Medication.Brand ) SELECT Name, Brand FROM Med_Stat WHERE Freq >= ALL ( SELECT Freq FROM Med_Stat ) ;"
            perform_query(query)
        elif choice == 13:
            proc=input("Enter procedure name: ")  #take input of the procedure
            proc.replace("'","\\'")     #to subvert injection
            #perform query 13
            query = "SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='"+proc+"') AS Details;"
            perform_query(query)        
        elif choice == 0:
            #exit
            print("Exiting the program...")
        else:
            #invalid case
            print("Invalid choice. Try again.")

if __name__ == "__main__":  #main
    main_menu()