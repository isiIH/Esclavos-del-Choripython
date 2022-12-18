import { Estudiante } from "../model/estudiante.model.js";
import { createEstudiante, deleteEstudiante, getEstudiante, updateEstudiante } from "../persistence/estudiante.persistence.js";

export const getEstud = async (req, res) => {
    const result = await getEstudiante()
    res.json(result[0]);

} 

export const postEstud = async (req, res) => {
    let estudiante = new Estudiante(req.body)
    const result = await createEstudiante(estudiante);
    res.json("Información posteada correctamente")

}

export const putEstud = async(req, res) => {
    const result = await updateEstudiante( new Estudiante(req.body));
    res.send("información editada satisfactoriamente.. ");
}

export const deleteEstud = async(req, res) => {
    const result = deleteEstudiante( req.params.rut)
   res.send("Eliminado correctamente");
}