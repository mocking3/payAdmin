import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function equalValidator(value: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const v = control.value;
        if (v == "")
            return null;
        const no = value == v;
        return no ? null : {'equal': {v}};
    };
}

@Directive({
    selector: '[equal]',
    providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator, OnChanges {
    @Input() equal: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['equal'];
        if (change) {
            this.valFn = equalValidator(change.currentValue);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }
}