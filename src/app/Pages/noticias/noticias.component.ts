import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap'
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  DataBase1: any;
  DataBase2: any;
  classe: string;
  Omega: string;
  Set_envio: AngularFireList<any>;
  constructor(public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, public modal: Modal) {
    this.getNoticias1();
    this.Omega = 'blue'
    //this.Set_envio = db.list('https://argeon-337.firebaseio.com/Fichas de Usuario');
  }
  ngOnInit() {
  }
  ativar() {

    if (this.classe != null) {
      this.classe = null
    }
    else {
      this.classe = 'Mostrar'
    }
  }
  getNoticias1() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        this.DataBase1 = s
      })
  }
  onClick(dado) {
    console.log(dado);


    this.modal.alert()
      .title(dado.nome)
      .body(`
      <div>
      {{dado.nome}}
     <img width="100vh" height="200vh" src="` + dado.url_imagem + `">
      </div>
    `)
      .open();
  }
};
