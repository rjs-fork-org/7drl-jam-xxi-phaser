import { GameObjects } from "phaser";
import { Player } from "./player";
import { LevelRenderer } from "../scenes/LevelRenderer";
import { Level } from "../dungeon-utils/level";

/** Base class for player and enemies. */
export abstract class Entity {
    // Representation in the field.
    /** This moves in the level and represents the character, @. */
    public charText: GameObjects.Text;
    /** Position on level grid. */
    // public positionXY: number[] = [];
    /** Current horizontal tile. */
    public x: number;
    /** Current vertical tile. */
    public y: number;
    public oldX: number;
    public oldY: number;
    public character: string = '@';

    /** Sets ASCII's position position. */
    public setPosition(x: number, y: number, alsoSetLocation: boolean = true): void {
        this.x = x;
        this.y = y;
        if (alsoSetLocation) {
            /** Setting location. */
            // console.log('also setting location of text');
            this.charText.setPosition(LevelRenderer.Instance.gridX(this.x), LevelRenderer.Instance.gridY(this.y))
            Level.baseLayerTexts.get(`${this.oldY},${this.oldX}`)?.setAlpha(1);
            Level.baseLayerTexts.get(`${this.y},${this.x}`)?.setAlpha(0);
        }
    }
}