import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, pluck, switchMap, take } from 'rxjs/operators';

import { AlertModalService } from '../../shared/alert-modal.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  filter: string;

  currentPage: number;
  itemsPerPage = 10;
  p: number = 1;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService
  ) {
    this.onRefresh();
  }

  ngOnInit() {}

  onRefresh() {
    this.users$ = this.usersService.list().pipe(
      pluck('model'),
      catchError((err: any, caught: Observable<any>) => {
        console.error(err);
        return throwError(this.handleError(err, caught));
      })
    );
  }

  onEdit(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onDelete(user) {
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse usuário?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.usersService.remove(user.id) : EMPTY
        )
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger(
            'Erro ao remover usuário. Contate o suporte.'
          );
        }
      );
  }

  handleError(error: any, caught: Observable<any>): Observable<any> {
    switch (error.statusText) {
      case 'Unknown Error':
        this.alertService.showAlertDanger(
          'Erro desconhecido ao carregar usuários!'
        );
        break;

      default:
        this.alertService.showAlertDanger('Erro desconhecido!');
        return;
    }

    return error;
  }
}
