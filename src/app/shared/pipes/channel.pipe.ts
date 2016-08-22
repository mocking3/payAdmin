import { Pipe, PipeTransform } from '@angular/core';
import {Constants} from '../constants';

@Pipe({name: 'channel'})
export class ChannelPipe implements PipeTransform {
    transform(value: string): number {
        return Constants.CHANNEL[value];
    }
}