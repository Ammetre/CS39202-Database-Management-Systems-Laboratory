import java.util.Locale;    //to help printing in different situations
import java.util.Scanner;   //to take inputs
import java.sql.*;          //to handle sql queries
public class Main {         //main class
    public static void main(String[] args) {    //main method
        Scanner scanner = new Scanner(System.in);   //scanner scanning stdin
        while (true) {
            System.out.println("\nMenu:");      //prints the Menu
            for(int i=1;i<=13;i++){
                System.out.format(Locale.ENGLISH, "%d. Perform Query %d\n",i,i);    //prints the options 1-13 in English Locale
            }
            System.out.println("0. Exit");      //print exit option
            System.out.print("Enter your choice: ");    //for better interface
            int choice = scanner.nextInt();     //takes user input (keeps hanging \n)
            switch (choice) {
                case 1:
                    //perform query 1
                    performQuery("SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery') AS Details;");
                    break;
                case 2:
                    //perform query 2
                    performQuery("SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\", Department, Affiliated_with WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='bypass surgery' AND Department.Name='Cardiology' AND Department.DepartmentID=Affiliated_with.Department AND Physician.EmployeeID=Affiliated_with.Physician) AS Details;");
                    break;
                case 3:
                    //perform query 3
                    performQuery("SELECT Name FROM (SELECT DISTINCT Nurse.EmployeeID, Nurse.Name as Name FROM Nurse, Room, On_Call WHERE Nurse.EmployeeID=On_Call.Nurse AND On_Call.BlockCode=Room.BlockCode AND On_Call.BlockFloor=Room.BlockFloor AND Room.Number=123) AS Details;");
                    break;
                case 4:
                    //perform query 4
                    performQuery("SELECT Name, Address FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.Address AS Address FROM Patient, Prescribes, Medication WHERE Patient.SSN=Prescribes.Patient AND Prescribes.Medication=Medication.Code AND Medication.Name='remdesivir' ) AS Details ;");
                    break;
                case 5:
                    //perform query 5
                    performQuery("SELECT Name, InsuranceID FROM ( SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.InsuranceID AS InsuranceID FROM Patient, Room, Stay WHERE Patient.SSN=Stay.Patient AND Stay.Room=Room.Number AND Room.Type='icu' AND DATE_PART('day', Stay.\"End\"::timestamp - Stay.Start::timestamp)>15 ) AS Details ;");
                    break;
                case 6:
                    //perform query 6
                    performQuery("SELECT Name FROM (SELECT DISTINCT Nurse.Name AS Name FROM Nurse, Undergoes, \"Procedure\" WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery') AS Details ;");
                    break;
                case 7:
                    //perform query 7
                    performQuery("SELECT Nurse.Name AS \"Nurse_Name\", Nurse.Position AS \"Nurse_Position\", Physician.Name AS \"Physician_Name\" FROM Nurse, Undergoes, \"Procedure\", Physician WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Name='bypass surgery' AND Undergoes.Physician=Physician.EmployeeID ;");
                    break;
                case 8:
                    //perform query 8
                    performQuery("SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes WHERE Physician.EmployeeID=Undergoes.Physician AND (Physician.EmployeeID, Undergoes.\"Procedure\") NOT IN ( SELECT Physician, Treatment FROM Trained_In ) ) AS Details ;");
                    break;
                case 9:
                    //perform query 9
                    performQuery("SELECT Name FROM ( SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name FROM Physician, Undergoes, Trained_In WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 ) AS Details ;");
                    break;
                case 10:
                    //perform query 10
                    performQuery("SELECT Physician.Name AS Physician_Name, \"Procedure\".Name AS Procedure_Name, Patient.Name AS Patient_Name, Undergoes.Date AS Date FROM Physician, Undergoes, Trained_In, \"Procedure\", Patient WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes.\"Procedure\"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 AND Undergoes.\"Procedure\"=\"Procedure\".Code AND Undergoes.Patient=Patient.SSN ;");
                    break;
                case 11:
                    //perform query 11
                    performQuery("SELECT Patient_Name, Physician_Name FROM ( SELECT DISTINCT Patient.Name as Patient_Name, PCP.Name AS Physician_Name FROM Patient, Physician AS PCP, Prescribes, Undergoes, \"Procedure\" WHERE Patient.SSN=Prescribes.Patient AND Patient.SSN=Undergoes.Patient AND Prescribes.Physician=Patient.PCP AND PCP.EmployeeID=Patient.PCP AND Undergoes.\"Procedure\"=\"Procedure\".Code AND \"Procedure\".Cost>5000 AND PCP.EmployeeID NOT IN ( SELECT Head FROM Department ) AND ( SELECT COUNT(*) FROM Patient, Physician AS GP, Appointment, Department, Affiliated_with WHERE Patient.SSN=Appointment.Patient AND GP.EmployeeID=Appointment.Physician AND GP.EmployeeID=Affiliated_with.Physician AND Department.DepartmentID=Affiliated_with.Department AND Department.name='Cardiology' )>=2 ) AS Details ;");
                    break;
                case 12:
                    //perform query 12 
                    performQuery("WITH Med_Stat(Freq, Code, Name, Brand) AS ( SELECT COUNT(*), Medication.Code, Medication.Name, Medication.Brand FROM Medication, Prescribes WHERE Prescribes.Medication=Medication.Code GROUP BY Medication.Code, Medication.Name, Medication.Brand ) SELECT Name, Brand FROM Med_Stat WHERE Freq >= ALL ( SELECT Freq FROM Med_Stat ) ;");
                    break;
                case 13:
                    String proc=scanner.nextLine(); //to remove the \n after the integer
                    proc = scanner.nextLine();      //here we take in the name
                    proc = proc.replaceAll("'","\\'"); //to subvert injection
                    //perform query 13
                    performQuery("SELECT Name FROM (SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name FROM Physician, Trained_In, \"Procedure\" WHERE Physician.EmployeeID=Trained_In.Physician AND \"Procedure\".Code=Trained_In.Treatment AND \"Procedure\".Name='"+proc+"') AS Details;");
                    break;     
                case 0:
                    //exit
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;
                default:
                    //invalid case
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
    public static void performQuery(String query) {
        final String DRIVER = "org.postgresql.Driver";                      //JDBC Driver
        final String URL = "jdbc:postgresql://localhost:5432/20CS30006";    //IP, Port and Database
        final String USER = "20CS30006";                                    //Username
        final String PASSWORD = "20CS30006";                                //Password
        Connection connection = null;
        Statement statement = null;
        try {
            Class.forName(DRIVER);                                          //gets the driver class
            connection = DriverManager.getConnection(URL, USER, PASSWORD);  //connects to the PSQL server given database, user, password
            statement = connection.createStatement();                       //creates statement object for passing SQL query
            ResultSet resultSet = statement.executeQuery(query);            //gets the result of the query
            ResultSetMetaData rsmd = resultSet.getMetaData();               //gets the metadata (as in column names)
            int columnsNumber = rsmd.getColumnCount();                      //we need to know how many columns are there
            for(int i=1;i<=columnsNumber;i++){
                String n = String.valueOf(90+i);
                String clr = "\033[1;4;"+n+"m";                             //for coloured output (better user interface)
                System.out.print(clr+rsmd.getColumnName(i)+"\033[0m"+" ".repeat(20-rsmd.getColumnName(i).length()));    //fixed width of 20 for each field, for better formatting
            }
            System.out.println("");                                         //newline
            while (resultSet.next()) {
                for (int i = 1; i <= columnsNumber; i++) {
                    String n = String.valueOf(30+i);
                    String clr = "\033[2;"+n+"m";                           //for coloured output (better user interface)
                    String columnValue = resultSet.getString(i);            //get the actual result value
                    System.out.print(clr+columnValue + "\033[0m"+" ".repeat(20-columnValue.length()));  //fixed width of 20 for each field, for better formatting 
                }
                System.out.println("");                                     //newline
            }
        } catch (ClassNotFoundException e) {
            System.out.println("Error: Unable to load the driver class");   //error handling
        } catch (SQLException e) {
            System.out.println("Error: Unable to execute the query");       //error handling
        } finally {
            try {
                if (statement != null) {
                    statement.close();                                      //closing up
                }
                if (connection != null) {
                    connection.close();                                     //closing up
                }
            } catch (SQLException e) {
                System.out.println("Error: Unable to close the connection");//error in closing
            }
        }
    }
}
