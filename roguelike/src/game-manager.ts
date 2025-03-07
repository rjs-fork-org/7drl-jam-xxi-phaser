import { Ancestries } from "./character-creation/ancestries";
import { Level } from "./dungeon-utils/level";
import { LevelGenerator } from "./dungeon-utils/level-generator";
import { Player } from "./entities/player";
import { GameplayUi } from "./scenes/GameplayUi";
import { LevelRenderer } from "./scenes/LevelRenderer";

/** 
 * Processes general game logic with the help of other classes.
 * 
 * Stub until game logic has been designed & diagrammed.
 * */
export class GameManager {
    /** Level generator. */
    private levelGen: LevelGenerator;
    /** Seed the playthrough uses. */
    private gameSeed: number = Phaser.Math.RND.integer();
    // todo add couple random number generators for level generation
    // and other functionality like combat
    public static Instance: GameManager;

    /** Sets up singleton and sets up other game systems like Player. */
    constructor() {
        GameManager.Instance = this;
        new Player();
        new Ancestries();
    }

    /** Starts game after making a character. */
    public startGame(): void {
        console.log('Game started on GameManager.');
        this.levelGen = new LevelGenerator();
        Level.currentFloor = -1;
        LevelGenerator.generateDungeonRoomForHeavensGate();
        LevelRenderer.Instance.spawnMapEntities();
        Level.baseLayerTexts.get(`${Player.Instance.y},${Player.Instance.x}`)?.setAlpha(0);
    }

    /** When in dungeon the player can go up a level from a '^' char */
    public ascendFloor(): void {
        Level.currentFloor++;
        LevelGenerator.generateDungeonRoomForHeavensGate();
        LevelRenderer.Instance.spawnMapEntities();
        Level.baseLayerTexts.get(`${Player.Instance.y},${Player.Instance.x}`)?.setAlpha(0);
    }

    /** 
     * Possible in areas accessible from world map.
     * Going out of bounds there brings player back to world map. 
     */
    public goOutsideArea(): void {
        // during jam going outside a dungeon area / town is not possible.
        GameplayUi.Instance.addMovementWarningToLog(`Can't leave to world map.`);
    }
}
