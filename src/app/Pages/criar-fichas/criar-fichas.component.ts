import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-criar-fichas',
  templateUrl: './criar-fichas.component.html',
  styleUrls: ['./criar-fichas.component.scss']
})
export class CriarFichasComponent implements OnInit {
  userId: string;
  Envio: any
  options: any = {
    removeOnSpill: false,
    copy: false
  }
  options2: any = {
    removeOnSpill: true,
    copy: false
  }
  MagiaGrimorio: Array<string> = [];
  MagiaPlayer: Array<string> = [];
  Dropdowns = {
    Grimorio: null,
    Reinos: null,
    Clans: null,
  }

  //toaster
  config: ToasterConfig;
  isNewestOnTop = true;
  position: 'Okay'
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  toasterText: string
  //image
  ImagePlayer: any
  themeName = 'cosmic';
  settings: Array<any>;
  themeSubscription: any;
  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null };
  constructor(private toasterService: ToasterService, private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.ImagePlayer = sessionStorage.getItem('SetImageuser')
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getDados();
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.Buttons(theme.variables);
    });
  }
  ngOnInit() {
  }
  getDados() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        this.Dropdowns.Grimorio = s
        for (let i = 0; i < this.Dropdowns.Grimorio.length; i++) {
          const magias = this.Dropdowns.Grimorio[i].nome;
          this.MagiaGrimorio.push(magias)
        }
      })
    this.db.list('Reinos').valueChanges()
      .subscribe((s) => {
        this.Dropdowns.Reinos = s
      })
    this.db.list('Clans').valueChanges()
      .subscribe((s) => {
        this.Dropdowns.Clans = s
      })
  }
  Buttons(colors: any) {
    this.settings = [
      {
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
      }, {
        class: 'btn-hero-success',
        NameButton: 'Salvar',
        Salvar: true,
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

  showToast(position: string, cor: string, body: string, time: number) {
    this.config = new ToasterConfig({
      positionClass: position,
      timeout: 1000,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: 'slideUp',
      limit: 3,
    });
    const toast: Toast = {
      type: cor,
      body: body,
      timeout: time,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
  ValidarRegistro() {
    //var retorno: boolean = false;
    this.toasterText = '';
    if (this.FichasData.NomePlayer == null || this.FichasData.NomePlayer == '') {
      this.toasterText = this.toasterText + '<br><h5>Você não informou seu nome</h5>'
    }
    if (this.FichasData.NomeChar == null || this.FichasData.NomeChar == '') {
      this.toasterText = this.toasterText + '<br><h5>Você não informou o nome do seu personagem</h5>'
    }
    if (this.FichasData.IdadePlayer == null || this.FichasData.IdadePlayer == '') {
      this.toasterText = this.toasterText + '<br><h5>Você não informou sua idade</h5>'
    }
    return (this.toasterText == '')
  }
  salvar(item) {
    if (this.FichasData.Reino == null) {
      this.FichasData.Reino = 'Vento Verde'
    }
    if (this.FichasData.Clan == null) {
      this.FichasData.Clan = 'Lobo Solitario'
    }
    if (item.Salvar == false) {
      this.router.navigateByUrl('/fichas')
    } else {
      if (!this.ValidarRegistro()) {
        this.showToast('toast-top-full-width', 'error', this.toasterText, 2000)
      } else {
       this.Envio.set({
       NomePlayer: this.FichasData.NomePlayer,
          NomeChar: this.FichasData.NomeChar,
          Alcunha: this.FichasData.Alcunha,
          IdadePlayer: this.FichasData.IdadePlayer,
          IdadeChar: this.FichasData.IdadeChar,
          Clan: this.FichasData.Clan,
          Reinos: this.FichasData.Reino,
          Img_Player: this.ImagePlayer,
          Img_Char: 'Asa',
          userId: this.userId, 
          Magias: this.MagiaPlayer,
          MagiasPendentes: this.MagiaGrimorio
        })
        var successMsg = '<h5>Ficha criada com sucesso</h5>'
        this.showToast('toast-top-right', 'success', successMsg, 2000)
        setTimeout(() => {
          this.router.navigateByUrl('/fichas')
        }, 2100);
      }
    }

  }






}  
