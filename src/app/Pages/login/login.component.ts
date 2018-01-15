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
  UsernameDisplay: any
  user: Observable<firebase.User>;
  constructor(public LoginSrv: LoginSrvService, public router: Router, public cacheSrv: CacheServiceService, public afAuth: AngularFireAuth) {
    //this.UsernameDisplay = 'teste123'
  }

  ngOnInit() {
  }

  login() {
    this.LoginSrv.Login()
    this.afAuth.authState.subscribe(user => {
        if (user) this.UsernameDisplay = user.displayName
        console.log(user)
        //
        console.log()
      })

      setTimeout(() => {
        console.log('Aqui esta o que eu preciso', this.UsernameDisplay)
        this.LoginSrv.SetNameuser(this.UsernameDisplay)
        this.router.navigateByUrl('/home')
      }, 5500);
      
   
  }

  logout() {
    this.LoginSrv.Logout()
  }
}
