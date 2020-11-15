import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { User } from '../user.model';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverGuard implements Resolve<User> {
  constructor(private service: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      dateOfBirth: null,
      schooling: null,
    });
  }
}
