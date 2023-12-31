import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
// import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import(`@modules/tracks/tracks.module`).then(m => m.TracksModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import(`@modules/favorites/favorites.module`).then(m => m.FavoritesModule)
  },
  {
    path: 'history',
    loadChildren: () => import(`@modules/history/history.module`).then(m => m.HistoryModule)
  },
  {
    path: 'admin',
    loadChildren: () => import(`@modules/abm/abm.module`).then(m => m.AbmModule)
  },
  {
    path: '**',
    redirectTo: '/tracks'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
