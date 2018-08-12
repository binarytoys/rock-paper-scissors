import { TestBed, inject } from '@angular/core/testing';

import { GameEngineService } from './game-engine.service';
import {MatSnackBar} from '@angular/material';

describe('GameEngineService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameEngineService, { provide: MatSnackBar}]
        });
    });

    it('should be created', inject([GameEngineService], (service: GameEngineService) => {
        expect(service).toBeTruthy();
    }));

    it('should calculate win condition', inject([GameEngineService], (service: GameEngineService) => {
        expect(service).toBeTruthy();

        expect(service.process('rock', 'rock')).toEqual({player: 0, ai: 0}, 'failed roc 2 rock');

        expect(service.process('rock', 'scissor')).toEqual({player: 1, ai: 0}, 'failed roc 2 scissor');

        expect(service.process('rock', 'paper')).toEqual({player: 0, ai: 1}, 'failed roc 2 paper');

        expect(service.process('scissor', 'scissor')).toEqual({player: 0, ai: 0}, 'failed scissor 2 scissor');

        expect(service.process('scissor', 'paper')).toEqual({player: 1, ai: 0}, 'failed scissor 2 paper');

        expect(service.process('scissor', 'rock')).toEqual({player: 0, ai: 1}, 'failed scissor 2 rock');

        expect(service.process('paper', 'paper')).toEqual({player: 0, ai: 0}, 'failed paper 2 paper');

        expect(service.process('paper', 'paper')).toEqual({player: 0, ai: 0}, 'failed paper 2 paper');

        expect(service.process('paper', 'scissor')).toEqual({player: 0, ai: 1}, 'failed paper 2 scissor');

        expect(service.process('paper', 'rock')).toEqual({player: 1, ai: 0}, 'failed paper 2 rock');

        expect(service.process('paper', 'scissor')).toEqual({player: 0, ai: 1}, 'failed paper 2 scissor');

        expect(service.process('paper', 'paper')).toEqual({player: 0, ai: 0}, 'failed paper 2 paper');
    }));
});
