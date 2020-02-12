import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//storage /firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore} from '@angular/fire/firestore';

import { environment } from '../environments/environment';
// modal imports
import { SignupPageModule } from './signup/signup.module';
import { AddPageModule } from './add/add.module';
import { NoteDetailPageModule } from './note-detail/note-detail.module';
// modal for trackers
import { TrackerDetailPageModule } from './tracker-detail/tracker-detail.module';
// camera 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AddtrackerPageModule } from './addtracker/addtracker.module';

import { NgCalendarModule } from 'ionic2-calendar'; 

//google map 
import { GooglemapPageModule } from './googlemap/googlemap.module';
import { CalendarPageModule } from './calendar/calendar.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFirestore,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SignupPageModule,
    AddPageModule,
    NoteDetailPageModule,
    TrackerDetailPageModule,
    AddtrackerPageModule,
    NgCalendarModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // camera provider
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
