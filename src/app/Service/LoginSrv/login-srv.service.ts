import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginSrvService {
  user: Observable<firebase.User>;
  Logado: boolean = false
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
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(this.afAuth.auth)
    this.Logado = true
    console.log(this.Logado)
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false
  }

  /*   loginWithGoogle() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
      this.afAuth.auth.signOut();
    } */
}
