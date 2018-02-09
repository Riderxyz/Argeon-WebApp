import { Component, OnInit } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'style-loader!angular2-toaster/toaster.css';
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
    config: ToasterConfig;
    isNewestOnTop = true;
    position: 'Okay'
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;
    toasterText: string
  constructor(private toasterService: ToasterService,
    private themeService: NbThemeService,
    public dragulaService: DragulaService,
    public router: Router,
    public cacheSrv: CacheServiceService,
    public db: AngularFireDatabase) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getDados()
    console.log(this.Envio);

  }

  ngOnInit() {
  }

  getDados() {
    this.Envio.valueChanges().subscribe((userData) => {
      var X = this.userId
      console.log(userData)
      console.log(this.userId);
      this.FichasData.Alcunha = userData.Alcunha
      this.FichasData.Clan = userData.Clan
      this.FichasData.IdadeChar = userData.IdadeChar
      this.FichasData.IdadePlayer = userData.IdadePlayer
      this.FichasData.NomeChar = userData.NomeChar
      this.FichasData.NomePlayer = userData.NomePlayer
      this.FichasData.Reino = userData.Reinos
      this.MagiaPlayer = userData.Magias
      this.MagiaGrimorio = userData.MagiasPendentes
      //console.log(this.FichasData);
      //console.log(this.MagiaGrimorio);
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

