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
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
  userId: string;
  ImagePlayer: any
  dadosFicha: any
  themeName = 'cosmic';
  gridJogadores: any
  themeSubscription: any;
  Omega: any
  settings: any = {
    actions: { add: false, edit: false, delete: false }, columns: {
      nome: {
        title: 'Nome:'
      },
    }
  }
  constructor(private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')

    this.getDados();
    this.coluna();
    this.settings = { actions: { add: false, edit: false, delete: false }, columns: this.gridJogadores };
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.Buttons(theme.variables);
    });
  }
  ngOnInit() {

  }
  getDados() {
    this.db.list('Fichas de Usuario').valueChanges()
      .subscribe((s) => {
        this.dadosFicha = s
      })
  }
  coluna() {
    this.db.list('ClassesBase').valueChanges()
      .subscribe((classes) => {
        //console.log('Classes', classes)
      })

    this.gridJogadores = {
      NomePlayer: {
        title: 'Nome do Jogador:'
      },
      IdadePlayer: {
        title: 'Idade do jogador'
      },
    }

    this.settings = { actions: { add: false, edit: false, delete: false }, columns: this.gridJogadores };

  }
  Buttons(colors: any) {
    this.Omega = [
      {
        class: 'btn-hero-primary',
        NameButton: 'Criar Ficha',
        mostrar: true,
        goTo: 'criar_ficha',
        cosmic: {
          gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
          gradientRight: colors.warning,
          bevel: `shade(${colors.warning}, 14%)`,
          shadow: 'rgba (33, 7, 77, 0.5)',
          glow: `adjust-hue(${colors.warning}, 5deg)`,
        },
      },
      {
        class: 'btn-hero-warning',
        NameButton: 'Editar Ficha',
        mostrar: true,
        goTo: 'editar_ficha',
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
    swal({
      position: 'top',
      html: '<h3 style="color:#fff;">Você precisa estar logado para criar uma ficha</h3>',
      showConfirmButton: false,
      background: '#BD362F',
      //toast: true,
      imageUrl:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS4yNjkgNTExLjI2OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjI2OSA1MTEuMjY5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjIzNjg5IDAgMCAwLjIyMzY4OSAxOTguNDUyIDE5OC40NTIpIj48cGF0aCBzdHlsZT0iZmlsbDojMDAwMDAwIiBkPSJNMTQwLjM2Nyw0NjUuMDY3QzExNi45LDQzOC40LDkzLjQzNCw0MTAuNjY3LDc4LjUsMzc3LjZjLTE0LjkzMy0zNS4yLTE5LjItNzUuNzMzLTExLjczMy0xMTQuMTMzICBzMjQuNTMzLTc0LjY2Nyw0OS4wNjctMTA1LjZjLTIuMTMzLDI2LjY2Nyw3LjQ2Nyw1NC40LDI1LjYsNzQuNjY3Yy0xMC42NjctNTEuMiw2LjQtMTA2LjY2Nyw0MC41MzMtMTQ3LjJTMjYzLjAzNCwxOC4xMzMsMzEyLjEsMCAgYy0yNC41MzMsMjUuNi0yNy43MzMsNjYuMTMzLTE4LjEzMywxMDAuMjY3YzkuNiwzNC4xMzMsMjkuODY3LDY0LDQ4LDk0LjkzM2MxOC4xMzMsMzAuOTMzLDM1LjIsNjIuOTMzLDM2LjI2Nyw5OC4xMzMgIGM5LjYtMTguMTMzLDIwLjI2Ny0zNi4yNjcsMjYuNjY3LTU2LjUzM2M2LjQtMjAuMjY3LDkuNi00MS42LDQuMjY3LTYxLjg2N2MxOS4yLDIzLjQ2NywyOS44NjcsNDYuOTMzLDM1LjIsNzYuOCAgYzUuMzMzLDI5Ljg2Nyw0LjI2Nyw2MC44LDEuMDY3LDkwLjY2N2MtNC4yNjcsMzMuMDY3LTEyLjgsNjcuMi0zMC45MzMsOTQuOTMzYy0yMS4zMzMsMzMuMDY3LTU1LjQ2Nyw1Ni41MzMtOTIuOCw2OS4zMzMgIEMyNTUuNTY3LDUxOC40LDE5MC41LDUwOC44LDE0MC4zNjcsNDY1LjA2N3oiIGRhdGEtb3JpZ2luYWw9IiNGMzcwNUEiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjMDEwMTAxIj48L3BhdGg+PHBhdGggc3R5bGU9ImZpbGw6I0ZERkJGQiIgZD0iTTIyMS40MzQsNTA0LjUzM0MzMDguOSw1MzguNjY3LDM5NS4zLDQzNS4yLDM0Ny4zLDM1NS4yYzAtMS4wNjctMS4wNjctMS4wNjctMS4wNjctMi4xMzMgIGM0LjI2Nyw0My43MzMtNi40LDc1LjczMy0yNi42NjcsOTMuODY3YzEwLjY2Ny0yNS42LDMuMi01NS40NjctOS42LTgxLjA2N2MtMTIuOC0yNC41MzMtMzAuOTMzLTQ2LjkzMy00NC44LTcwLjQgIGMtMTMuODY3LTI0LjUzMy0yNC41MzMtNTIuMjY3LTE4LjEzMy04MGMtMjUuNiwxOS4yLTQzLjczMyw0OC01MS4yLDc4LjkzM2MtNy40NjcsMzAuOTMzLTMuMiw2NS4wNjcsMTAuNjY3LDkzLjg2NyAgYy0xNi0xMS43MzMtMjcuNzMzLTMwLjkzMy0yOC44LTUxLjJjLTE3LjA2NywyMC4yNjctMjcuNzMzLDQ2LjkzMy0yNi42NjcsNzMuNkMxNTEuMDM0LDQ1Mi4yNjcsMTg0LjEsNDg5LjYsMjIxLjQzNCw1MDQuNTMzeiIgZGF0YS1vcmlnaW5hbD0iI0ZGRDE1QyIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBkYXRhLW9sZF9jb2xvcj0iI0Y4RjVGNSI+PC9wYXRoPjwvZz4gPC9zdmc+",
      type: 'error',
      width: 1000,
      timer: 200000
    });

  }
  criarFichas(item) {
    var x
    this.db.object('Fichas de Usuario/' + this.userId).valueChanges()
      .subscribe((s) => {
        x = s
      })
    setTimeout(() => {
      if (this.cacheSrv.checkData(x)) {
        console.log('okay, estou aqui', x)
      } else {
        console.log('Naahhh, ainda não')
      }
    }, 500);

    // this.cacheSrv.checkData(x)


    if (this.userId == null) {
      this.showToast()
    } else {
      setTimeout(() => {
        this.router.navigateByUrl(item.goTo)
      }, 100);

    }
  }
}
