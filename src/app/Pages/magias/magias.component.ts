import { Component } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-magias',
  templateUrl: './magias.component.html',
  styleUrls: [ './magias.component.scss' ]
})
export class MagiasComponent {
  Magia:any
  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {


this.getGrimorio()
  }
  getGrimorio() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        console.log(s);
        this.Magia = s
       // this.execute = false;
      })
  }

  onClick(dados){
    swal({
      title: dados.nome, 
      text: '<p>' + dados.observacao + '</p>',
      imageUrl: dados.url_imagem,
      imageWidth: 200,
      imageHeight: 200,
      background:'#3d3780'
    })
  }
}
