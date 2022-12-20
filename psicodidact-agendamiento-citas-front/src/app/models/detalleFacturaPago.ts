import { DetalleCompra } from "./detalleCompra";
import { FacturaPago } from "./facturaPago";

export class DetalleFacturaPago {
 
    idDetalleFacturaPago?:number;
    facturaPagoDetalleFacturaPago?: FacturaPago;
    detalleCompraDetalleFacturaPago?: DetalleCompra;
    unidadDetalleFacturaPago?: number;
    valorPagarDetalleFacturaPago?: number;
    createAt?:Date;
}
