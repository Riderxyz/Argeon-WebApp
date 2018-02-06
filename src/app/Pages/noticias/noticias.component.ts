import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import swal from 'sweetalert2';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  DataBase1: any;
  display:boolean = false
  DataBase2: any;
  classe: string;
  //Omega: string;
  Set_envio: AngularFireList<any>;
  constructor(public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase) {
    this.getNoticias1();
    //this.Omega = 'blue'
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

  showDialog() {
    this.display = true;
}
  getNoticias1() {
    this.db.list('MenuNotas').valueChanges()
      .subscribe((s) => {
        this.DataBase1 = s
      })
  }
  onClick(dado) {
    console.log(dado);
    swal({
      title: dado.nome,
      text: dado.observaco,
      imageUrl: dado.url_imagem,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false
    })
  }
};
