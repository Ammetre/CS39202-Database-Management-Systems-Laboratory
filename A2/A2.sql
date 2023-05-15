CREATE TABLE Physician (
    EmployeeID int NOT NULL,
    Name TEXT NOT NULL,
    Position TEXT NOT NULL,
    SSN int NOT NULL,
    PRIMARY KEY (EmployeeID)
);
CREATE TABLE Patient (
    SSN int NOT NULL,
    Name TEXT NOT NULL,
    Address TEXT NOT NULL,
    Phone TEXT NOT NULL,
    InsuranceID int NOT NULL,
    PCP int NOT NULL,
    PRIMARY KEY (SSN),
    FOREIGN KEY (PCP) REFERENCES Physician(EmployeeID)
);
CREATE TABLE Department (
    DepartmentID int NOT NULL,
    Name TEXT NOT NULL,
    HEAD int NOT NULL,
    PRIMARY KEY (DepartmentID),
    FOREIGN KEY (HEAD) REFERENCES Physician(EmployeeID)
);
CREATE TABLE Affiliated_with (
    Physician int NOT NULL,
    Department int NOT NULL,
    PrimaryAffiliation BOOLEAN NOT NULL,
    PRIMARY KEY (Physician,Department),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY (Department) REFERENCES Department(DepartmentID)
);
CREATE TABLE "Procedure" (
    Code int NOT NULL,
    Name TEXT NOT NULL,
    Cost int NOT NULL,
    PRIMARY KEY (Code)
);
CREATE TABLE Nurse (
    EmployeeID int NOT NULL,
    Name TEXT NOT NULL,
    Position TEXT NOT NULL,
    Registered BOOLEAN NOT NULL,
    SSN int NOT NULL,
    PRIMARY KEY (EmployeeID)
);
CREATE TABLE Appointment (
    AppointmentID int NOT NULL,
    Patient int NOT NULL,
    PrepNurse int,
    Physician int NOT NULL,
    Start TIMESTAMP NOT NULL,
    "End" TIMESTAMP NOT NULL,
    ExaminationRoom TEXT NOT NULL,
    PRIMARY KEY (AppointmentID),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (PrepNurse) REFERENCES Nurse(EmployeeID),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID)
);
CREATE TABLE Block (
    Floor int NOT NULL,
    Code int NOT NULL,
    PRIMARY KEY (Floor,Code)
);
CREATE TABLE Room (
    Number int NOT NULL,
    Type TEXT NOT NULL,
    BlockFloor int NOT NULL,
    BlockCode int NOT NULL,
    Unavailable BOOLEAN NOT NULL,
    PRIMARY KEY (Number),
    FOREIGN KEY (BlockFloor,BlockCode) REFERENCES Block(Floor,Code)
);
CREATE TABLE Stay (
    StayID int NOT NULL,
    Patient int NOT NULL,
    Room int NOT NULL,
    Start TIMESTAMP NOT NULL,
    "End" TIMESTAMP NOT NULL,
    PRIMARY KEY (StayID),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (Room) REFERENCES Room(Number)
);
CREATE TABLE Medication (
    Code int NOT NULL,
    Name TEXT NOT NULL,
    Brand TEXT NOT NULL,
    Description TEXT NOT NULL,
    PRIMARY KEY (Code)
);
CREATE TABLE Prescribes (
    Physician int NOT NULL,
    Patient int NOT NULL,
    Medication int NOT NULL,
    Date TIMESTAMP NOT NULL,
    Appointment int,
    Dose TEXT NOT NULL,
    PRIMARY KEY (Physician,Patient,Medication,Date),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY (Medication) REFERENCES Medication(Code),
    FOREIGN KEY (Appointment) REFERENCES Appointment(AppointmentID)
);
CREATE TABLE On_Call (
    Nurse int NOT NULL,
    BlockFloor int NOT NULL,
    BlockCode int NOT NULL,
    Start TIMESTAMP NOT NULL,
    "End" TIMESTAMP NOT NULL,
    PRIMARY KEY (Nurse,BlockFloor,BlockCode,Start,"End"),
    FOREIGN KEY (Nurse) REFERENCES Nurse(EmployeeID),
    FOREIGN KEY (BlockFloor,BlockCode) REFERENCES Block(Floor,Code)
);
CREATE TABLE Trained_In (
    Physician int NOT NULL,
    Treatment int NOT NULL,
    CertificationDate TIMESTAMP NOT NULL,
    CertificationExpires TIMESTAMP NOT NULL,
    PRIMARY KEY (Physician,Treatment),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY (Treatment) REFERENCES "Procedure"(Code)
);
CREATE TABLE Undergoes (
    Patient int NOT NULL,
    "Procedure" int NOT NULL,
    Stay int NOT NULL,
    Date TIMESTAMP,
    Physician int NOT NULL,
    AssistingNurse int,
    PRIMARY KEY (Patient,"Procedure",Stay,Date),
    FOREIGN KEY (Patient) REFERENCES Patient(SSN),
    FOREIGN KEY ("Procedure") REFERENCES "Procedure"(Code),
    FOREIGN KEY (Stay) REFERENCES Stay(StayID),
    FOREIGN KEY (Physician) REFERENCES Physician(EmployeeID),
    FOREIGN KEY (AssistingNurse) REFERENCES Nurse(EmployeeID)
);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (1,'Anubhav','Gawd',0);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (2,'Chirag','Dealer',69);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (3,'Aritra','Manager',-2);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (4,'Shila','Governor',155);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (5,'Dhruv','Consumer',89);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (6,'Palod','Foreign Key',42);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (7,'Sebans','Leader',1023);
INSERT INTO Physician (EmployeeID,Name,Position,SSN) VALUES (8,'Anand','A',10);
INSERT INTO Patient (SSN,Name,Address,Phone,InsuranceID,PCP) VALUES (32,'Souvik','MS','080808',23,6);
INSERT INTO Patient (SSN,Name,Address,Phone,InsuranceID,PCP) VALUES (64,'Likhith','RK','808080',46,7);
INSERT INTO Patient (SSN,Name,Address,Phone,InsuranceID,PCP) VALUES (59,'Vivek','RP','990099',95,5);
INSERT INTO Patient (SSN,Name,Address,Phone,InsuranceID,PCP) VALUES (11,'Swarup','Azad','112211',11,5);
INSERT INTO Patient (SSN,Name,Address,Phone,InsuranceID,PCP) VALUES (-2,'Aritra','Kolkata','011001',2,3);
INSERT INTO Department (DepartmentID,Name,Head) VALUES (1,'cardiology',4);
INSERT INTO Department (DepartmentID,Name,Head) VALUES (2,'AGB',1);
INSERT INTO Department (DepartmentID,Name,Head) VALUES (3,'CP',7);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (1,1,false);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (1,2,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (2,2,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (3,1,false);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (3,2,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (4,1,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (5,1,false);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (5,2,false);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (5,3,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (6,1,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (7,1,false);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (7,3,true);
INSERT INTO Affiliated_with (Physician,Department,PrimaryAffiliation) VALUES (8,3,true);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (9,'Soni','Senior',true,1);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (10,'Atulya','Junior',false,-1000);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (11,'Virinchi','Collector',true,400);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (12,'JKT','Head',true,3000);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (13,'Saransh','Che',false,2014);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (14,'Nyati','A',true,2);
INSERT INTO Nurse (EmployeeID,Name,Position,Registered,SSN) VALUES (15,'Visol','High',true,803);
INSERT INTO "Procedure" (Code,Name,Cost) VALUES (1,'caesarian',0);
INSERT INTO "Procedure" (Code,Name,Cost) VALUES (2,'bypass surgery',1000000);
INSERT INTO "Procedure" (Code,Name,Cost) VALUES (3,'appendectomy',2000);
INSERT INTO "Procedure" (Code,Name,Cost) VALUES (4,'liposuction',6000);
INSERT INTO "Procedure" (Code,Name,Cost) VALUES (5,'phacosurgery',10000);
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (1,11,9,5,TO_TIMESTAMP('2022-04-19 07:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-04-19 07:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'D-442');
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (2,59,14,5,TO_TIMESTAMP('2022-08-01 07:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-08-01 07:30:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'D-442');
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (3,59,13,5,TO_TIMESTAMP('2022-12-13 08:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-12-13 17:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'NC441');
INSERT INTO Appointment (AppointmentID,Patient,Physician,Start,"End",ExaminationRoom) VALUES (4,-2,3,TO_TIMESTAMP('2023-01-09 00:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2023-01-09 00:00:05.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'Sleep');
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (5,32,15,1,TO_TIMESTAMP('2022-01-15 21:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-01-15 21:05:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'2.2');
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (6,32,10,2,TO_TIMESTAMP('2022-01-15 22:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-01-15 23:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'TSG');
INSERT INTO Appointment (AppointmentID,Patient,PrepNurse,Physician,Start,"End",ExaminationRoom) VALUES (7,32,12,3,TO_TIMESTAMP('2022-01-20 19:00:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),TO_TIMESTAMP('2022-01-20 19:10:00.00', 'YYYY-MM-DD HH24:MI:SS.FF'),'CSE-120');
INSERT INTO Block (Floor,Code) VALUES (1,1);
INSERT INTO Block (Floor,Code) VALUES (2,1);
INSERT INTO Block (Floor,Code) VALUES (1,2);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (110,'icu',1,1,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (111,'icu',1,1,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (112,'icu',1,1,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (113,'icu',1,1,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (121,'general',1,2,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (122,'general',1,2,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (123,'general',1,2,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (124,'general',1,2,false);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (210,'reserved',2,1,true);
INSERT INTO Room (Number,Type,BlockFloor,BlockCode,Unavailable) VALUES (211,'reserved',2,1,true);
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (1,-2,112,TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-21', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (2,32,121,TO_TIMESTAMP('2022-01-09', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (3,64,122,TO_TIMESTAMP('2022-04-11', 'YYYY-MM-DD'),TO_TIMESTAMP('2022-07-11', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (4,32,121,TO_TIMESTAMP('2023-01-11', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-13', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (5,11,210,TO_TIMESTAMP('2022-04-18', 'YYYY-MM-DD'),TO_TIMESTAMP('2022-05-19', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (6,32,123,TO_TIMESTAMP('2023-01-15', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-16', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (7,11,211,TO_TIMESTAMP('2022-07-23', 'YYYY-MM-DD'),TO_TIMESTAMP('2022-09-28', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (8,32,121,TO_TIMESTAMP('2023-01-19', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-25', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (9,59,110,TO_TIMESTAMP('2022-08-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2022-11-09', 'YYYY-MM-DD'));
INSERT INTO Stay (StayID,Patient,Room,Start,"End") VALUES (10,59,110,TO_TIMESTAMP('2022-12-12', 'YYYY-MM-DD'),TO_TIMESTAMP('2023-01-14', 'YYYY-MM-DD'));
INSERT INTO Medication (Code,Name,Brand,Description) VALUES (1,'remdesivir','PM','Was in PS');
INSERT INTO Medication (Code,Name,Brand,Description) VALUES (2,'Paracetamol','AGB','Be Happy');
INSERT INTO Medication (Code,Name,Brand,Description) VALUES (3,'Saffronil','VML','BZK');
INSERT INTO Medication (Code,Name,Brand,Description) VALUES (4,'Copium','GD','Need');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (3,-2,4,TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'),4,'Once Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (5,11,1,TO_TIMESTAMP('2022-04-19', 'YYYY-MM-DD'),1,'Twice Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (5,59,1,TO_TIMESTAMP('2022-08-01', 'YYYY-MM-DD'),2,'Once Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (5,59,1,TO_TIMESTAMP('2022-12-13', 'YYYY-MM-DD'),3,'Twice Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (1,32,2,TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'),5,'4 Times Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Appointment,Dose) VALUES (2,32,2,TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'),6,'Twice Daily');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Dose) VALUES (7,64,3,TO_TIMESTAMP('2023-01-09', 'YYYY-MM-DD'),'Once');
INSERT INTO Prescribes (Physician,Patient,Medication,Date,Dose) VALUES (6,32,1,TO_TIMESTAMP('2022-05-01', 'YYYY-MM-DD'),'Once Daily');
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (9,1,2,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (10,2,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (11,2,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (12,1,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (13,1,2,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (14,1,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (15,1,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('1980-12-31', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (15,1,2,TO_TIMESTAMP('1981-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('1991-12-31', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (15,2,1,TO_TIMESTAMP('1992-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2002-12-31', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (15,1,1,TO_TIMESTAMP('2003-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2013-12-31', 'YYYY-MM-DD'));
INSERT INTO On_Call (Nurse,BlockFloor,BlockCode,Start,"End") VALUES (15,1,2,TO_TIMESTAMP('2014-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2024-12-31', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (1,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (2,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (3,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (4,1,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2070-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (1,3,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2025-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (1,4,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2025-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (2,3,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (2,4,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (3,3,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2025-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (3,4,TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2025-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (5,5,TO_TIMESTAMP('2000-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (7,5,TO_TIMESTAMP('2001-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2024-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (8,2,TO_TIMESTAMP('2000-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2025-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (1,2,TO_TIMESTAMP('2000-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2019-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (6,2,TO_TIMESTAMP('2000-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2001-01-01', 'YYYY-MM-DD'));
INSERT INTO Trained_In (Physician,Treatment,CertificationDate,CertificationExpires) VALUES (3,2,TO_TIMESTAMP('2002-01-01', 'YYYY-MM-DD'),TO_TIMESTAMP('2018-01-01', 'YYYY-MM-DD'));
INSERT INTO Undergoes (Patient,"Procedure",Stay,Date,Physician,AssistingNurse) VALUES (64,5,3,TO_TIMESTAMP('2022-06-25', 'YYYY-MM-DD'),7,12);
INSERT INTO Undergoes (Patient,"Procedure",Stay,Date,Physician) VALUES (32,3,6,TO_TIMESTAMP('2023-01-15', 'YYYY-MM-DD'),1);
INSERT INTO Undergoes (Patient,"Procedure",Stay,Date,Physician,AssistingNurse) VALUES (32,4,6,TO_TIMESTAMP('2023-01-15', 'YYYY-MM-DD'),2,10);
INSERT INTO Undergoes (Patient,"Procedure",Stay,Date,Physician,AssistingNurse) VALUES (32,2,8,TO_TIMESTAMP('2023-01-22', 'YYYY-MM-DD'),6,11);
INSERT INTO Undergoes (Patient,"Procedure",Stay,Date,Physician,AssistingNurse) VALUES (59,2,9,TO_TIMESTAMP('2022-10-05', 'YYYY-MM-DD'),7,14);
SELECT Name
    FROM (
        SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name
        FROM Physician, Trained_In, "Procedure"
        WHERE Physician.EmployeeID=Trained_In.Physician AND "Procedure".Code=Trained_In.Treatment AND "Procedure".Name='bypass surgery'
    ) AS Details
;
SELECT Name
    FROM (
        SELECT DISTINCT Physician.EmployeeID, Physician.Name as Name
        FROM Physician, Trained_In, "Procedure", Department, Affiliated_with
        WHERE Physician.EmployeeID=Trained_In.Physician AND "Procedure".Code=Trained_In.Treatment AND "Procedure".Name='bypass surgery' AND Department.Name='cardiology' AND Department.DepartmentID=Affiliated_with.Department AND Physician.EmployeeID=Affiliated_with.Physician
    ) AS Details
;
SELECT Name
    FROM (
        SELECT DISTINCT Nurse.EmployeeID, Nurse.Name as Name
        FROM Nurse, Room, On_Call
        WHERE Nurse.EmployeeID=On_Call.Nurse AND On_Call.BlockCode=Room.BlockCode AND On_Call.BlockFloor=Room.BlockFloor AND Room.Number=123
    ) AS Details
;
SELECT Name, Address
    FROM (
        SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.Address AS Address
        FROM Patient, Prescribes, Medication
        WHERE Patient.SSN=Prescribes.Patient AND Prescribes.Medication=Medication.Code AND Medication.Name='remdesivir'
    ) AS Details
;
SELECT Name, InsuranceID
    FROM (
        SELECT DISTINCT Patient.SSN, Patient.Name AS Name, Patient.InsuranceID AS InsuranceID
        FROM Patient, Room, Stay
        WHERE Patient.SSN=Stay.Patient AND Stay.Room=Room.Number AND Room.Type='icu' AND DATE_PART('day', Stay."End"::timestamp - Stay.Start::timestamp)>15
    ) AS Details
;
SELECT Nurse.Name AS "Nurse_Name", Nurse.Position AS "Nurse_Position", Physician.Name AS "Physician_Name"
    FROM Nurse, Undergoes, "Procedure", Physician
    WHERE Nurse.EmployeeID=Undergoes.AssistingNurse AND Undergoes."Procedure"="Procedure".Code AND "Procedure".Name='bypass surgery' AND Undergoes.Physician=Physician.EmployeeID
;
SELECT Name
    FROM (
        SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name
        FROM Physician, Undergoes
        WHERE Physician.EmployeeID=Undergoes.Physician AND (Physician.EmployeeID, Undergoes."Procedure") NOT IN (
            SELECT Physician, Treatment
            FROM Trained_In
        )
    ) AS Details
;
SELECT Name
    FROM (
        SELECT DISTINCT Physician.EmployeeID, Physician.Name AS Name
        FROM Physician, Undergoes, Trained_In
        WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes."Procedure"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0
    ) AS Details
;
SELECT Physician.Name AS Physician_Name, "Procedure".Name AS Procedure_Name, Patient.Name AS Patient_Name, Undergoes.Date AS Date
    FROM Physician, Undergoes, Trained_In, "Procedure", Patient
    WHERE Physician.EmployeeID=Undergoes.Physician AND Undergoes."Procedure"=Trained_In.Treatment AND Physician.EmployeeID=Trained_In.Physician AND EXTRACT(EPOCH FROM (Undergoes.Date - Trained_In.CertificationExpires))>0 AND Undergoes."Procedure"="Procedure".Code AND Undergoes.Patient=Patient.SSN
;
SELECT Patient_Name, Physician_Name
    FROM (
        SELECT DISTINCT Patient.Name as Patient_Name, PCP.Name AS Physician_Name
            FROM Patient, Physician AS PCP, Prescribes, Undergoes, "Procedure"
            WHERE Patient.SSN=Prescribes.Patient AND Patient.SSN=Undergoes.Patient AND Prescribes.Physician=Patient.PCP AND PCP.EmployeeID=Patient.PCP AND Undergoes."Procedure"="Procedure".Code AND "Procedure".Cost>5000 AND PCP.EmployeeID NOT IN (
                SELECT Head
                FROM Department
            ) AND (
                SELECT COUNT(*)
                FROM Patient, Physician AS GP, Appointment, Department, Affiliated_with
                WHERE Patient.SSN=Appointment.Patient AND GP.EmployeeID=Appointment.Physician AND GP.EmployeeID=Affiliated_with.Physician AND Department.DepartmentID=Affiliated_with.Department AND Department.name='cardiology'
            )>=2
    ) AS Details
;
WITH Med_Stat(Freq, Code, Name, Brand) AS (
    SELECT COUNT(*), Medication.Code, Medication.Name, Medication.Brand
    FROM Medication, Prescribes
    WHERE Prescribes.Medication=Medication.Code
    GROUP BY Medication.Code, Medication.Name, Medication.Brand
)
SELECT Name, Brand
    FROM Med_Stat
    WHERE Freq >= ALL (
        SELECT Freq
        FROM Med_Stat
    )
;