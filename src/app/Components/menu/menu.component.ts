import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NbThemeService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { Observable } from 'rxjs/Observable';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  settings: Array<any>;
  themeSubscription: any;
  items: Observable<any[]>;
  menuItems: any;
  themeName = 'cosmic';
  constructor(public router: Router, private themeService: NbThemeService, NBItem: NbMenuItem, public cacheSrv: CacheServiceService) {
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
      Destino: 'noticias',
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
      this.router.navigateByUrl(Botao.Destino)
    }, 30);

  }


}
