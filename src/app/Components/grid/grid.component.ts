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
  ColunaExibida: any
  colunas = { Reinos: null, Jogadores: null, Magia: null, Clan: null, Potions:null,Menu:null }
  destino: string;
  titulo: string;
  execute: boolean
  settings:any = {actions: {add: false,edit: false,delete: false }, columns: {
    nome: {
      title: 'Nome:'
    },
  }}
  //settings = {actions: {add: false,edit: false,delete: false }, columns: {}};
 // settings = {actions: {add: false,edit: false,delete: false }, columns: {}};
  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {
    this.execute = false
    this.titulo = 'Escolha uma Grid'
    this.settings = {actions: {add: false,edit: false,delete: false }, columns: {}}
    this.cacheSrv.componentMethodCalled$.subscribe(
      () => {
        this.titulo = this.cacheSrv.TituloObj.Grid;
        this.execute = this.cacheSrv.DatabaseObj.Executar;
        this.destino = this.cacheSrv.DatabaseObj.Destino;
        this.getmenu();
        this.getcolunas();
      }
    );
  }
  ngOnInit() {
   // this.getcolunas()

  }
  getmenu() {
      this.db.list(this.destino).valueChanges()
        .subscribe((s) => {
          this.menuItems = s
          //this.titulo = 'Reinos'
          //console.log(s)
          this.execute = false;
        })
  }
  getcolunas() {
    if (this.cacheSrv.DatabaseObj.Destino == 'Reinos') {
      this.ColunaExibida = this.colunas.Reinos
    };
    if (this.cacheSrv.DatabaseObj.Destino == 'Grimorio') {
      this.ColunaExibida = this.colunas.Magia
    };
    if (this.cacheSrv.DatabaseObj.Destino == 'Fichas de Usuario') {
      this.ColunaExibida = this.colunas.Jogadores
    };
    if (this.cacheSrv.DatabaseObj.Destino == 'Clans') {
      this.ColunaExibida = this.colunas.Clan
    };
    if (this.cacheSrv.DatabaseObj.Destino == 'Potions') {
      this.ColunaExibida = this.colunas.Clan
    };
    if (this.cacheSrv.DatabaseObj.Destino == 'MenuPrincipal') {
      this.ColunaExibida = this.colunas.Menu
      console.log(this.cacheSrv.DatabaseObj.Destino)
    };
    this.colunas.Reinos = {
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
    this.colunas.Magia = {
      nome: {
        title: 'Nome:'
      },
      observacao: {
        title: 'Observacao'
      }
    }
    this.colunas.Clan = {
      nome: {
        title: 'Nome:'
      },
      observacao: {
        title: 'Observacao'
      }
    }
    this.colunas.Jogadores = {
      NomePlayer: {
        title: 'Nome do Jogador:'
      },
      NomeChar: {
        title: 'Nome do Personagem'
      },
      Alcunha: {
        title: 'Alcunha do Personagem'
      },
      Reinos: {
        title: 'Reinos'
      },
      Clan: {
        title: 'Clã'
      },
      IdadePlayer: {
        title: 'Idade do jogador'
      },
      IdadeChar: {
        title: 'Idade do personagem'
      },
    }
    this.colunas.Potions = {
      nome: {
        title: 'Nome:'
      },
      observacao: {
        title: 'Observacao'
      }
    }
    this.colunas.Menu = {
      nome: {
        title: 'Nome:'
      }
    }
    //this.settings.columns = this.ColunaExibida
    this.settings = {actions: {add: false,edit: false,delete: false }, columns: this.ColunaExibida};
  }



  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ]
  
  //this.gridOptions = <GridOptions>{};


}
