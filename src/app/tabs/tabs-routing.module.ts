import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tracker',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../tracker/tracker.module').then( m => m.TrackerPageModule)
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../categories/categories.module').then( m => m.CategoriesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tracker',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tracker',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
