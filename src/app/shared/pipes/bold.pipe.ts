import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'bold'
})
export class BoldPipe implements PipeTransform {
    transform(value: string, searchTerm: string): unknown {
        // return value?.toLowerCase().replace(searchTerm.toLowerCase(), '<strong>' + searchTerm.toLowerCase() + '</strong>');
        return value?.toLowerCase().replace(new RegExp(searchTerm.toLowerCase(), 'gi'),
            (match: string) => `<strong>${match}</strong>`);
    }
}
