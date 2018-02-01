import { CacheServiceService } from './Service/CacheSrv/cache-service.service';
import { NgModule } from "@angular/core";
import { RouterModule, Router, Routes, CanActivate } from "@angular/router";

// Pages
import { HomeComponent } from './Pages/home/home.component';
import { NoticiasComponent } from './Pages/noticias/noticias.component';
import { LoginComponent } from './Pages/login/login.component';
import { FichaComponent } from './Pages/ficha/ficha.component';
import { EditarFichasComponent } from './Pages/editar-fichas/editar-fichas.component';
import { CriarFichasComponent } from './Pages/criar-fichas/criar-fichas.component';

const AppRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'fichas', component: FichaComponent },
    { path: 'criar_ficha', component: CriarFichasComponent },
    { path: 'editar_ficha', component: EditarFichasComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

]

@NgModule({
    imports: [
        RouterModule.forRoot(
            AppRoutes, { enableTracing: false }
        )
    ],
    exports: [
        RouterModule
    ]
})



export class AppRoutingModule { }