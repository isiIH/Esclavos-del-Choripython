CREATE DATABASE IF NOT EXISTS proyecto;

use proyecto;

CREATE TABLE `informacion` (
  `ID` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dato` varchar(255)
);

CREATE TABLE `Programa` (
  `nombre` varchar(255) NOT NULL,
  `director`varchar(255),
  `correo`varchar(255),
  `id` INT NOT NULL  PRIMARY KEY
);

CREATE TABLE `Tener_arancel`(
  `año` int NOT NULL,
  `valor` int NOT NULL
);

CREATE TABLE `Becas`(
  `nombre` varchar(255),
  `id` INT NOT NULL PRIMARY KEY,
  `porcentaje` INT NOT NULL,
  `año` INT NOT NULL,
  `semestre` INT NOT NULL
);

CREATE TABLE `Comprobante`(
  `id` INT NOT NULL PRIMARY KEY,
  `monto` INT NOT NULL,
  `fecha_pago` DATE,
  `arancel-matricula` VARCHAR(32),
  `enlace_foto` VARCHAR(255)
);


CREATE TABLE `Estudiante` (
  `nombre` varchar(255) NOT NULL,
  `rut` varchar(15) NOT NULL  PRIMARY KEY, 
  `correo` varchar(255),
  `programa` varchar(255),
  `id_programa` INT NOT NULL,
  `id_comprobante` INT NOT NULL,
  `id_beca` INT NOT NULL,
  FOREIGN KEY (`id_programa`) REFERENCES `Programa` (`id`),
  FOREIGN KEY (`id_comprobante`) REFERENCES `Comprobante` (`id`),
  FOREIGN KEY (`id_beca`) REFERENCES `Becas` (`id`)
);
