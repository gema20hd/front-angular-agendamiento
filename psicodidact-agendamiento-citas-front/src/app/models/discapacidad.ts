import { TipoDiscapacidad } from "./tipoDiscapacidad";

export class Discapacidad {
  idDiscapacidad:number =1;
  porcetajeDiscapacidad?:number =0;
  descripcionDiscapacidad?:string = "NO TIENE";
  tipoDiscapacidad:TipoDiscapacidad = new TipoDiscapacidad();
  }
  