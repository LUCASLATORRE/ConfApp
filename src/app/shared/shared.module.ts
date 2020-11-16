import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { InputFilterPipe } from './pipe/input-filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertModalComponent, ConfirmModalComponent, InputFilterPipe],
  exports: [AlertModalComponent, ConfirmModalComponent, InputFilterPipe],
})
export class SharedModule {}
