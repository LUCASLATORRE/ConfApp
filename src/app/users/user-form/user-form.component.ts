import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from '../../shared/alert-modal.service';
import { UsersService } from '../users.service';
import { FormValidations } from './../../shared/validation/form-validations';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  today = new Date(Date.now());

  schoolings = [
    { id: 1, description: 'Infantil' },
    { id: 2, description: 'Fundamental' },
    { id: 3, description: 'Médio' },
    { id: 4, description: 'Superior' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      dateOfBirth: [
        null,
        [Validators.required, FormValidations.dateBeforeTodayValidator()],
      ],
      schooling: [null, [Validators.required]],
    });

    const user = this.route.snapshot.data['user']['model'];

    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: this.formatDate(user.dateOfBirth),
      schooling: user.schooling,
    });
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid) {
      console.log('submit');

      let msgSuccess = 'Usuário criado com sucesso!';
      let msgError = 'Erro ao criar usuário, contate o suporte!';
      if (this.userForm.value.id) {
        msgSuccess = 'Usuário atualizado com sucesso!';
        msgError = 'Erro ao atualizar usuário, tente novamente!';
      }

      const MODEL = this.userForm.getRawValue();

      this.usersService.save(MODEL).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.location.back();
  }

  hasError(field: string) {
    return this.userForm.get(field).errors;
  }
}
