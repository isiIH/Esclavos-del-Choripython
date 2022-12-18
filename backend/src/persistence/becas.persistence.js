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
    const [row] = await pool.query('INSERT INTO Becas (nombre,id,porcentaje,año,semestre) VALUES (?,?,?,?,?)', [Beca.nombre, Beca.id, Beca.porcentaje, Beca.año, Beca.semestre])
    return {row}
}
export const updateBeca = async(Beca) => {
    const result = await pool.query('UPDATE Becas SET nombre = ?, porcentaje = ?, año = ?, semestre = ? WHERE ID = ?',[Beca.nombre, Beca.porcentaje, Beca.año, Beca.semestre, Beca.id])
    return result;
}

