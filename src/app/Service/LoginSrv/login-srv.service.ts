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
  //UserID: string;
  Logado: boolean = false;
  Username: any;
  genero:any;
  Avatar: any;
  Username_NameDisplay: any
  Username_ImageDisplay: any
  usuario = { NameDisplay: null, ImageDisplay: null, Token: null }
  constructor(public afAuth: AngularFireAuth, public router: Router, public cacheSrv:CacheServiceService,public zone:NgZone) {
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
      (res)=>{
        this.usuario.NameDisplay = res.user.displayName,
        this.usuario.ImageDisplay = res.user.photoURL,
        this.usuario.Token = res.user.uid
        console.log(res.additionalUserInfo.profile.gender)
        this.genero = res.additionalUserInfo.profile.gender;
        sessionStorage.setItem('SetNameuser', this.usuario.NameDisplay)
        sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay)
        sessionStorage.setItem('SetTokenuser', this.usuario.Token)
        this.ativar(false)
  })
    //this.Logout()
/*     setTimeout(() => {
      sessionStorage.setItem('SetNameuser', this.usuario.NameDisplay)
      sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay)
      sessionStorage.setItem('SetTokenuser', this.usuario.Token)
      if (this.usuario.Token != null) {
        console.log('dentro do timeout', this.usuario)
        this.router.navigateByUrl('/home')
      }

      console.log(sessionStorage.setItem('SetImageuser', this.usuario.ImageDisplay))
    }, 6000);*/
  }
  Logout() {
    this.afAuth.auth.signOut();
    this.Logado = false
    sessionStorage.removeItem('SetNameuser');
    sessionStorage.removeItem('SetImageuser');
    sessionStorage.removeItem('SetTokenuser');
   // this.router.navigateByUrl('/home')
  }

  ativar(show:any){
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
  }else {
    swal.hideLoading();
    swal.close();
    
    this.redirect()
  }
}
redirect(){
  var text
if (this.genero == 'male') {
  text = 'Bem vindo ' + this.usuario.NameDisplay
}else{
  text = 'Bem vinda ' + this.usuario.NameDisplay
}
  swal({
    position: 'center',
    type: 'success',
    title: text,
    showConfirmButton: true,
    onClose:()=>{
//      this.cacheSrv.callComponentMethod();
      this.zone.run(() => {
        this.router.navigateByUrl('/home');
      });
    }
})
}
goToHome(){
  this.router.navigate(['/home'])
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
  GetImageuser() {
    return this.Avatar
  }
}
