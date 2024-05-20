CREATE TABLE `PACIENTE`(
  `ID_p` INT(11) NOT NULL PRIMARY KEY,
  `Nom_p` VARCHAR(100) NOT NULL,
  `mail_p` VARCHAR(50) NOT NULL,
  `direc_p` VARCHAR(150) NOT NULL,
  `fechanaci_p` DATE NOT NULL,
  `IDoficial_p` INT(11) NOT NULL,
  `tel_p` VARCHAR(15) NOT NULL,
  `Ante_no_pat_p` VARCHAR(150) NOT NULL,
  `Ante_here_p` VARCHAR(150) NOT NULL,
  `Ante_pat_p` VARCHAR(150) NOT NULL
);

INSERT INTO PACIENTE(ID_p, Nom_p, mail_p, direc_p, fechanaci_p, IDoficial_p, Tel_p, Ante_no_pat_p, Ante_here_p, Ante_pat_p) VALUES
  (0987654321, 'Samuel', 'samu@samuel.com', 'FIME', '2024-04-22', 12312424, 8132509073, 'Ninguno', 'Calvicie', 'Ninguno');


CREATE TABLE `MEDICO`(
  `ID_m` INT(11) NOT NULL PRIMARY KEY,
  `Nom_m` VARCHAR(100) NOT NULL,
  `Passw_m` VARCHAR(30) NOT NULL,
  `puesto_m` VARCHAR(75) NOT NULL,
  `fechanaci_m` DATE NOT NULL,
  `CP_m` INT(8) NOT NULL,
  `Tel_m` VARCHAR(15) NOT NULL,
  `Dire_m` VARCHAR(150) NOT NULL,
  `Mail_m` VARCHAR(50) NOT NULL,
  `Turno_m` VARCHAR(20) NOT NULL,
  `Esp_m` VARCHAR(50) NOT NULL
);

INSERT INTO MEDICO(ID_m, Nom_m, Passw_m, puesto_m, fechanaci_m, CP_m, Tel_m, Dire_m, Mail_m, Turno_m, Esp_m) VALUES
  (1, 'Kissely', 'magrekiss', 'medica', '2024-04-22', 66400, 8132509073, 'FIME', 'alsdjf@hotmail.com', 'M', 'Cirujano plastico');

INSERT INTO MEDICO(ID_m, Nom_m, Passw_m, puesto_m, fechanaci_m, CP_m, Tel_m, Dire_m, Mail_m, Turno_m, Esp_m) VALUES
  (2, 'samu', 'samuelmamu', 'medico', '2024-04-22', 66400, 8132509073, 'FIME', 'alsdjf@hotmail.com', 'M', 'Cirujano plastico');

CREATE TABLE `EMPLEADO`(
  `ID_e` INT(11) NOT NULL PRIMARY KEY,
  `Nom_e` VARCHAR(100) NOT NULL,
  `Passw_e` VARCHAR(30) NOT NULL,
  `puesto_e` VARCHAR(75) NOT NULL,
  `fechanaci_e` DATE NOT NULL,
  `CP_e` INT(8) NOT NULL,
  `Tel_e` VARCHAR(15) NOT NULL,
  `Dire_e` VARCHAR(150) NOT NULL,
  `Mail_e` VARCHAR(50) NOT NULL,
  `Turno_e` VARCHAR(20) NOT NULL
);

INSERT INTO EMPLEADO(ID_e, Nom_e, Passw_e, puesto_e, fechanaci_e, CP_e, Tel_e, Dire_e, Mail_e, Turno_e) VALUES
  (1234567890, 'Jeidi', 'lmv', 'patron', '2024-04-22', 66400, 8132509073, 'FIME', 'alsdjf@hotmail.com', 'M');

CREATE TABLE `RECETAS`(
  `ID_r` INT(11) NOT NULL PRIMARY KEY,
  `ID_c` INT(11) NOT NULL,
  FOREIGN KEY(ID_c) REFERENCES CONSULTAS(ID_c),
  `Instrucciones_r` VARCHAR(999) NOT NULL,
  `Fecha_r` DATE NOT NULL
);

INSERT INTO RECETAS(ID_r, ID_c, Instrucciones_r, FECHA_r) VALUES
  (1, 1, '4 pastillas de mitroson', '2024-04-22');

CREATE TABLE `CITAS`(
  `ID_ci` INT(11) NOT NULL PRIMARY KEY,
  `ID_e` INT(11) NOT NULL,
  FOREIGN KEY(ID_e) REFERENCES EMPLEADO(ID_e),
  `Hora_ci` VARCHAR(6) NOT NULL,
  `ID_p` INT(11) NOT NULL,
  FOREIGN KEY(ID_p) REFERENCES PACIENTE(ID_p),
  `terminada_ci` BOOLEAN NOT NULL
);

INSERT INTO CITAS(ID_ci, ID_e, ID_p, Hora_ci,terminada_ci) VALUES
  (1, 1234567890, 0987654321, '12pm', false);


CREATE TABLE `CONSULTAS`(
  `ID_c` INT(11) NOT NULL PRIMARY KEY,
  `ID_m` INT(11) NOT NULL,
  FOREIGN KEY(ID_m) REFERENCES MEDICO(ID_m),
  `ID_p` INT(11) NOT NULL,
  FOREIGN KEY(ID_p) REFERENCES PACIENTE(ID_p),
  `Fecha_c` DATE NOT NULL,
  `Motivo_c` VARCHAR(500) NOT NULL,
  `Explo_fis_c` VARCHAR(500) NOT NULL,
  `Diagnos_c` VARCHAR(500) NOT NULL,
  `Trata_c` VARCHAR(500) NOT NULL,
  `Pronos_c` VARCHAR(500) NOT NULL,
  `terminada_c` BOOLEAN NOT NULL
);

INSERT INTO CONSULTAS(ID_c, ID_m, ID_p, Fecha_c, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c) VALUES
  (1, 1, 0987654321, '2024-04-22', 'Dolor de cabeza', 'Normal', 'Chido', 'Tomas pastillas', 'Fino');
