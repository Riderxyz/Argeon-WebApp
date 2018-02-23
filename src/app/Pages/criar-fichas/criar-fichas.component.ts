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

  toasterText: string
  //image
  ImagePlayer: any
  themeName = 'cosmic';
  settings: Array<any>;
  themeSubscription: any;
  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null };
  constructor(private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
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
      .subscribe((reinos) => {
        this.Dropdowns.Reinos = reinos
      })
    this.db.list('Clans').valueChanges()
      .subscribe((clans) => {
        this.Dropdowns.Clans = clans
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

  showToast(position: string, iconType: any, body: string, time: number, cor: any) {
    swal({
      position: 'top-end',
      html: body,
      showConfirmButton: false,
      background: cor,
      // #678D65
      type: iconType,
      toast: true,
      timer: time,
    });

  }
  ValidarRegistro() {
    //var retorno: boolean = false;
    this.toasterText = '';
    if (this.FichasData.NomePlayer == null || this.FichasData.NomePlayer == '') {
      this.toasterText = this.toasterText + `<div style="
                          padding:10px;
                          color:#fff;
                          
                          font-family: 'Ubuntu', serif;
                          text-align: left;
                          ">
                          <span style="font-weight: bold;">Erro!</span>Você não informou seu nome</div>`

    }
    if (this.FichasData.NomeChar == null || this.FichasData.NomeChar == '') {
      this.toasterText = this.toasterText + `<div style="
                         padding:10px;
                         color:#fff;
                         
                         font-family: 'Ubuntu', serif;
                         text-align: left;
                         >
                         <span style="font-weight: bold;">Erro!</span>Você não informou o nome do seu personagem</div>`

    }
    if (this.FichasData.IdadePlayer == null || this.FichasData.IdadePlayer == '') {
      this.toasterText = this.toasterText + `<div style="
                         padding:10px;
                         color:#fff;
                         
                         font-family: 'Ubuntu', serif;
                         text-align: left;
                         >
                         <span style="font-weight: bold;">Erro!</span>Você não informou sua idade</div>`

      
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
        this.showToast('top', 'error', this.toasterText, 2000, '#B83740')
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
        this.showToast('top-end', 'success', successMsg, 2000, '#678D65')
        setTimeout(() => {
          this.router.navigateByUrl('/fichas')
        }, 2100);
      }
    }

  }






}  
