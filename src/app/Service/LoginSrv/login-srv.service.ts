import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginSrvService {
  user: Observable<firebase.User>;
  UserID:string
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
    this.afAuth.authState.subscribe(user => {
      if(user) this.UserID = user.uid
      console.log(this.UserID)
      console.log(user)
      this.SetNameuser(user.displayName)
      console.log(this.Username)
    })
  }
  Login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    console.log(this.afAuth.auth)
    this.Logado = true
    console.log(this.Logado)
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false
  }


SetNameuser(Usuario){
    this.Username = Usuario
  }
GetUsername(){
    return this.Username
}
}
