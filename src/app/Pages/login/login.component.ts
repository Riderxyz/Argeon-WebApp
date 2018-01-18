import { Component, OnInit } from '@angular/core';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { LoginSrvService } from './../../Service/LoginSrv/login-srv.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username_NameDisplay: any
  Username_ImageDisplay
  user: Observable<firebase.User>;
  constructor(public LoginSrv: LoginSrvService, public router: Router, public cacheSrv: CacheServiceService, public afAuth: AngularFireAuth) {
    //this.UsernameDisplay = 'teste123'
  }

  ngOnInit() {
  }

  login() {
    this.LoginSrv.Login()
    this.afAuth.authState.subscribe(user => {
      if (user) this.Username_NameDisplay = user.displayName,
        this.Username_ImageDisplay = user.photoURL
      console.log(user)
    })
    setTimeout(() => {
      sessionStorage.setItem('Omega', this.Username_NameDisplay)
      console.log('Aqui esta o que eu preciso', this.Username_NameDisplay)
      this.LoginSrv.SetNameuser(this.Username_NameDisplay)
      this.LoginSrv.SetImageuser(this.Username_ImageDisplay)
      console.log('Em Login', this.Username_ImageDisplay)
      this.router.navigateByUrl('/home')
    }, 6000);


  }

  logout() {
    this.LoginSrv.Logout()
  }
}
