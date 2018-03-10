import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbThemeService } from '@nebular/theme';
import { DataSrvService } from '../../Service/DataSrv/data-srv.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  themeName = 'cosmic';
  layout: any = {};
  protected layoutState$: Subscription;
  themeSubscription: any;
  settings: Array<any>;
  lat: number = -22.90717096;
  lng: number = -43.22418451;
  elevation: number = 15

  constructor(public db: AngularFireDatabase, private themeService: NbThemeService, public FireSrv: DataSrvService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.init(theme.variables);
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

  Gerar() {
   var X =  this.FireSrv.getData('Reinos')
console.log('Em home',X)
    

  }
  ngOnDestroy() {
  }
}