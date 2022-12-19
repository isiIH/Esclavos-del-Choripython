CREATE DATABASE IF NOT EXISTS proyecto;

use proyecto;

CREATE TABLE `Programa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `director`varchar(255),
  `correo`varchar(255),
  PRIMARY KEY (id)
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
  PRIMARY KEY (id)
);

CREATE TABLE `Comprobante`(
  `num_boleta` INT NOT NULL PRIMARY KEY, 
  `monto` INT NOT NULL,
  `fecha_pago` DATE,
  `arancel-matricula` VARCHAR(32),
  `enlace_foto` VARCHAR(255)
);


CREATE TABLE `Estudiante` (
  `rut` varchar(15) NOT NULL PRIMARY KEY, 
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255),
  `programa` varchar(255),
  `id_programa` INT NOT NULL,
  `id_comprobante` INT NOT NULL,
  `id_beca` INT NOT NULL,
  FOREIGN KEY (`id_programa`) REFERENCES `Programa` (`id`),
  FOREIGN KEY (`id_comprobante`) REFERENCES `Comprobante` (`num_boleta`),
  FOREIGN KEY (`id_beca`) REFERENCES `Becas` (`id`)
);
