import {IAi} from './iai';

export class RandomAi implements IAi {

    private items: string[] = ['rock', 'paper', 'scissor'];

    public readonly version = '0.1';
    public readonly name = 'Random';
    public readonly description = 'AI make move randomly.';

    public turn(prevHumanTurn: string) {
        const aiTurn = Math.floor(Math.random() * 3);

        const aiResponse = this.items[aiTurn];

        return aiResponse;
    }

}
