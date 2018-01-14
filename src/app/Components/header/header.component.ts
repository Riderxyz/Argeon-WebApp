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

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigateByUrl('/home')
  }
}
