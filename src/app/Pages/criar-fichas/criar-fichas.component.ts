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
  Dropdowns ={
  Grimorio: null,
  Reinos: null,
  Clans: null,
  }
 
//toaster
  config: ToasterConfig;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
//image
  ImagePlayer: any
  themeName = 'cosmic';
  settings: Array<any>;
  themeSubscription: any;
  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null };
  constructor(private toasterService: ToasterService,private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.ImagePlayer = sessionStorage.getItem('SetImageuser')
    //console.log(this.userId)
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getDados();
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.Buttons(theme.variables);
    });
    setTimeout(() => {
      //this.teste()
      //this.enviar()
    }, 1500);
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



  showToast() {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: 'flyLeft',
      limit: 1,
    });
    const toast: Toast = {
      type: 'success',
      //title: ,
      body: 'Aqui esta',
      timeout: 5000,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }




  salvar(item) {
    //console.log(item.Salvar)
    if (item.Salvar == false) {
      console.log('Não salva')
      this.router.navigateByUrl('/fichas')
    } else {
      console.log('Salva')

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
        Magias: this.MagiaPlayer
      })
      setTimeout(() => {
      this.router.navigateByUrl('/fichas')  
      }, 100);
      
    }




  





  }






}  
