import {async, TestBed} from '@angular/core/testing';
import {TwiceInARowAi} from './twice-ai';

describe('TwiceInARowAi', () => {
    it('should move "paper" on two "rock"', async(() => {
        const ai = new TwiceInARowAi();
        ai.turn('rock');
        expect(ai.turn('rock')).toEqual('paper');
    }));

    it('should move "scissor" on two "paper"', async(() => {
        const ai = new TwiceInARowAi();
        ai.turn('paper');
        expect(ai.turn('paper')).toEqual('scissor');
    }));

    it('should move "rock" on two "scissor"', async(() => {
        const ai = new TwiceInARowAi();
        ai.turn('scissor');
        expect(ai.turn('scissor')).toEqual('rock');
    }));
});
