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
  message: string
  destino: string;
  titulo: string;
  execute: boolean
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {}
  };
  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {
    this.titulo = this.cacheSrv.TituloObj.Grid
    this.execute = false
  }

  ngOnInit() {
    this.getcolunas()
    this.settings.columns = this.colunas
    if (this.destino == null) {
      this.destino = 'Reinos'
      this.titulo = 'Os Reinos de Argeon'
    }
    this.message = 'Omega Max Megazord'
    //this.getmenu()
    //console.log(this.message);

  }
  getmenu() {
    if (this.execute == true) {
      this.db.list(this.destino).valueChanges()
        .subscribe((s) => {
          this.menuItems = s
          //this.titulo = 'Reinos'
          //console.log(s)
          this.execute = false;
        })
    } else {
     

    }
  }

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
  ngDoCheck() {
    this.titulo = this.cacheSrv.TituloObj.Grid
    this.execute = this.cacheSrv.DatabaseObj.Executar
    this.destino = this.cacheSrv.DatabaseObj.Destino
    //this.getmenu()
    this.cacheSrv.MensagemAtual.subscribe(message => this.message = message)
    console.log(this.message);
    this.getmenu()

    //this.changeDetected = false;
  }


  //this.gridOptions = <GridOptions>{};


}
