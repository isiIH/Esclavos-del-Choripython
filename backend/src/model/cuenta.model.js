export class Cuenta {
    constructor({id,nombre,correo,contraseña,tipo}){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.tipo = tipo;
    }
}