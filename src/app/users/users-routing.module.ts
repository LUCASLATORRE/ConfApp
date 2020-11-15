import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './user-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserResolverGuard } from './guards/user-resolver.guard';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  {
    path: 'new',
    component: UserFormComponent,
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    resolve: {
      user: UserResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
