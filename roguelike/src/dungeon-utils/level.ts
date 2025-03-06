import { GameObjects } from "phaser";

/** Map as in Level. Stores info about what's on the map. */
export class Level {
    /** Consists of walls and floors. */
    public static dungeonBaseLayer: string[];
    public static baseLayerTexts: Map<string, GameObjects.Text> = new Map<string, GameObjects.Text>();
    /** Stores which items are on the floor. */
    public static dungeonItems: { [id: string]: string } = {};
    /** Stores where monsters are. */
    public static dungeonMonsters: { [id: string]: string } = {};
    /** This is what is shown in the screen console style. */
    public dungeonPresentationLayer: string[] = [];
    /** Zero-indexed (9 = 10). How many tiles wide. */
    public static readonly levelWidth: number = 9;
    /** Zero-indexed (9 = 10). How many tiles tall. */
    public static readonly levelHeight: number = 9;


    constructor() {

    }

    /** Tile contains monster? */
    public static isMonsterAt(x: number, y: number): boolean {
        return false;
    }

    /** 
     * Tile contains wall or other untravellable? 
     * Does not include monsters as that's a separate check. 
     */
    public static isUntravellableAt(x: number, y: number): boolean {
        // console.log(Level.dungeonBaseLayer[y][x]);
        return Level.dungeonBaseLayer[y][x] === '#';
    }

    private static getCharAt(x: number, y: number): string {
        if (Level.dungeonMonsters[x + ',' + y]) {
            console.log('monster at tile');
            return Level.dungeonMonsters[x + ',' + y];
        }

        return "#";
    }
}