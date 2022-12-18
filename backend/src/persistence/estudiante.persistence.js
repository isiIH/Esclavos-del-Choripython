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
    const [row] = await pool.query('INSERT INTO Estudiante (nombre,rut,correo,programa,id_programa,id_comprobante,id_beca) VALUES (?,?,?,?,?,?,?)', 
                                [estudiante.nombre,estudiante.rut,estudiante.correo,estudiante.programa,estudiante.id_programa,estudiante.id_comprobante,estudiante.id_beca])
    return {row}
}
export const updateEstudiante = async(estudiante) => {

    const result = await pool.query('UPDATE Estudiante SET nombre = ?, correo = ?, programa = ?, id_programa = ?, id_comprobante = ?, id_beca = ?  WHERE rut = ?',[estudiante.nombre, estudiante.correo, estudiante.programa, estudiante.id_programa, estudiante.id_comprobante, estudiante.id_beca,estudiante.rut])
    return result;
}
