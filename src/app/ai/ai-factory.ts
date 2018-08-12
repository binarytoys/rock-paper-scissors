import {isNullOrUndefined} from 'util';
import {RandomAi} from './random-ai';
import {TwiceInARowAi} from './twice-ai';

export class AiFactory {
    public create(aiName?: string) {
        if (isNullOrUndefined(aiName)) {
            return new RandomAi();
        }

        if (aiName.toLowerCase() === 'random') {
            return new RandomAi();
        }
    }

    public getList() {
        const rand = new RandomAi();
        const twice = new TwiceInARowAi();
        return [
            {name: rand.name, version: rand.version, description: rand.description},
            {name: twice.name, version: twice.version, description: twice.description}
        ];
    }
}
