import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'bold'
})
export class BoldPipe implements PipeTransform {
    transform(value: string, searchTerm: string): unknown {
        return value?.toLowerCase().replace(searchTerm, '<strong>' + searchTerm + '</strong>');
    }

}
