import { Beca } from "../model/beca.model.js";
import { createBeca, deleteBeca, getBeca, updateBeca } from "../persistence/becas.persistence.js";

export const getBecas = async (req, res) => {
    const result = await getBeca()
    res.json(result[0]);
} 

export const postBecas = async (req, res) => {
    let beca = new Beca(req.body)
    const result = await createBeca(beca);
    res.json("Información de becas posteada correctamente")
}

export const putBecas = async(req, res) => {
    const result = await updateBeca( new Beca(req.body));
    res.send("Información de becas editada satisfactoriamente.. ");
}

export const deleteBecas = async(req, res) => {
    const result = deleteBeca( req.params.id)
   res.send("Eliminado correctamente");
}