import { Paciente } from "./paciente";
import { Pago } from "./pago";

export class FacturaPago {
 
    idFacturaPago?:number;
    fechaEmisionFacturaPago?:Date;
    pago?:Pago;
    paciente?:Paciente;
  

}
