import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginSrvService {
  user: Observable<firebase.User>;
  UserID: string
  Logado: boolean = false
  Username: any
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = afAuth.authState;
          this.Logado = true
        }
      }
    )
  }
  Login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    console.log(this.afAuth)
    this.Logado = true
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false
  }
  SetNameuser(Usuario) {
    console.log('Sendo ativado com sucesso', Usuario)
    this.Username = Usuario
  }
  GetUsername() {
    console.log('Função GetUsername ', this.Username)
    return this.Username
  }
}
