import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MediaPlayerComponent } from './shared/components/media-player/media-player.component';
import { HeaderUserComponent } from './shared/components/header-user/header-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
