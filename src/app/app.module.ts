import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {BoardComponent, NewGameDialogComponent} from './board/board.component';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule, MatDialog, MatDialogModule,
    MatDividerModule,
    MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        NewGameDialogComponent
    ],
    imports: [
        BrowserModule,
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
    entryComponents: [ NewGameDialogComponent ],
    providers: [MatDialog],
    bootstrap: [AppComponent]
})
export class AppModule { }
