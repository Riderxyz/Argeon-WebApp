import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Router } from '@angular/router';

@Injectable()
export class LoginSrvService {
  user: Observable<firebase.User>;
  UserID: string;
  Logado: boolean = false;
  Username: any;
  Avatar: any;
  Username_NameDisplay: any
  Username_ImageDisplay: any
  usuario = {NameDisplay:null, ImageDisplay:null, Token:null}
  constructor(public afAuth: AngularFireAuth, public router: Router) {
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
    this.afAuth.authState.subscribe(user => {
      if (user) this.usuario.NameDisplay = user.displayName,
        this.usuario.ImageDisplay = user.photoURL,
        this.usuario.Token = user.uid
      console.log(user)
    })
    setTimeout(() => {
      sessionStorage.setItem('SetNameuser', this.usuario.NameDisplay)
      sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay)
      sessionStorage.setItem('SetImageuser', this.usuario.Token)
      this.router.navigateByUrl('/home')
      console.log(sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay))
    }, 6000);
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false
    sessionStorage.removeItem('SetNameuser');
    sessionStorage.removeItem('SetImageuser');
  }
  SetNameuser(Usuario) {
    console.log('Sendo ativado com sucesso', Usuario)
    this.Username = Usuario
  }
  SetImageuser(imagem) {
    this.Avatar = imagem
  }
  GetUsername() {
    console.log('Função GetUsername ', this.Username)
    return this.Username
  }
  GetImageuser(){
    return this.Avatar
  }
}
