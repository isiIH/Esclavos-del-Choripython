CREATE DATABASE IF NOT EXISTS proyecto;

use proyecto;

CREATE TABLE `Programa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `director`varchar(255),
  `correo`varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE `Estudiante` (
  `rut` varchar(15) NOT NULL PRIMARY KEY, 
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255),
  `id_programa` INT NOT NULL,
  FOREIGN KEY (`id_programa`) REFERENCES `Programa` (`id`)
);

CREATE TABLE `Tener_arancel`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `año` int NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE `Becas`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255),
  `porcentaje` INT NOT NULL,
  `año` INT NOT NULL,
  `semestre` INT NOT NULL,
  `rut_estudiante` varchar(15) NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (`rut_estudiante`) REFERENCES `Estudiante` (`rut`)
);

CREATE TABLE `Comprobante`(
  `num_boleta` INT NOT NULL PRIMARY KEY, 
  `monto` INT NOT NULL,
  `fecha_pago` DATE,
  `arancel_matricula` VARCHAR(32),
  `enlace_foto` VARCHAR(255),
  `rut_estudiante` varchar(15) NOT NULL, 
  FOREIGN KEY (`rut_estudiante`) REFERENCES `Estudiante` (`rut`)
);



CREATE TABLE `Cuenta`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255),
  `contraseña` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
