import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      canActivateChild: [],
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule)
    },
    { path: 'formTry', loadChildren: () => import('./form-try/form-try.module').then(m => m.FormTryModule) },

    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'test',
      canActivate: [AuthGuard],
      component: NotFoundComponent,
    },
    {
      path: '**',
      canActivate: [AuthGuard],
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
