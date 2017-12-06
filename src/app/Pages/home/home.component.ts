import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NbSidebarModule, NbLayoutModule, NbSidebarService,NbMenuItem } from '@nebular/theme';
import { GridComponent } from '../../Components/grid/grid.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { CacheServiceService } from './../../Service/cache-service.service';
import { ButtonsComponent } from '../../Components/buttons/buttons.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  menuItems: any
  menu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    }]



  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {
    this.cacheSrv.TituloObj.Grid = 'Reinos'
  }
  ngOnInit() {

  }

  getmenu() {
    this.db.list('MenuPrincipal').valueChanges()
      .subscribe((s) => {
        this.menuItems = s;
        console.log(s)

      })

      

  };


}
