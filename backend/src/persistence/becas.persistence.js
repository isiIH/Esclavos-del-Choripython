import {pool} from '../db.js'

export const getBeca = async() => {
    const result = await pool.query("SELECT * FROM Becas")
    return result;
}
export const deleteBeca = async(id) => {
    const result = await pool.query('DELETE FROM Becas WHERE id = ?', [id])
    return result
}
export const createBeca = async(Beca) => {
    const [row] = await pool.query('INSERT INTO Becas (nombre,porcentaje,año,semestre,rut_estudiante) VALUES (?,?,?,?,?)', [Beca.nombre, Beca.porcentaje, Beca.año, Beca.semestre,Beca.rut_estudiante])
    return {row}
}
export const updateBeca = async(Beca) => {
    const result = await pool.query(
        'UPDATE Becas SET nombre = COALESCE(?,nombre), porcentaje = COALESCE(?,porcentaje), año = COALESCE(?,año), semestre = COALESCE(?,semestre), rut_estudiante = COALESCE(?,rut_estudiante) WHERE ID = ?',
        [Beca.nombre, Beca.porcentaje, Beca.año, Beca.semestre, Beca.rut_estudiante, Beca.id])
    return result;
}

