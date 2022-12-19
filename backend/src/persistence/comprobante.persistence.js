import {pool} from '../db.js'

export const getComprobante = async() => {
    const result = await pool.query("SELECT * FROM Comprobante")
    return result;
}
export const deleteComprobante = async(num_boleta) => {
    const result = await pool.query('DELETE FROM Comprobante WHERE id = ?', [num_boleta])
    return result
}
export const createComprobante = async(comprobante) => {
    const [row] = await pool.query('INSERT INTO Comprobante (num_boleta,monto,fecha_pago,arancel_matricula,enlace_foto,rut_estudiante) VALUES (?,?,?,?,?,?)', [comprobante.num_boleta,comprobante.monto,comprobante.fecha_pago,comprobante.arancel_matricula,comprobante.enlace_foto,comprobante.rut_estudiante])
    return {row}
}
export const updateComprobante = async(comprobante) => {
    const result = await pool.query(
        'UPDATE Comprobante SET monto = COALESCE(?,monto), fecha_pago = COALESCE(?,fecha_pago), arancel_matricula = COALESCE(?,arancel_matricula), enlace_foto = COALESCE(?,enlace_foto), rut_estudiante = COALESCE(?,rut_estudiante) WHERE num_boleta = ?',
        [comprobante.monto, comprobante.fecha_pago, comprobante.arancel_matricula, comprobante.enlace_foto, comprobante.rut_estudiante, comprobante.num_boleta])
    return result;
}
