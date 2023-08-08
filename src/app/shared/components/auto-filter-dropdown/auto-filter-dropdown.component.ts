import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RemoveCategoryPrefixPipe} from "../../pipes/remove-category-prefix.pipe";

@Component({
    selector: 'app-auto-filter-dropdown',
    templateUrl: './auto-filter-dropdown.component.html',
    styleUrls: ['./auto-filter-dropdown.component.css']
})
export class AutoFilterDropdownComponent implements OnInit {
    get options(): Array<any> {
        return this._options;
    }

    @Input()
    set options(value: Array<any>) {
        this._options = value;
        this.filterOptions('');

        if (!value.find(v => v.name === this.selectedOption)) {
            console.log(this.selectedOption);
            console.log(value);
            this.selectedOption = '';
        }
    }

    @Input() disabled: boolean = false;
    @Input() filterProperty: string = '';

    @Input() removePrefixes: boolean = false;
    @Input() prefix: string | undefined = undefined;

    @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

    public selectedOption: string = '';
    public showOptions: boolean = false;
    public filteredOptions: Array<any> = []

    private _options: Array<any> = [];

    constructor(private removeCategoryPrefixPipe: RemoveCategoryPrefixPipe) {
    }

    public ngOnInit() {
        this.filteredOptions = this._options;
    }

    public focusIn(event: FocusEvent): void {
        event.preventDefault();
        this.filterOptions('');
        this.showOptions = true;
    }

    public filterOptions(searchTerm: string): void {
        if (!searchTerm) {
            this.filteredOptions = this._options
            return;
        }

        const _searchTerm = searchTerm.toLowerCase();

        if (this.filterProperty) {
            this.filteredOptions = this._options.filter(o => {
                const value = o[this.filterProperty]?.toLowerCase();
                return value.includes(_searchTerm);
            });
        } else {
            this.filteredOptions = this._options.filter(o => o?.toLowerCase()?.includes(_searchTerm));
        }
    }

    public selectOption(option: any): void {
        this.selectedOption = this.removePrefixes && this.prefix ?
            this.removeCategoryPrefixPipe.transform(this.getOption(option), this.prefix) :
            this.getOption(option);
        this.showOptions = false;
        this.filterOptions('');
        this.optionSelected.emit(option)
    }

    public getOption(option: any): string {
        return this.filterProperty && option ? option[this.filterProperty] : option;
    }

}
