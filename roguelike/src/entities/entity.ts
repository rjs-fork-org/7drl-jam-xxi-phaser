/** Base class for player and enemies. */
export abstract class Entity {
    /** Position on level grid. */
    public positionXY: number[] = [];
    public character: string = '@';

    /** Sets ASCII's position position. */
    public setPosition(position: number[]): void {
        this.positionXY = position;

    }
}