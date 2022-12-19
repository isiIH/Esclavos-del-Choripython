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
    const valor = tener_arancel.valor;
    const año = tener_arancel.año;
    const id = tener_arancel.id;
    const result = await pool.query('UPDATE Tener_arancel SET valor = COALESCE(?,valor), año = COALESCE(?,año) WHERE id = ?',[valor,año,id])
    return result;
}
