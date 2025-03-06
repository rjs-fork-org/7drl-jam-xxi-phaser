import { GameObjects, Scene } from "phaser";
import { Level } from "../dungeon-utils/map";
import { EntityConfig } from "../interfaces/entity-config";
import { GameplayUi } from "./GameplayUi";
import { Player } from "../entities/player";

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
        ['.', { textStyle: { color: "#51553DFF" } }],
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
        this.gridStartX = width * 0.5 - 4.5 * this.cellWidth;
        this.gridStartY = height * 0.06;

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

    /** Spawns everything else but monsters and player. */
    public spawnMapEntities(): void {
        for (let i = 0; i < Level.dungeonBaseLayer.length; i++) {
            const row = Level.dungeonBaseLayer[i];

            for (let j = 0; j < row.length; j++) {
                const char = this.add.text(this.gridX(j), this.gridY(i), row[j],
                    { fontSize: 52, ...this.entitySpawnConfigs.get(row[j])?.textStyle }
                )
                    .setOrigin(0.5, 0.5)
                    .setInteractive()
                    .on('pointerover', () => {
                        GameplayUi.Instance.updateYouSeeText(this.entitySpawnConfigs.get(row[j])?.description ?? '');
                    });
                Level.baseLayerTexts.set(`${i},${j}`, char);
            }

        }
        this.spawnPlayer();
    }

    /** Spawns player to field. */
    public spawnPlayer(): void {
        const gridPos: number[] = Player.Instance.positionXY;
        const char: GameObjects.Text = this.add.text(
            this.gridX(gridPos[0]), this.gridY(gridPos[1]), '@',
            { fontSize: 52, ...this.entitySpawnConfigs.get('@')?.textStyle }
        )
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => {
                GameplayUi.Instance.updateYouSeeText(
                    this.entitySpawnConfigs.get('@')?.description ?? '');
            });
        Player.Instance.charText = char;
        Level.baseLayerTexts.get(`${gridPos[1]},${gridPos[0]}`)
            ?.setAlpha(0);
    }

    /** Returns tile coordinates from grid coordinates. */
    public gridX(horizontalTileNumber: number): number {
        return this.gridStartX + horizontalTileNumber * this.cellWidth
    }

    /** Returns tile coordinates from grid coordinates. */
    public gridY(verticalTileNumber: number): number {
        return this.gridStartY + verticalTileNumber * this.cellHeight
    }

    /** 
     * Can be used to redraw the things that were hidden 
     * when prev tile owner was here. 
     */
    public entityLeaveTile(): void {

    }
}
