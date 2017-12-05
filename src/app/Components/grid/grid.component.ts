import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GridOptions } from "ag-grid";
import { CacheServiceService } from './../../Service/cache-service.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  items: Observable<any[]>;
  menuItems: any
  colunas: any;

  titulo:string;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {}
  };
  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {
    this.getmenu()
    console.log(this.settings.columns);
    this.titulo = this.cacheSrv.TituloObj.Grid
  }

  ngOnInit() {
    this.getcolunas()
    this.settings.columns = this.colunas
  }
  getmenu() {
    this.db.list('Reinos').valueChanges()
      .subscribe((s) => {
        this.menuItems = s
        //this.titulo = 'Reinos'
        console.log(s)

      })
  };

  getcolunas() {
    this.colunas = {
      nome: {
        title: 'Nome:'
      },
      habitantes: {
        title: 'Habitantes'
      },
      lider: {
        title: 'Lider'
      },
      populacao: {
        title: 'População'
      },
    }
  }



  //this.gridOptions = <GridOptions>{};


}
