import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//Nebular
import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarService,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule, } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

//AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
//Paginas
import { HomeComponent } from './Pages/home/home.component';
import { NoticiasComponent } from './Pages/noticias/noticias.component';

//Componentes
import { GridComponent } from './Components/grid/grid.component';
import { HeaderComponent } from './Components/header/header.component';
import { ButtonsComponent } from './Components/buttons/buttons.component';
//Serviços
import { CacheServiceService } from './Service/cache-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoticiasComponent,
    GridComponent,
    HeaderComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent, data: {
          breadcrumbs: true,
          text: 'Home'
        }
      },
      {
        path: 'noticias', component: NoticiasComponent, data: {
          breadcrumbs: true,
          text: 'Noticias'
        }
      }
    ]),
  ],
  providers: [NbSidebarService,
    NbSidebarModule.forRoot().providers,
    NbMenuModule.forRoot().providers,
    CacheServiceService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
