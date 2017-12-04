import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { GridComponent } from '../../Components/grid/grid.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  menuItems: any
  constructor(public db: AngularFireDatabase) {
  }
  ngOnInit() {

    this.getmenu()
  }
  getmenu() {
    this.db.list('MenuPrincipal').valueChanges()
      .subscribe((s) => {
        this.menuItems = s;
        console.log(s)

      })
  };


}
