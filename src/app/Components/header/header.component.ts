import { LoginSrvService } from './../../Service/LoginSrv/login-srv.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbThemeService } from '@nebular/theme';
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
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public LoginSrv: LoginSrvService,
    public cacheSrv: CacheServiceService,
    public sidebarSrv: NbSidebarService) {
    //this.sidebarSrv.toggle
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
  GoToLogin() {
    this.Rotate = 'RotateToLogin'
    setTimeout(() => {
      this.router.navigateByUrl('/login')
      this.Show = false
    }, 3000);
  }
  toggleSidebar(): boolean {
    this.sidebarSrv.toggle(true, 'menu-sidebar');
    return false;
  }
  goToHome() {
    this.router.navigateByUrl('/home')
  }
}
