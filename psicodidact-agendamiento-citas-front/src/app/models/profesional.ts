import { Cuenta } from "src/app/models/cuenta";
import { Discapacidad } from "src/app/models/discapacidad";
import { EstadoCivil } from "src/app/models/estadoCivil";
import { Genero } from "src/app/models/genero";
import { ProfesionProfesional } from "src/app/models/profesionProfesional";
import { TipoSangre } from "src/app/models/tipoSangre";



export class Profesional {
    idProfesional:number=0;
    identificacionProfesional: string = "";
    nombresProfesional: string = "";
    apellidoPaternoProfesional : string = "";
    apellidoMaternoProfesional: string = "";
    fechaNacimientoProfesional: Date = new Date();
    celularProfesional: string = "";
    telefonoEmergenciaProfesional: string = "";
    direccionDomicilioProfesional: string = "";
    correoElectronicoProfesional: string = "";
    estadoProfesional: string = "ACTIVO";
    hojaVida: string = "SI";
    nivelEducacion: string = "TERCER NIVEL";
    tituloCuartoNivelProfesional: string = "NO TIENE";
    estadoCivil: EstadoCivil = new EstadoCivil;
    tipoSangre: TipoSangre = new TipoSangre();
    discapacidad: Discapacidad = new Discapacidad();
    genero: Genero = new Genero();
    profesionProfesional: ProfesionProfesional = new ProfesionProfesional();
    cuenta: Cuenta = new Cuenta();


}