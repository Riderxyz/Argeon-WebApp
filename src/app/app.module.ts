import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    NbCheckboxModule,
  } from '@nebular/theme';
  import { Ng2SmartTableModule } from 'ng2-smart-table';
  import { DragulaModule } from '../../node_modules/ng2-dragula/ng2-dragula'
//PrimeNG
import {DialogModule} from 'primeng/dialog';

//AngularFire
  import { AngularFireModule } from 'angularfire2';
  import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
  import { AngularFirestoreModule } from 'angularfire2/firestore'
  import { AngularFireAuth } from 'angularfire2/auth';
  import { environment } from '../environments/environment';
  import { AppComponent } from './app.component';
//Modals
  import { ModalModule } from 'ngx-modialog';
  import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap'
  import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
  import { ToasterModule } from 'angular2-toaster';
  bootstrap4Mode()
//Paginas
  import { HomeComponent } from './Pages/home/home.component';
  import { NoticiasComponent } from './Pages/noticias/noticias.component';
  import { LoginComponent } from './Pages/login/login.component';
  import { FichaComponent } from './Pages/ficha/ficha.component';
  import { EditarFichasComponent } from './Pages/editar-fichas/editar-fichas.component';
  import { CriarFichasComponent } from './Pages/criar-fichas/criar-fichas.component';

//Componentes
  import { GridComponent } from './Components/grid/grid.component';
  import { HeaderComponent } from './Components/header/header.component';
  import { ButtonsComponent } from './Components/buttons/buttons.component';
  import { MenuComponent } from './Components/menu/menu.component';
//Serviços
  import { CacheServiceService } from './Service/CacheSrv/cache-service.service';
  import { LoginSrvService } from './Service/LoginSrv/login-srv.service';
  import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
//Paginas
    HomeComponent,
    NoticiasComponent,
    LoginComponent,
    FichaComponent,
//Componentes
    GridComponent,
    HeaderComponent,
    ButtonsComponent,
    MenuComponent,
    CriarFichasComponent,
    EditarFichasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    DragulaModule,
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    ToasterModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    DialogModule,
    BootstrapModalModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
  ],
  providers: [NbSidebarService,
    NbSidebarModule.forRoot().providers,
    NbMenuModule.forRoot().providers,
    CacheServiceService,
    LoginSrvService,
    ToasterService,
    AngularFireAuth],
  bootstrap: [AppComponent],

})
export class AppModule { }
