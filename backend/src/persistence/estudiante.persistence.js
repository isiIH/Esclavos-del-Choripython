import {pool} from '../db.js'

export const getEstudiante = async() => {
    const result = await pool.query("SELECT * FROM Estudiante")
    return result;
}
export const deleteEstudiante = async(rut) => {
    const result = await pool.query('DELETE FROM Estudiante WHERE rut = ?', [rut])
    return result
}
export const createEstudiante = async(estudiante) => {
    const [row] = await pool.query('INSERT INTO Estudiante (nombre,rut,correo,id_programa) VALUES (?,?,?,?)', 
                                [estudiante.nombre,estudiante.rut,estudiante.correo,estudiante.id_programa])
    return {row}
}
export const updateEstudiante = async(estudiante) => {

    const result = await pool.query(
        'UPDATE Estudiante SET nombre = COALESCE(?,nombre), correo = COALESCE(?,correo), id_programa = COALESCE(?,id_programa) WHERE rut = ?',
        [estudiante.nombre, estudiante.correo, estudiante.id_programa, estudiante.rut])
    return result;
}
