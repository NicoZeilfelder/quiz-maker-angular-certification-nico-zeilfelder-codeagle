import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'removeCategoryPrefix',
})
export class RemoveCategoryPrefixPipe implements PipeTransform {
    transform(value: string, prefix: string): string {
        if (prefix) {
            return value
                .replace(prefix + ': ', ' ')
                .replace(prefix + ' & ', ' ');
        } else {
            return value;
        }
    }
}
