import { Cuenta } from "../model/cuenta.model.js";
import { createCuenta, deleteCuenta, getCuenta, updateCuenta } from "../persistence/cuenta.persistence.js";

export const getC = async (req, res) => {
    const result = await getCuenta()
    res.json(result[0]);

} 

export const postC = async (req, res) => {
    let cuenta = new Cuenta(req.body)
    const result = await createCuenta(cuenta);
    res.json("Información posteada correctamente")

}

export const putC = async(req, res) => {
    const result = await updateCuenta( new Cuenta(req.body));
    res.send("información editada satisfactoriamente.. ");
}

export const deleteC = async(req, res) => {
    const result = deleteCuenta( req.params.id)
   res.send("Eliminado correctamente");
}