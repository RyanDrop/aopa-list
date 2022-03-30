import { Injectable } from '@angular/core';
import { format, formatDistanceStrict, nextSunday } from 'date-fns';
import { ReceivedDate, Unit } from './date-fns.service.models';
@Injectable({
  providedIn: 'root',
})
export class DateFnsService {
  currentDate = new Date();
  nextSunday = nextSunday(this.currentDate);
  formattedCurrentDate = this.formatDate(this.currentDate, 'yyyy,MM,dd');
  formattedNextSunday = this.formatDate(this.nextSunday, 'yyyy,MM,dd');

  formatDate(date: Date, formatString: string) {
    return format(date, formatString);
  }

  getDistanceBetweenDatesFromCurrentDate(date: ReceivedDate, unit: Unit) {
    const distance = formatDistanceStrict(
      new Date(this.formattedCurrentDate),
      new Date(date),
      {
        unit: unit,
      }
    );
    const replaceNotNumbers = distance.replace(/\D/g, '');
    return Number(replaceNotNumbers);
  }

  getDistanceBetweenDatesFromNextSunday(date: ReceivedDate, unit: Unit) {
    const distance = formatDistanceStrict(
      new Date(this.formattedNextSunday),
      new Date(date),
      {
        unit: unit,
      }
    );
    const replaceNotNumbers = distance.replace(/\D/g, '');
    return Number(replaceNotNumbers);
  }
}
