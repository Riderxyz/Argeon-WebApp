import { Component, OnInit } from '@angular/core';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { LoginSrvService } from './../../Service/LoginSrv/login-srv.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public LoginSrv: LoginSrvService, public router: Router, public cacheSrv: CacheServiceService) { }

  ngOnInit() {
  }

  login() {
    this.LoginSrv.loginWithGoogle()
  }
}
