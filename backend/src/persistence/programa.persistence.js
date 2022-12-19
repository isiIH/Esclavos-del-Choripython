import {pool} from '../db.js'

export const getPrograma = async() => {
    const result = await pool.query("SELECT * FROM Programa")
    return result;
}
export const deletePrograma = async(id) => {
    const result = await pool.query('DELETE FROM Programa WHERE id = ?', [id])
    return result
}
export const createPrograma = async(Programa) => { 
    const [row] = await pool.query('INSERT INTO Programa (nombre,director,correo) VALUES (?,?,?)', [Programa.nombre, Programa.director, Programa.correo])
    return {row}
}
export const updatePrograma = async(Programa) => {
    const result = await pool.query(
    'UPDATE Programa SET nombre = COALESCE(?,nombre), director = COALESCE(?,director), correo = COALESCE(?,correo) WHERE ID = ?'
    ,[Programa.nombre, Programa.director, Programa.correo,Programa.id])
    return result;
}
