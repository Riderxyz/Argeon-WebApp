import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NbThemeService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { Observable } from 'rxjs/Observable';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  settings: Array<any>;
  themeSubscription: any;
  teste: any
  items: Observable<any[]>;
  menuItems: any;
  themeName = 'cosmic';
  menu: NbMenuItem[] = [
    {
      title: 'Noticias',
      icon: 'fa fa-lg fa-newspaper-o',
      target:"noticias"
    },
    {
      title: 'Fichas',
      icon: 'fa fa-lg fa-id-card-o',
      target:"fichas"
    },
    {
      title: 'Clans',
      icon: 'fa fa-lg fa-first-order',      
      //target:"Clans"
    },
    {
      title: 'Magias',
      icon: 'fa fa-lg fa-superpowers',      
      //target:"Magia"
    },
    {
      title: 'Panteão',
      icon: 'fa fa-lg fa-star',      
      //target:"Pantheon"
    }]
    //
  constructor(public router: Router, private themeService: NbThemeService, public cacheSrv: CacheServiceService,public menuSrv: NbMenuService) {
    this.menuSrv.onItemClick().subscribe((omega)=>{
      this.router.navigateByUrl(omega.item.target)
    })
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
      icon:'fa fa-lg fa-home',
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
      icon:'fa fa-lg fa-newspaper-o',
      cosmic: {
        gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
        gradientRight: colors.primary,
        bevel: `shade(${colors.primary}, 14%)`,
        shadow: 'rgba (6, 7, 64, 0.5)',
        glow: `adjust-hue(${colors.primary}, 10deg)`,
      },
    },
    {
      class: 'btn-hero-warning',
      container: 'warning-container',
      Destino: 'fichas',
      NameButton: 'Fichas',
      icon:'fa fa-lg fa-id-card-o',
      cosmic: {
        gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
        gradientRight: colors.warning,
        bevel: `shade(${colors.warning}, 14%)`,
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: `adjust-hue(${colors.warning}, 5deg)`,
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
