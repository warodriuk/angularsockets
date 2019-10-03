import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// let's import the socket stuff
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// let's define where our socket server is
const config: SocketIoConfig = { 
    url: 'http://192.168.1.10:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // socket
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
