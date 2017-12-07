import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class CacheServiceService {
  UsuarioObj: any = { username: null };
  DatabaseObj: any = { Destino: null, Executar: null };
  TituloObj: any = { Grid:null,notification: null };
  private messageSource = new BehaviorSubject<string>("Ola pessoas")
  MensagemAtual = this.messageSource.asObservable()
  constructor() { }


MudarDados(message:string){
  this.messageSource.next(message)
}


}
