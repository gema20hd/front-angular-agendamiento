import { Profesional } from "src/app/models/profesional";

export class Usuario {
  idUsuario:number =0;
  username: string = "";
  password: string = "";
  enabled: boolean= false;
  passwordRepeat?: string;
  roles: string[] = [];
  profesional: Profesional= new Profesional()
}
