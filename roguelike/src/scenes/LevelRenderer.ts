import { Scene } from "phaser";
import { Map } from "../dungeon-utils/map";

/** 
 * Renders parts of the level what will become visible to the player.
 * 
 * Does most of its job at the beginning of level where it spawns gameobjects
 * which can act independently.
 */
export class LevelRenderer extends Scene {
    private cellWidth: number = 0;
    private cellHeight: number = 0;
    private gridStartX: number = 0;
    private gridStartY: number = 0;

    constructor() {
        super('LevelRenderer');
    }

    create() {
        console.log(LevelRenderer.name);
        const { width, height } = this.scale;
        this.cellWidth = width * 0.02;
        this.cellHeight = width * 0.03;
        this.gridStartX = width * 0.1;
        this.gridStartY = width * 0.1;

        this.spawnMapEntities();

    }

    public spawnMapEntities(): void {

        for (let i = 0; i < Map.dungeonBaseLayer.length; i++) {
            const row = Map.dungeonBaseLayer[i];

            for (let j = 0; j < row.length; j++) {
                this.add.text(this.gridX(j), this.gridY(i), row[j]);
            }
        }
        this.add.text()
    }

    private gridX(horizontalTileNumber: number): number {
        return this.gridStartX + horizontalTileNumber * this.cellWidth
    }

    private gridY(verticalTileNumber: number): number {
        return this.gridStartY + verticalTileNumber * this.cellHeight
    }

    /** 
     * Can be used to redraw the things that were hidden 
     * when prev tile owner was here. 
     */
    public entityLeaveTile(): void {

    }
}
