import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
    MatButtonModule, MatCardModule,
    MatChipsModule, MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({selector: 'app-board', template: ''})
class BoardStubComponent {}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule
            ],
            declarations: [
                AppComponent,
                BoardStubComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Rock-Paper-Scissors'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Rock-Paper-Scissors');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to Rock-Paper-Scissors!');
    }));
});
