import {pool} from '../db.js'

export const getArancel = async() => {
    const result = await pool.query("SELECT * FROM Tener_arancel")
    return result;
}
export const deleteArancel = async(id) => {
    const result = await pool.query('DELETE FROM Tener_arancel WHERE id = ?', [id])
    return result
}
export const createArancel= async(tener_arancel) => {
    const [row] = await pool.query('INSERT INTO Tener_arancel (año,valor) VALUES (?,?)', [tener_arancel.año,tener_arancel.valor])
    return {row}
}
export const updateArancel = async(tener_arancel) => {
    const result = await pool.query('UPDATE Tener_arancel SET valor = ?, año = ? WHERE id = ?',[tener_arancel.valor,tener_arancel.año,tener_arancel.id])
    return result;
}
