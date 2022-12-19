import { Compra } from "./compra";
import { ServicioCompra } from "./servicioCompra";

export class DetalleCompra {
 
    idDetalleCompra?:number;
    compra?:Compra;
    servicioDetalleCompra?:ServicioCompra;
    estadoPagoDetalleCompra?:string;
    descuentoDetalleCompra?:number;
    periodoDetalleCompra?:string;
    totalPagarDetalleCompra?:number;
	

	
}
