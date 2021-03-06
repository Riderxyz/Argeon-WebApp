import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
  userId: string;
  ImagePlayer: any
  dadosFicha: any
  themeName = 'cosmic';
  gridJogadores: any
  themeSubscription: any;
  Omega: any
  settings: any = {
    actions: { add: false, edit: false, delete: false }, columns: {
      nome: {
        title: 'Nome:'
      },
    }
  }
  constructor(private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')

    this.getDados();
    this.coluna();
    this.settings = { actions: { add: false, edit: false, delete: false }, columns: this.gridJogadores };
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.Buttons(theme.variables);
    });
  }
  ngOnInit() {

  }
  getDados() {
    this.db.list('Fichas de Usuario').valueChanges()
      .subscribe((s) => {
        this.dadosFicha = s
      })
  }
  coluna() {
    this.db.list('ClassesBase').valueChanges()
      .subscribe((classes) => {
        //console.log('Classes', classes)
      })

    this.gridJogadores = {
      NomePlayer: {
        title: 'Nome do Jogador:'
      },
      IdadePlayer: {
        title: 'Idade do jogador'
      },
    }

    this.settings = { actions: { add: false, edit: false, delete: false }, columns: this.gridJogadores };

  }
  Buttons(colors: any) {
    this.Omega = [
      {
        class: 'btn-hero-primary',
        NameButton: 'Criar Ficha',
        mostrar: true,
        goTo: 'criar_ficha',
        cosmic: {
          gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
          gradientRight: colors.warning,
          bevel: `shade(${colors.warning}, 14%)`,
          shadow: 'rgba (33, 7, 77, 0.5)',
          glow: `adjust-hue(${colors.warning}, 5deg)`,
        },
      },
      {
        class: 'btn-hero-warning',
        NameButton: 'Editar Ficha',
        mostrar: true,
        goTo: 'editar_ficha',
        cosmic: {
          gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
          gradientRight: colors.warning,
          bevel: `shade(${colors.warning}, 14%)`,
          shadow: 'rgba (33, 7, 77, 0.5)',
          glow: `adjust-hue(${colors.warning}, 5deg)`,
        },
      }
    ]
  }


  showToast() {
    swal({
      position: 'top',
      html: '<h3 style="color:#fff;">Você precisa estar logado para criar/editar uma ficha</h3>',
      showConfirmButton: false,
      background: '#BD362F',
      toast: true,
      type: 'error',
      width: 1000,
      timer: 2000
    });

  }
  criarFichas(item) {
    var x
    this.db.object('Fichas de Usuario/' + this.userId).valueChanges()
      .subscribe((s) => {
        x = s
      })
    setTimeout(() => {
      if (this.cacheSrv.checkData(x)) {
        console.log('okay, estou aqui', x)
      } else {
        console.log('Naahhh, ainda não')
      }
    }, 500);
    if (this.userId == null) {
      this.showToast()
    } else {
      setTimeout(() => {
        this.router.navigateByUrl(item.goTo)
      }, 100);

    }
  }
}
