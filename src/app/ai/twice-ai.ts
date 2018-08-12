import {IAi} from './iai';
import {never} from 'rxjs';

export class TwiceInARowAi implements IAi {
    public readonly name = 'Twice';
    public readonly version = '0.1';
    public readonly description = 'AI implements "Twice-in-a-row" strategy. If opponent plays the same move twice in a row, they’re not ' +
        'likely to use it a third time. So, AI can assume they won’t throw that move. Put out a move that will give AI either a win ' +
        'or stalemate, guaranteeing AI won’t lose.';

    lastTurn = '';
    private items: string[] = ['rock', 'paper', 'scissor'];

    turn(prevHumanTurn: string) {
        let res;
        if (this.lastTurn === prevHumanTurn) {
            res = this.chooseTwice(prevHumanTurn);
        } else {
            // make random move
            res = this.makeRandom();
        }
        this.lastTurn = prevHumanTurn;

        return res;
    }

    private makeRandom() {
        const aiTurn = Math.floor(Math.random() * 3);

        return this.items[aiTurn];
    }

    chooseTwice(move: string) {
        if (move === 'rock') {
            return 'paper';
        } else if (move === 'paper') {
            return 'scissor';
        } else if (move === 'scissor') {
            return 'rock';
        }
        return this.makeRandom();
    }
}
