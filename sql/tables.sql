CREATE DATABASE medtrack CHARACTER SET utf8;

CREATE TABLE `PACIENTE`(
  `ID_p` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE `MEDICO`(
  `ID_m` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE `EMPLEADO`(
  `ID_e` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE `CITAS`(
  `ID_ci` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ID_e` INT(11) NOT NULL,
  FOREIGN KEY(ID_e) REFERENCES EMPLEADO(ID_e),
  `fecha_ci` DATE NOT NULL,
  `Hora_ci` TIME NOT NULL,
  `ID_p` INT(11) NOT NULL,
  FOREIGN KEY(ID_p) REFERENCES PACIENTE(ID_p),
  `terminada_ci` BOOLEAN NOT NULL
);

CREATE TABLE `CONSULTAS`(
  `ID_c` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ID_m` INT(11) NOT NULL,
  FOREIGN KEY(ID_m) REFERENCES MEDICO(ID_m),
  `ID_p` INT(11) NOT NULL,
  FOREIGN KEY(ID_p) REFERENCES PACIENTE(ID_p),
  `ID_ci` INT(11) NOT NULL,
  FOREIGN KEY(ID_ci) REFERENCES CITAS(ID_ci),
  `Fecha_c` DATE NOT NULL,
  `Motivo_c` VARCHAR(500) NOT NULL,
  `Explo_fis_c` VARCHAR(500) NOT NULL,
  `Diagnos_c` VARCHAR(500) NOT NULL,
  `Trata_c` VARCHAR(500) NOT NULL,
  `Pronos_c` VARCHAR(500) NOT NULL,
  `terminada_c` BOOLEAN NOT NULL
);

CREATE TABLE `RECETAS`(
  `ID_r` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ID_c` INT(11) NOT NULL,
  FOREIGN KEY(ID_c) REFERENCES CONSULTAS(ID_c),
  `Instrucciones_r` VARCHAR(999) NOT NULL,
  `Fecha_r` DATE NOT NULL
);

INSERT INTO MEDICO(ID_m, Nom_m, Passw_m, puesto_m, fechanaci_m, CP_m, Tel_m, Dire_m, Mail_m, Turno_m, Esp_m) VALUES
  (1, 'Jeidi', '12345', 'Medico', '2004-03-03', 66400, 8132509073, 'FIME', 'jeidi@medic.com', 'M', 'Cirujano plastico');

INSERT INTO EMPLEADO(ID_e, Nom_e, Passw_e, puesto_e, fechanaci_e, CP_e, Tel_e, Dire_e, Mail_e, Turno_e) VALUES
  (1, 'Samuel', 'samuelmamu', 'Recepcionista', '2024-04-22', 66400, 8132509073, 'FIME', 'samu@empleado.com', 'M');