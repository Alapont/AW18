
DROP DATABASE IF EXISTS examen_julio;

CREATE DATABASE examen_julio;

USE examen_julio;

CREATE TABLE mesas(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    posicion VARCHAR(100) NOT NULL,
    num_sillas INT NOT NULL,
    nombre_reserva VARCHAR(100),
    comensales INT DEFAULT 0
);

INSERT INTO mesas(posicion, num_sillas, nombre_reserva, comensales) VALUES
    ("Entrada izq.", 4, NULL, 0),
    ("Entrada dch.", 3, NULL, 0),
    ("Pasillo 1", 6, "Adrián", 5),
    ("Pasillo 1", 4, NULL, 0),
    ("Pasillo 1", 4, NULL, 0),
    ("Pasillo 2", 4, "Pepita", 4),
    ("Pasillo 2", 6, NULL, 0),
    ("Reservado", 10, NULL, 0),
    ("Ventana", 3, NULL, 0),
    ("Servicios", 2, NULL, 0);

