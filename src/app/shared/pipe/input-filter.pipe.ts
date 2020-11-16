import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputFilter',
})
export class InputFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value.length === 0 || args === undefined || args === '') {
      return value;
    }

    let filter = args.toLocaleLowerCase();
    // return value.filter(v => v.firstName.toLocaleLowerCase().includes(filter));

    return value.filter(p => {
      return Object.keys(p).some(k => {
        return p[k].toString().toLowerCase().indexOf(filter) != -1;
      });
    });
  }
}
