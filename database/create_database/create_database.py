import mysql.connector
import os, time

def create_database(db_connection,db_name,cursor):
    cursor.execute(f"COMMIT;")
    cursor.execute(f"CREATE DATABASE {db_name};")
    cursor.execute(f"COMMIT;")
    cursor.execute(f"USE {db_name};")
    cursor.execute(f"COMMIT;")
    
    cursor.execute('''CREATE TABLE Programa (
        id INT NOT NULL AUTO_INCREMENT,
        nombre varchar(255) NOT NULL,
        director varchar(255),
        correo varchar(255),
        PRIMARY KEY (id)
        );''')
    cursor.execute("COMMIT;") 

    cursor.execute('''CREATE TABLE Estudiante (
        rut varchar(15) NOT NULL PRIMARY KEY, 
        nombre varchar(255) NOT NULL,
        correo varchar(255),
        id_programa INT NOT NULL,
        FOREIGN KEY (id_programa) REFERENCES Programa (id)
        );''')
    cursor.execute("COMMIT;") 

    cursor.execute('''CREATE TABLE Tener_arancel (
        id INT NOT NULL AUTO_INCREMENT,
        año int NOT NULL,
        valor int NOT NULL,
        id_programa INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (id_programa) REFERENCES Programa (id)
        );''')
    cursor.execute("COMMIT;") 

    cursor.execute('''CREATE TABLE Becas (
        id INT NOT NULL AUTO_INCREMENT,
        nombre varchar(255),
        porcentaje INT NOT NULL,
        año INT NOT NULL,
        semestre INT NOT NULL,
        rut_estudiante varchar(15) NOT NULL, 
        PRIMARY KEY (id),
        FOREIGN KEY (rut_estudiante) REFERENCES Estudiante (rut)
        );''')
    cursor.execute("COMMIT;") 

    cursor.execute('''CREATE TABLE Comprobante (
        num_boleta INT NOT NULL PRIMARY KEY, 
        monto INT NOT NULL,
        fecha_pago DATE,
        arancel_matricula VARCHAR(32),
        enlace_foto VARCHAR(255),
        rut_estudiante varchar(15) NOT NULL, 
        FOREIGN KEY (rut_estudiante) REFERENCES Estudiante (rut)
        );''')
    cursor.execute("COMMIT;") 

    cursor.execute('''CREATE TABLE Cuenta (
        id INT NOT NULL AUTO_INCREMENT,
        nombre varchar(255) NOT NULL,
        correo varchar(255),
        contraseña varchar(255) NOT NULL,
        tipo varchar(255) NOT NULL,
        PRIMARY KEY (id)
        );''')
    cursor.execute("COMMIT;") 

def insert_data(cursor):
    print("insert")
    cursor.execute('''INSERT INTO news (url,title,date,media_outlet,category) VALUES
    ('https://www.biobiochile.cl/noticias/futbol-internacional/chilenos-en-el-exterior/2021/10/21/carlos-palacios-ingreso-en-el-segundo-tiempo-en-empate-de-inter-ante-bragantino.shtml
','Carlos Palacios ingresó en el segundo tiempo en empate de Inter ante Bragantino 
','2021-10-21','biobiochile','deportes'),
    ('https://www.biobiochile.cl/noticias/economia/actualidad-economica/2021/10/20/por-sexta-semana-consecutiva-suben-todas-las-bencinas-en-63-pesos-por-litros.shtml
','Por sexta semana consecutiva suben todas las bencinas en 6,3 pesos por litro
','2021-10-20','biobiochile','economia'),
    ('https://www.biobiochile.cl/biobiotv/programas/podria-ser-peor/2021/10/21/vicepdte-colegio-medico-si-aumenta-rapido-la-demanda-covid-19-no-alcanzaremos-a-responder.shtml
','Vicepdte. Colegio Médico: "Si aumenta rápido la demanda Covid-19, no alcanzaremos a responder"
','2021-10-21','biobiochile','salud');
    ''')
    cursor.execute("COMMIT;") 

#######################
DATABASE = "proyecto"

DATABASE_IP = str(os.environ['DATABASE_IP'])

DATABASE_USER = "root"
DATABASE_USER_PASSWORD = "teodiomysql"

not_connected = True

while(not_connected):
	try:
		print(DATABASE_IP,"IP")
		db_connection = mysql.connector.connect(user=DATABASE_USER,host=DATABASE_IP,password=DATABASE_USER_PASSWORD) #auth_plugin='mysql_native_password'
		not_connected = False

	except Exception as e:
		time.sleep(3)
		print(e, "error!!!")
		print("can't connect to mysql server, might be intializing")
		
cursor = db_connection.cursor()

try:
    cursor.execute(f"USE {DATABASE}")
    print(f"Database: {DATABASE} already exists")
except Exception as e:
    create_database(db_connection,DATABASE,cursor)
    # insert_data(cursor)
    print(f"Succesfully created: {DATABASE}")