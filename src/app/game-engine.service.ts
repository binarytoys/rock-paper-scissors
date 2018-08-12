import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

    constructor(private snackBar: MatSnackBar) { }

    public process(player: string, ai: string) {
        let playerRes = 0;
        let aiRes = 0;

        if (player === 'rock' ) {
            if (ai === 'paper') {
                aiRes = 1;
            } else if (ai === 'scissor') {
                playerRes = 1;
            }
        } else if (player === 'paper' ) {
            if (ai === 'scissor') {
                aiRes = 1;
            } else if (ai === 'rock') {
                playerRes = 1;
            }
        } else if (player === 'scissor' ) {
            if (ai === 'rock') {
                aiRes = 1;
            } else if (ai === 'paper') {
                playerRes = 1;
            }
        }

        console.log('SERVICE: player: ' + player + ', ai: ' + ai + ', res = ' + playerRes + ':' + aiRes);
        return {player: playerRes, ai: aiRes};
    }

    showSnackBar(text): void {
        const config: any = new MatSnackBarConfig();
        config.duration = 1000;
        this.snackBar.open(text, 'OK', config);
    }


}
