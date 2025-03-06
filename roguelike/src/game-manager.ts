import { Ancestries } from "./character-creation/ancestries";
import { Level } from "./dungeon-utils/level";
import { LevelGenerator } from "./dungeon-utils/level-generator";
import { Player } from "./entities/player";
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
        LevelGenerator.generateDungeonRoomForHeavensGate(-1);
        LevelRenderer.Instance.spawnMapEntities();
        Level.baseLayerTexts.get(`${Player.Instance.y},${Player.Instance.x}`)?.setAlpha(0);
    }
}
