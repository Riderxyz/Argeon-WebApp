import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CacheServiceService {
  UsuarioObj: any = { username: null }
  DatabaseObj: any = { pagina: null }
  TituloObj: any = { Grid:null,notification: null }
  constructor() { }

}
