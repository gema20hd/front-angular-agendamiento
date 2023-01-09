import { Antecedente } from "./antecedente";
import { Discapacidad } from "./discapacidad";
import { EstadoCivil } from "./estadoCivil";
import { Genero } from "./genero";
import { NivelEducacionParalelo } from "./nivelEducacionParalelo";
import { Profesion } from "./profesion";
import { Representante } from "./representante";
import { TipoSangre } from "./tipoSangre";
import { Trabajo } from "./trabajo";
import { UnidadEducativa } from "./unidadEducativa";


export class Paciente {

    idPaciente?:number;
    identificacionPaciente?:string;
    nombresPaciente?:string;
    apellidoPaternoPaciente?:string;
    fechaNacimientoPaciente?:Date;
    celularPaciente?:string;
    direccionDomicilio?:string;
    telefonoPaciente?:string;
    correoElectronicoPaciente?:string;
    apellidoMaternoPaciente?:string;
    estadoPaciente?:string;
    //ingreso
    representante?:  Representante;
    //id
    estadoCivil?:EstadoCivil;
    //id
    tipoSangre?:TipoSangre;
    //ingreso
    discapacidad?:Discapacidad;
    //id
    genero?:Genero;
    //ingresado
    trabajo?:Trabajo;
    //id
    profesion?:Profesion;
    //id
    unidadEducativa?:UnidadEducativa;
    //id
    nivelEducacionParalelo?:NivelEducacionParalelo;
    //ingreso
    antecedente?:Antecedente;

    edadPaciente:number=0;




}