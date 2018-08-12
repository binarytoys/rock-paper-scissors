import {AfterViewInit, Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('titleState', [
            state('inactive', style({
                // transform: 'translateY(-100%)',
                opacity: 0,
                height: 0
            })),
            state('active', style({
                // transform: 'translateY(0%)',
                opacity: 1,
                height: '*'
            })),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => inactive', animate('300ms 3s ease-out'))
        ])
    ]
})
export class AppComponent implements AfterViewInit {
    title = 'Rock-Paper-Scissors';

    titleState = 'active';

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.titleState = 'inactive';
        });
    }
}
