import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import {Router} from '@angular/router';
import {
    MatButtonModule, MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

class Page {
    // getter properties wait to query the DOM until called.
    get buttons() { return this.queryAll<HTMLButtonElement>('button'); }
    get newGameBtn() { return this.buttons[0]; }
    get rockBtn() { return this.buttons[1]; }
    get paperBtn() { return this.buttons[2]; }
    get scissorBtn() { return this.buttons[3]; }
    get nameDisplay() { return this.query<HTMLElement>('#player-name'); }

    constructor(private fixture: ComponentFixture<BoardComponent>) {
        const component = fixture.componentInstance;
    }

    //// query helpers ////
    private query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector);
    }

    private queryAll<T>(selector: string): T[] {
        return this.fixture.nativeElement.querySelectorAll(selector);
    }
}

describe('BoardComponent', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;
    let page: Page;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                // BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatCardModule,
                MatChipsModule,
                MatIconModule,
                MatDividerModule,
                MatSnackBarModule,
                MatExpansionModule,
                MatFormFieldModule,
                MatInputModule,
                MatDialogModule,
                MatSelectModule
            ],
            declarations: [ BoardComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched data
            fixture.detectChanges();
        });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
