import { Component } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-clans',
  templateUrl: './clans.component.html',
  styleUrls: ['./clans.component.scss']
})
export class ClansComponent {
  Magia: any
  constructor(public db: AngularFireDatabase, public cacheSrv: CacheServiceService) {
    this.getClans()
  }
  getClans() {
    this.db.list('Clans').valueChanges()
      .subscribe((s) => {
        console.log(s);
        this.Magia = s
        // this.execute = false;
      })
  }
  onClick(dados) {
    swal({
      title: dados.nome,
      text: dados.observacao,
      imageUrl: dados.url_imagem,
      imageWidth: 200,
      imageHeight: 200,
      background: '#3d3780'
    })
  }

}
