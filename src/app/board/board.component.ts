import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, ThemePalette} from '@angular/material';
import {GameEngineService} from '../game-engine.service';
import {debounceTime, distinctUntilChanged, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RandomAi} from '../ai/random-ai';
import {AiFactory} from '../ai/ai-factory';


@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    description = 'Rock-paper-scissors (also known as scissors-paper-rock or other variants) is a hand game usually played between ' +
    'two people, in which each player simultaneously forms one of three shapes with an outstretched hand. <br>A player who decides to play ' +
    'rock will beat another player who has chosen scissors ("rock crushes scissors" or sometimes "blunts scissors"), but will ' +
    'lose to one who has played paper ("paper covers rock"); a play of paper will lose to a play of scissors ("scissors cuts paper"). ' +
    ' <br>If both players choose the same shape, the game is tied and is usually immediately replayed to break the tie.<br>' +
        '<b>How to play</b><br>Press "New Game" and enter player name. Now you can press any button (ROCK, PAPER, SCISSORS) to make one' +
        ' turn. AI chooses his item independently from you. If AI wins, his item highlighted with red color, if loose - with primary ' +
        'UI color. If game is tied, AI item highlighted with yellow color.';

    myScore = 0;
    aiScore = 0;

    aiColor = 'green';

    items: string[] = ['rock', 'paper', 'scissor'];

    selectedItem = '';

    private clickPipe;

    playForm: FormGroup;
    nameControl: FormControl;

    playerName = '';

    private ai = new RandomAi();
    lastHumanTurn = '';

    aiName = '';
    aiVersion = '';

    aiFactory = new AiFactory();

    constructor(private zone: NgZone,
                private engine: GameEngineService,
                private dialog: MatDialog,
                private formBuilder: FormBuilder) {
        // this.playForm = this.formBuilder.group({
        //     name: ''
        // });
        // this.nameControl = this.playForm.get('name') as FormControl;

    }

    ngOnInit() {
        this.aiName = this.ai.name;
        this.aiVersion = this.ai.version;
    }

    makeTurn(item: string) {
        if (!this.clickPipe) {
            Observable.create(observer => {
                this.clickPipe = observer;
            }).pipe(
                tap(() => {this.selectedItem = ''; }),
                debounceTime(300),
                switchMap(val => of(val))) // wait 500ms after the last event before emitting last event
                // distinctUntilChanged(), // only emit if value is different from previous value
                // switchMap(val => {
                //     this.selectedItem = '';
                //
                //     const aiTurn = Math.floor(Math.random() * 3);
                //
                //     const aiResponse = this.items[aiTurn];
                //
                //     this.selectedItem = aiResponse;
                //
                //     const res = this.engine.process(item, aiResponse);
                //
                //     console.log(' my turn: ' + val + ' ai turn: ' + aiResponse + ' res = ' + res.player + ':' + res.ai);
                //
                //     return of(res);
                // }))
                .subscribe(value => {
                    this.selectedItem = '';

                    const aiResponse = this.ai.turn(this.lastHumanTurn);

                    this.selectedItem = aiResponse;

                    const res = this.engine.process(value, aiResponse);

                    console.log(' my turn: ' + value + ', ai turn: ' + aiResponse + ', res = ' + res.player + ':' + res.ai);

                    this.myScore += res.player;
                    this.aiScore += res.ai;

                    if (res.player > 0) {
                        this.engine.showSnackBar('You win!');
                        this.aiColor = 'primary';
                    }
                    if (res.ai > 0) {
                        this.engine.showSnackBar('You loose... :(');
                        this.aiColor = 'warn';
                    }
                    if (res.ai === 0 && res.player === 0) {
                        // game is tied
                        this.aiColor = 'accent';
                        this.engine.showSnackBar('Game is tied, please move again.');
                    }

                    this.lastHumanTurn = value;
                });
        }

        this.clickPipe.next(item);
    }

    isSelected(item) {
        return item === this.selectedItem;
    }

    getAiColor() {
        return this.aiColor;
    }

    startNewGame() {
        const dialogRef = this.dialog.open(NewGameDialogComponent,
            {width: '50%', data: {name: '', ai: this.aiName}}
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const changed = this.playerName !== result.name;
                this.playerName = result.name;
                this.ai = this.aiFactory.create(result.ai.name);

                if (changed) {
/*
                    this.trackboxService.updateTrack(this.track).subscribe(res => {
                        console.log('Track updated');
                    });
*/
                }
            }
        });

    }
}

@Component({
    selector: 'app-new-game-dialog',
    templateUrl: './new-game.dialog.html',
    styles: ['.input-container {\n' +
    '    width: 100%;\n' +
    '}', 'mat-dialog-actions{justify-content: flex-end;}']
})
export class NewGameDialogComponent {

    playerName = '';
    nameForm: FormGroup;
    nameCtrl: FormControl;
    selected: any;

    ais: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<NewGameDialogComponent>) {
        this.playerName = data.name;
        this.nameForm = this.formBuilder.group({
            nameControl: [data.name, [Validators.required]]
        });
        this.nameCtrl = this.nameForm.get('nameControl') as FormControl;

        const factory = new AiFactory();
        this.ais = factory.getList();
        this.selected = this.ais[0];
    }

    submit(form) {
        this.dialogRef.close({name: this.nameCtrl.value, ai: this.selected});
    }

}
