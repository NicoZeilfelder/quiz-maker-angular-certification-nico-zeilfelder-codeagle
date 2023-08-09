import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'bold'
})
export class BoldPipe implements PipeTransform {
    transform(value: string, searchTerm: string): unknown {
        return value ? value.replace(new RegExp(searchTerm, 'gi'), (match: string) => `<strong>${match}</strong>`) : '';
    }
}
