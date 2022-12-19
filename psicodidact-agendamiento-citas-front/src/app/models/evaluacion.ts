import { Data } from "popper.js";
import { Cita } from "./cita";

export class Evaluacion {
 
    idEvalucion?:number;
    cita?:Cita;
    actividadEvaluacion?:string;
    observacionEvaluacion?:string;
    testAplicadoEvaluacion?:string;
    adaptacionesCurricularesEvaluacion?:string;
    coeficienteIntelectualEvaluacion?:string;
    diganosticoEvaluacion?:string;
    recomendacionesEvaluacion?:string;
    nuevoProcesoEvaluaciones?:string;
    createAt?: Data;
};


