import { TipoDiscapacidad } from "./tipoDiscapacidad";

export class Discapacidad {
  idDiscapacidad:number =0;
  porcetajeDiscapacidad?:number =0;
  descripcionDiscapacidad?:string = "";
  tipoDiscapacidad:TipoDiscapacidad = new TipoDiscapacidad();
  }
  