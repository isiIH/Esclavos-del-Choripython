import {pool} from '../db.js'

export const getCuenta = async() => {
    const result = await pool.query("SELECT * FROM Cuenta")
    return result;
}
export const deleteCuenta = async(id) => {
    const result = await pool.query('DELETE FROM Cuenta WHERE id = ?', [id])
    return result
}
export const createCuenta = async(cuenta) => {
    const [row] = await pool.query('INSERT INTO Cuenta (nombre,correo,contraseña,tipo) VALUES (?,?,?,?)', [cuenta.nombre,cuenta.correo,cuenta.contraseña,cuenta.tipo])
    return {row}
}
export const updateCuenta = async(cuenta) => {
    const result = await pool.query('UPDATE Cuenta SET nombre = ?, correo = ?, contraseña = ?, tipo = ? WHERE id = ?',[cuenta.nombre,cuenta.correo,cuenta.contraseña,cuenta.tipo,cuenta.id])
    return result;
}