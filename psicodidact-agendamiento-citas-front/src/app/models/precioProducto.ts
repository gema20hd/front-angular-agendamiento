import { Especialidad } from "./especialidad";
import { Servicio } from "./servicio";

export class PreciosProducto{
  idPrecioProducto: number =0;
  precio: number = 0.0;
  servicio: Servicio = new Servicio();
  especialidad: Especialidad = new Especialidad();
  }
  