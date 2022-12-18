import { Programa } from "../model/programa.model.js";
import { createPrograma, deletePrograma, getPrograma, updatePrograma } from "../persistence/programa.persistence.js";

export const getProg = async (req, res) => {
    const result = await getPrograma()
    res.json(result[0]);

} 

export const postProg = async (req, res) => {
    let programa = new Programa(req.body)
    const result = await createPrograma(programa);
    res.json("Información posteada correctamente")

}

export const putProg = async(req, res) => {
    const result = await updatePrograma( new Programa(req.body));
    res.send("Información editada satisfactoriamente.. ");
}

export const deleteProg = async(req, res) => {
    const result = deletePrograma( req.params.id)
   res.send("Eliminado correctamente");
}