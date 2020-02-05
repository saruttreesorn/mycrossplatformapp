import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtrackerPageRoutingModule } from './addtracker-routing.module';

import { AddtrackerPage } from './addtracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtrackerPageRoutingModule
  ],
  declarations: [AddtrackerPage]
})
export class AddtrackerPageModule {}
