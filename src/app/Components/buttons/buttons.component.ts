import { Component, OnInit, EventEmitter } from '@angular/core';
import { NbThemeService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  themeName = 'cosmic';
  settings: Array<any>;
  themeSubscription: any;

  constructor(private themeService: NbThemeService, public router: Router, public cacheSrv: CacheServiceService) {
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
      Destino: 'Grimorio',
      NameButton: 'Grimório',
      Name: 'Grimório: O Livro de Magias',
      Execute: true,
      cosmic: {
        gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
        gradientRight: colors.primary,
        bevel: `shade(${colors.primary}, 14%)`,
        shadow: 'rgba (6, 7, 64, 0.5)',
        glow: `adjust-hue(${colors.primary}, 10deg)`,
      },
    }, {
      class: 'btn-hero-warning',
      container: 'warning-container',
      Destino: 'Reinos',
      NameButton: 'Reinos',
      Name: 'Os Reinos de Argeon',
      Execute: true,
      cosmic: {
        gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
        gradientRight: colors.warning,
        bevel: `shade(${colors.warning}, 14%)`,
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: `adjust-hue(${colors.warning}, 5deg)`,
      },
    }, {
      class: 'btn-hero-success',
      container: 'success-container',
      Destino: 'Fichas de Usuario',
      NameButton: 'Jogadores',
      Name: 'Fichas dos Jogadores',

      Execute: true,
      cosmic: {
        gradientLeft: `adjust-hue(${colors.success}, 20deg)`,
        gradientRight: colors.success,
        bevel: `shade(${colors.success}, 14%)`,
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: `adjust-hue(${colors.success}, 10deg)`,
      },
    }, {
      class: 'btn-hero-info',
      container: 'info-container',
      Destino: 'Clans',
      NameButton: 'Clãs',
      Name: 'Clãs de Argeon',
      Execute: true,
      cosmic: {
        gradientLeft: `adjust-hue(${colors.info}, -10deg)`,
        gradientRight: colors.info,
        bevel: `shade(${colors.info}, 14%)`,
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: `adjust-hue(${colors.info}, -5deg)`,
      },
    }, {
      class: 'btn-hero-danger',
      container: 'danger-container',
      Destino: 'Potions',
      NameButton: 'Poções',
      Name: 'Poções Magicas',
      Execute: true,
      cosmic: {
        gradientLeft: `adjust-hue(${colors.danger}, -20deg)`,
        gradientRight: colors.danger,
        bevel: `shade(${colors.danger}, 14%)`,
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: `adjust-hue(${colors.danger}, -10deg)`,
      },
    }, {
      class: 'btn-hero-secondary',
      container: 'secondary-container',
      Destino: 'MenuPrincipal',
      NameButton: 'Menu',
      Name: 'Menu Principal',
      Execute: true,
      cosmic: {
        border: colors.primary,
        bevel: '#665ebd',
        shadow: 'rgba (33, 7, 77, 0.5)',
        glow: 'rgba (146, 141, 255, 1)',
      },
    }];
  }
  Gerar(Botao) {
    this.cacheSrv.TituloObj.Grid = Botao.Name;
    this.cacheSrv.DatabaseObj.Destino = Botao.Destino
    this.cacheSrv.callComponentMethod();
    //this.router.navigateByUrl('/noticias')
  }
}