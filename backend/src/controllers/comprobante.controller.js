import { Comprobante } from "../model/comprobante.model.js";
import { createComprobante, deleteComprobante, getComprobante, updateComprobante } from "../persistence/comprobante.persistence.js";

export const getComp = async (req, res) => {
    const result = await getComprobante()
    res.json(result[0]);

} 

export const postComp = async (req, res) => {
    let comprobante = new Comprobante(req.body)
    const result = await createComprobante(comprobante);
    res.json("Información posteada correctamente")

}

export const putComp = async(req, res) => {
    const result = await updateComprobante( new Comprobante(req.body));
    res.send("información editada satisfactoriamente.. ");
}

export const deleteComp = async(req, res) => {
    const result = deleteComprobante( req.params.id)
   res.send("Eliminado correctamente");
}