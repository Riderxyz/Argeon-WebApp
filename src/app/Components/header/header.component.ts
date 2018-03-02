import { LoginSrvService } from './../../Service/LoginSrv/login-srv.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbMenuItem, NbSidebarService, NbThemeService, NbMenuService } from '@nebular/theme';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  Logado: boolean = false
  userUID: any;
  UsernameDisplay: any
  AvatarDisplay: any
  Login: any;
  Rotate: any;
  Show: boolean;
  menu: NbMenuItem[] = [
    {
      title: 'Argeon - WebApp',
      icon: 'fa fa-lg fa-home',
      target: "home",
      home: true
    }]
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public LoginSrv: LoginSrvService,
    public cacheSrv: CacheServiceService,
    public sidebarSrv: NbSidebarService,
    public zone: NgZone,
    public menuSrv: NbMenuService) {
    this.userUID = sessionStorage.getItem('SetTokenuser')
    this.AvatarDisplay = sessionStorage.getItem('SetImageuser')
    this.UsernameDisplay = 'Bem Vindo(a)' + ' ' + sessionStorage.getItem('SetNameuser')
    this.Rotate = null
    if (this.userUID == null) {
      this.Logado = false
    } else {
      this.Logado = true
    }
  }
  ngOnInit() { }



  GoToLogin(Logado) {
    console.log(Logado)
    var buttonText
    var buttonColor
    this.Rotate = 'RotateToLogin'
    if (Logado == true) {
      buttonText = '<i class="socicon-google"></i> Login com Google'
      buttonColor = '#e0482f'
      this.Toast(buttonText, Logado, buttonColor)
    }
    else if (Logado == false) {
      buttonColor = '#6f5cb5'
      buttonText = 'Sair do meu Perfil'
      this.Toast(buttonText, Logado, buttonColor)
    }
    this.Rotate = 'RotateToLogin'
  }

  Toast(botao, Logado, cor) {
    swal({
      position: 'top-end',
      // type: 'info',
      showCancelButton: true,
      //toast: true,
      background: '#3d3780',
      confirmButtonText: botao,
      confirmButtonColor: cor,
      cancelButtonText: '<i class="fa fa-2x fa-close"></i>'
    }).then((result) => {
      if (result.value) {
        if (Logado == true) {
          this.LoginSrv.Login()
        }
        if (Logado == false) {
          this.LoginSrv.Logout()
        }
      }
      else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
      this.Rotate = null;
      }
    })
  }
  toggleSidebar(): boolean {
    this.sidebarSrv.toggle(true, 'menu-sidebar');
    return false;
  }
}
