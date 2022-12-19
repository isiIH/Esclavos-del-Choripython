import {pool} from '../db.js'

export const getComprobante = async() => {
    const result = await pool.query("SELECT * FROM Comprobante")
    return result;
}
export const deleteComprobante = async(id) => {
    const result = await pool.query('DELETE FROM Comprobante WHERE id = ?', [id])
    return result
}
export const createComprobante = async(comprobante) => {
    const [row] = await pool.query('INSERT INTO Comprobante (id,monto,fecha_pago,arancel_matricula,enlace_foto) VALUES (?,?,?,?,?)', [comprobante.id,comprobante.monto,comprobante.fecha_pago,comprobante.arancel_matricula,comprobante.enlace_foto])
    return {row}
}
export const updateComprobante = async(comprobante) => {
    const result = await pool.query(
        'UPDATE Comprobante SET monto = COALESCE(?,monto), fecha_pago = COALESCE(?,fecha_pago), arancel_matricula= COALESCE(?,arancel_matricula),enlace_foto = COALESCE(?,enlace_foto) WHERE ID = ?'
        ,[comprobante.monto,comprobante.fecha_pago, comprobante.arancel_matricula, comprobante.enlace_foto, comprobante.id])
    return result;
}
