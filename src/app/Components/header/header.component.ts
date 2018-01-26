import { LoginSrvService } from './../../Service/LoginSrv/login-srv.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  Logado: boolean = false
  UsernameDisplay:any
  AvatarDisplay:any
  Login:any;
  Rotate:any;
  Show:boolean;
  constructor(public router: Router, public afAuth: AngularFireAuth, public LoginSrv:LoginSrvService) { 
    //this.UsernameDisplay = 'Iago Favilla'
    this.AvatarDisplay = sessionStorage.getItem('SetImageuser')
    this.UsernameDisplay = 'Bem Vindo(a)'+ ' ' + sessionStorage.getItem('SetNameuser')
    this.Login = 'OMEGA'
    this.Rotate = null

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = afAuth.authState;
          this.Logado = true
        }else{
          this.LoginSrv.Logout()
        }
      }
    )
  }

  ngOnInit() {}

  GoToLogin(){
    this.Rotate = 'RotateToLogin'
    setTimeout(() => {
      this.router.navigateByUrl('/login')
      this.Show = false
    }, 3000);
  }
 
  goToHome() {
    this.router.navigateByUrl('/home')
  }
}
