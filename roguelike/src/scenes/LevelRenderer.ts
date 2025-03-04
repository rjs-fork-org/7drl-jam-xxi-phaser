import { Scene } from "phaser";
import { Map as Level } from "../dungeon-utils/map";
import { EntityConfig } from "../interfaces/entity-config";

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
    public static Instance: LevelRenderer;

    /** Style and other info for spawned entities */
    private entitySpawnConfigs: Map<string, EntityConfig> = new Map<string, EntityConfig>([
        ['@', { textStyle: {} }],
        ['.', { textStyle: { color: "#2C3112FF" } }],
        ['#', { textStyle: { color: "#2C3112FF", backgroundColor: "#B143B1FF" }, description: 'Wall.' }]
    ]);

    constructor() {
        super('LevelRenderer');
        LevelRenderer.Instance = this;
    }

    create() {
        console.log(LevelRenderer.name);
        const { width, height } = this.scale;
        this.cellWidth = width * 0.02;
        this.cellHeight = width * 0.028;
        this.gridStartX = width * 0.5 - 4.7 * this.cellWidth;
        this.gridStartY = height * 0.05;

        const showGrid: boolean = false;
        if (showGrid) {
            this.add.grid(
                this.gridStartX - this.cellWidth * 0.25,
                this.gridStartY - this.cellHeight * 0.5,
                this.cellWidth * 10,
                this.cellHeight * 10,
                this.cellWidth,
                this.cellHeight,
                0xffffff,
                0.2,
                0xffffff,
                1
            )
                .setOrigin(0);
        }
    }

    public spawnMapEntities(): void {

        for (let i = 0; i < Level.dungeonBaseLayer.length; i++) {
            const row = Level.dungeonBaseLayer[i];

            for (let j = 0; j < row.length; j++) {
                this.add.text(this.gridX(j), this.gridY(i), row[j],
                    { fontSize: 52, ...this.entitySpawnConfigs.get(row[j])?.textStyle }
                )
                    .setOrigin(0.5, 0.5)
                    .setInteractive()
                    .on('pointerover', () => console.log(
                        this.entitySpawnConfigs.get(row[j])?.description ?? '')
                    );
            }
        }
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
