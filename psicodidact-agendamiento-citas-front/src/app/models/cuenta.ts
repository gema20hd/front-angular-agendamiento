import { Banco } from "./banco";
import { TipoCuenta } from "./tipoCuenta";

export class Cuenta {
    idCuenta: number =0;
    numeroCuenta: string="";
    banco: Banco = new Banco();
    tipoCuenta: TipoCuenta = new TipoCuenta();
  }
  