import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
  userId: string;
  ImagePlayer: any
  config: ToasterConfig;
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
  constructor(private toasterService: ToasterService, private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
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
        console.log(this.dadosFicha)
      })
  }
  coluna() {
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
      /*       {
              class: 'btn-hero-danger',
              NameButton: 'Cancelar',
              Salvar: false,
              cosmic: {
                gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
                gradientRight: colors.primary,
                bevel: `shade(${colors.primary}, 14%)`,
                shadow: 'rgba (6, 7, 64, 0.5)',
                glow: `adjust-hue(${colors.primary}, 10deg)`,
              },
            }, */

      {
        class: 'btn-hero-primary',
        NameButton: 'Criar Ficha',
        Salvar: true,
        goTo:'criar_ficha',
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
        Salvar: true,
        goTo:'editar_ficha',
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
    this.config = new ToasterConfig({
      positionClass: 'toast-top-full-width',
      timeout: 5000, 
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 5,
    });
    const toast: Toast = {
      type: 'error',
      title: 'Você precisa estar logado para criar uma ficha',
      timeout: 1000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
  criarFichas(item) {
    if (this.userId == null) {
      this.showToast()
    } else {
      setTimeout(() => {
        this.router.navigateByUrl('/editar_ficha')
      }, 100);

    }
  }
}
