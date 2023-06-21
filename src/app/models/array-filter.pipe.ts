import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: Array<any>, filter: string): any {
    if (filter) {
      filter = filter.toUpperCase();
        
        return value.filter(a =>
            a.firstName.toUpperCase().indexOf(filter) >= 0
        );
    } else {
        return value;
    }
  }
}
