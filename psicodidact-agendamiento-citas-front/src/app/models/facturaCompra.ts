import { FacturaDetalleCompra } from "./facturaDetalleCompra";
import { Paciente } from "./paciente";
import { Sucursal } from "./sucursal";


export class FacturaCompra {
    idFacturaCompra:number =0;
    descripcionFacturaCompra:string =""; 
    observacion:string =""; 
    totalFacturaCompra: number = 0.0;
    paciente: Paciente = new Paciente();
    sucursal: Sucursal = new Sucursal();
    detalleFacturas: Array<FacturaDetalleCompra> = [];
    

}
