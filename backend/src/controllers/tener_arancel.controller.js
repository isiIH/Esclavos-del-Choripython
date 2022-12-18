import { Tener_arancel } from "../model/tener_arancel.model.js";
import { createArancel, deleteArancel, getArancel, updateArancel } from "../persistence/tener_arancel.persistence.js";

export const getAr = async (req, res) => {
    const result = await getArancel()
    res.json(result[0]);

} 

export const postAr = async (req, res) => {
    let tener_arancel = new Tener_arancel(req.body)
    const result = await createArancel(tener_arancel);
    res.json("Información posteada correctamente")

}

export const putAr = async(req, res) => {
    const result = await updateArancel( new Tener_arancel(req.body));
    res.send("información editada satisfactoriamente.. ");
}

export const deleteAr = async(req, res) => {
    const result = deleteArancel( req.params.año,req.params.valor)
   res.send("Eliminado correctamente");
}