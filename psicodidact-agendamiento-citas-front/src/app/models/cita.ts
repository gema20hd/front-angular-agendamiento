import { Time } from "@angular/common";
import { Asistencia } from "./asistencia";
import { Banco } from "./banco";
import { DetalleCompra } from "./detalleCompra";
import { Oficina } from "./oficina";
import { Profesional } from "./profesional";
import { SubServicio } from "./subServicio";
import { TipoCuenta } from "./tipoCuenta";

export class Cita {
  idCita?: number;
	fechaCita?: Date;
	horaCita?: Time;
	duracionHoraCita?: string;
  duracionMinutosCita?: number;
	estadoCita?:string;
	numeroCita?: number;

  detalleCompraCita?: DetalleCompra;
  oficinaCita?: Oficina;
  profesionalCita?: Profesional;
  subServicioCita?: SubServicio;
  asistenciaCita?: Asistencia;
  
}
  