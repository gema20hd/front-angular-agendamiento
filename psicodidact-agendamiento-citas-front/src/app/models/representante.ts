import { Discapacidad } from "./discapacidad";
import { EstadoCivil } from "./estadoCivil";
import { Genero } from "./genero";
import { Profesion } from "./profesion";
import { TipoSangre } from "./tipoSangre";
import { Trabajo } from "./trabajo";

export class Representante {

    idRepresentante?:number;
    identificacionRepresentante?:string;
    apellidoPaternoRepresentante?:string;
    apellidoMaternoRepresentante?:string;
    nombresRepresentante?:string;
    fechaNacimientoRepresentante?:Date;
    correoElectronicoRepresentante?:string;
    celularRepresentante?:string;
    telefonoEmergenciaRepresentante?:string;
    parentescoRepresentante?:string;
    direccionDomicilioRepresentan?:string;
    estadoRepresentante?:string;
    estadoCivil?:  EstadoCivil;
    tipoSangre?:TipoSangre;
    //ingreso
    discapacidad?:Discapacidad;
    genero?:Genero;
    //ingreso
    trabajo?:Trabajo;
    
    profesion?:Profesion;


}
