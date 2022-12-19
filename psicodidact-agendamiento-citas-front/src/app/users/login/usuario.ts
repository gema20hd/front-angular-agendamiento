export class Usuario {
  idUsuario?:number;
  username: string = "";
  password: string = "";
  enabled: boolean= false;
  roles: string[] = [];
}
