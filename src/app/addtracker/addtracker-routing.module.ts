import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtrackerPage } from './addtracker.page';

const routes: Routes = [
  {
    path: '',
    component: AddtrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtrackerPageRoutingModule {}
