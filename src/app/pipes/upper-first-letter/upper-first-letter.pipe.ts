import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstLetter',
})
export class UpperFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    const firstLetter = value.charAt(0);
    const restOfWord = value.slice(1);
    return firstLetter.toUpperCase() + restOfWord;
  }
}
