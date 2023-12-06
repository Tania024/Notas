import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasComponent } from './notas/notas.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


import { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environment/environment';



@NgModule({
  declarations: [
    AppComponent,
    NotasComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
     BrowserAnimationsModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: !isDevMode(),
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
