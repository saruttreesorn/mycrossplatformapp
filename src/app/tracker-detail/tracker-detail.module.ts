import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackerDetailPageRoutingModule } from './tracker-detail-routing.module';

import { TrackerDetailPage } from './tracker-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackerDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TrackerDetailPage]
})
export class TrackerDetailPageModule {}
