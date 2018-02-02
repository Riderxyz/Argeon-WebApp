import { NoticiasComponent } from './../noticias/noticias.component';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { GridComponent } from '../../Components/grid/grid.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { ButtonsComponent } from '../../Components/buttons/buttons.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  menuItems: any;
  themeName = 'cosmic';
  layout: any = {};
  protected layoutState$: Subscription;
  themeSubscription: any;
  settings: Array<any>;
  lat: number = -22.90717096;
  lng: number = -43.22418451;
  elevation: number = 15

  constructor(public db: AngularFireDatabase, public router: Router, private themeService: NbThemeService, public cacheSrv: CacheServiceService) {
    // this.cacheSrv.TituloObj.Grid = 'Reinos'
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.init(theme.variables);
      //this.layoutState$ = this.stateService.onLayoutState()
      // .subscribe((layout: string) => this.layout = layout);
    });
  }
  ngOnInit() {

  }
  init(colors: any) {
    this.settings = [{
      class: 'btn-hero-primary',
      container: 'primary-container',
      Destino: 'home',
      NameButton: 'Home',
      cosmic: {
        gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
        gradientRight: colors.primary,
        bevel: `shade(${colors.primary}, 14%)`,
        shadow: 'rgba (6, 7, 64, 0.5)',
        glow: `adjust-hue(${colors.primary}, 10deg)`,
      },
    },
    {
      class: 'btn-hero-success',
      container: 'success-container',
      Destino: 'home',
      NameButton: 'Noticias',
      cosmic: {
        gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
        gradientRight: colors.primary,
        bevel: `shade(${colors.primary}, 14%)`,
        shadow: 'rgba (6, 7, 64, 0.5)',
        glow: `adjust-hue(${colors.primary}, 10deg)`,
      },
    },
    ]
  }

  Gerar(Botao) {

    setTimeout(() => {
      this.router.navigateByUrl('/noticias')
    }, 30);

  }
  ngOnDestroy() {
    //this.layoutState.unsubscribe();
  }
}