import { CacheServiceService } from './../CacheSrv/cache-service.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgZone } from '@angular/core';
@Injectable()
export class LoginSrvService {
  user: Observable<firebase.User>;
  Logado: boolean = false;
  genero: any;
  usuario = { NameDisplay: null, ImageDisplay: null, Token: null }
  constructor(public afAuth: AngularFireAuth, public router: Router, public cacheSrv: CacheServiceService, public zone: NgZone) {
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
    this.ativar(true)
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (res) => {
        this.usuario.NameDisplay = res.user.displayName,
          this.usuario.ImageDisplay = res.user.photoURL,
          this.usuario.Token = res.user.uid
        this.genero = res.additionalUserInfo.profile.gender;
        sessionStorage.setItem('SetNameuser', this.usuario.NameDisplay)
        sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay)
        sessionStorage.setItem('SetTokenuser', this.usuario.Token)
        this.ativar(false)
      }).catch((err => this.error))
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false;
    sessionStorage.removeItem('SetNameuser');
    sessionStorage.removeItem('SetImageuser');
    sessionStorage.removeItem('SetTokenuser');
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 10);
    this.zone.run(() => {
      this.router.navigateByUrl('/login');
    })
  }

  ativar(show: any) {
    if (show) {
      swal({
        position: 'center',
        title: 'Entrando...',
        showConfirmButton: false,
        showCancelButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
      })
      swal.showLoading();
    } else {
      swal.hideLoading();
      swal.close();

      this.redirect()
    }
  }
  redirect() {
    var text
    if (this.genero == 'male') {
      text = 'Bem vindo ' + this.usuario.NameDisplay
    } else {
      text = 'Bem vinda ' + this.usuario.NameDisplay
    }
    swal({
      position: 'center',
      type: 'success',
      html: '<h1 style="color:#3f34b0">'+text+'</h1>',
      showConfirmButton: true,
      onClose: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 10);
        this.zone.run(() => {
          this.router.navigateByUrl('/login');
        })
      }
    })
  }
  error(){
    swal({
      position: 'center',
      type: 'error',
      title: 'Ops...',
      text:'Algo deu errado durante o Login. Por favor, tente novamente',
      showConfirmButton: true})
  }
}
