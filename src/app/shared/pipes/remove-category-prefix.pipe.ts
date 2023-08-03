import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'removeCategoryPrefix'
})
export class RemoveCategoryPrefixPipe implements PipeTransform {
    transform(value: string, category: string): string {
        if (category) {
            return value
                .replace(category + ': ', ' ')
                .replace(category + ' & ', ' ');
        } else {
            return value;
        }
    }
}
