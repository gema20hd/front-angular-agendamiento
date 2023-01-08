import { FacturaCompra } from "./facturaCompra";
import { Paciente } from "./paciente";
import { PreciosProducto } from "./precioProducto";
import { Sucursal } from "./sucursal";


export class FacturaDetalleCompra {

    idFacturaDetalleCompra:number =0;
    periodoCompraFactura:string =""; 
    descuentoCompra: number = 0.0;
    cantidad: number = 0.0;
    subTotal: number = 0.0;
    factura: FacturaCompra = new FacturaCompra();
    preciosProducto: PreciosProducto = new PreciosProducto();
    
    public  getSubtotal(): number {
		return this.cantidad * this.preciosProducto.precio;
	}

}
