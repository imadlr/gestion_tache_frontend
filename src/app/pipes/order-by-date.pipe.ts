import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(array: any[], property: string, order: 'asc' | 'desc'): any[] {
    if (!Array.isArray(array) || !property) {
      return array;
    }

    array.sort((a, b) => {
      const dateA = new Date(a[property]);
      const dateB = new Date(b[property]);

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    return array;
  }

}
