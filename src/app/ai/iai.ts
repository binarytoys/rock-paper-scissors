export interface IAi {
    readonly version: string;
    readonly name: string;
    readonly description: string;

    turn(prevHumanTurn: string);
}
