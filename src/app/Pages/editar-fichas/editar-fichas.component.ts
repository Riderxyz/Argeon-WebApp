import { Component, OnInit } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import swal from 'sweetalert2';
@Component({
  selector: 'app-editar-fichas',
  templateUrl: './editar-fichas.component.html',
  styleUrls: ['./editar-fichas.component.scss']
})
export class EditarFichasComponent implements OnInit {

  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null };
  Dropdowns = {
    Grimorio: null,
    Reinos: null,
    Clans: null,
  }
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
  userId: string;
  Envio: any;

  //toaster
  toasterText: string
  //tema
  themeSubscription: any;
  themeName = 'cosmic';
  settings: Array<any>;
  constructor(
    private themeService: NbThemeService,
    public dragulaService: DragulaService,
    public router: Router,
    public cacheSrv: CacheServiceService,
    public db: AngularFireDatabase) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getDados()
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.Buttons(theme.variables);
    });


  }

  ngOnInit() {
  }

  getDados() {
    this.Envio.valueChanges().subscribe((userData) => {
      this.FichasData.Alcunha = userData.Alcunha
      this.FichasData.Clan = userData.Clan
      this.FichasData.IdadeChar = userData.IdadeChar
      this.FichasData.IdadePlayer = userData.IdadePlayer
      this.FichasData.NomeChar = userData.NomeChar
      this.FichasData.NomePlayer = userData.NomePlayer
      this.FichasData.Reino = userData.Reinos
      this.MagiaPlayer = userData.Magias
      this.MagiaGrimorio = userData.MagiasPendentes
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

  showToast(position: string, iconType: any, body: string, time: number, cor:any) {
    swal({
      position: 'top-end',
      html:  '<h3 style="color:#fff;">' +  body + '</h3>',
      showConfirmButton: false,
      background: cor,
      // #678D65
      type: iconType,
      toast:true,
      timer: time,
    })
  }


  ValidarRegistro() {
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
        this.showToast('top', 'error', this.toasterText, 2000, '#B83740')
      } else {
        this.Envio.update({
          NomePlayer: this.FichasData.NomePlayer,
          NomeChar: this.FichasData.NomeChar,
          Alcunha: this.FichasData.Alcunha,
          IdadePlayer: this.FichasData.IdadePlayer,
          IdadeChar: this.FichasData.IdadeChar,
          Clan: this.FichasData.Clan,
          Reinos: this.FichasData.Reino,
          userId: this.userId,
          Magias: this.MagiaPlayer,
          MagiasPendentes: this.MagiaGrimorio
        })
        var successMsg = '<h5>Ficha editada com sucesso</h5>'
        this.showToast('top-end', 'success', successMsg, 2000,  '#678D65')
        setTimeout(() => {
          this.router.navigateByUrl('/fichas')
        }, 2100);
      }
    }

  }
}

