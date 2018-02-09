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
      title: 'Home',
      icon: 'fa fa-lg fa-home',
      target:"home",
    },
    {
      title: 'Noticias',
      icon: 'fa fa-lg fa-newspaper-o',
      target:"noticias"
    },
    {
      title: 'Fichas',
      icon: 'fa fa-lg fa-id-card-o',
      target:"fichas"
    }]
  constructor(public router: Router, private themeService: NbThemeService, public cacheSrv: CacheServiceService,public menuSrv: NbMenuService) {
    this.menuSrv.onItemClick().subscribe((omega)=>{
      console.log('itemclik',omega.item)
      this.router.navigateByUrl(omega.item.target)
    })
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
  Ativar() {
    //this.router.navigateByUrl('home')
        this.menuSrv.getSelectedItem().subscribe((s)=>{
        console.log(s)
      })
      

    for (var i = 0; i < this.menu.length; i++) {
      var element = this.menu[i];
      console.log(element[i])
      
    }
    
  }

}
