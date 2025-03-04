/** Map as in Level. Stores info about what's on the map. */
export class Map {
    /** Consists of walls and floors. */
    public static dungeonBaseLayer: string[];
    /** Stores which items are on the floor. */
    public static dungeonItems: { [id: string]: string } = {};
    /** Stores where monsters are. */
    public static dungeonMonsters: { [id: string]: string } = {};
    /** This is what is shown in the screen console style. */
    public dungeonPresentationLayer: string[] = [];

    constructor() {

    }
}