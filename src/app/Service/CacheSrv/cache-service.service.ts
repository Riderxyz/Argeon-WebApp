import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class CacheServiceService {
  UsuarioToken: any =  null
  constructor() { }

  // Observable string sources
  private componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }

checkData(data){
  if (data == undefined) {
    console.log('Fuck Yes!', data)
    return true
  }else{
    console.log('Meeehhh', data)
    return false
  }
}
//SetTokenuser
}
