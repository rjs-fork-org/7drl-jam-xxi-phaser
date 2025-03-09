import { Foe } from "../entities/foe";
import { Foes } from "../entities/foes";
import { Player } from "../entities/player";
import { GameplayUi } from "../scenes/GameplayUi";
import { Level } from "./level";

/** 
 * Used to make ASCII roguelike levels that fit the game. 
 * For now this is largely a placeholder until more sophisticated
 * algorithms are written and designed.
 * 
 * Levels consist of base/ground layer which doesn't change on it's own
 * and items and monsters and temporary environmental effects that are placed 
 * on top of that the base layer. For pathfinding, attacks, and movement checks
 * a combined map can be made (which is what is visible for the player).
 * 
 * Monsters, player, items and temporary environmental effects are gameobjects 
 * which are not saved to 2D grid but they are rather a collection of 
 * gameobjects in hash map. Enemies take 1 space and multiple
 * enemies can't be in the same space. Environmental effects are directly over
 * base layer and then comes items and then enemies. 
 * 
 * This script makes the maps and enemy/item collections and sends them forward
 * to LevelRenderer.ts (TODO) and/or other systems to be processed.
 * 
 * Level coordinates begin from x0, y0 at top left corner. Coordinante is 
 * accessed by searching levelbase[y][x] (string array), or by querying maps
 * with key x,y.
 * */
export class LevelGenerator {

    private inView: number[][] = [[]];

    /** Will generate a level based on seed and RNG. */
    public generateLevel(): string[][] {
        return this.spawnRoomTest();
    }

    /** Used to test the room spawning. */
    private spawnRoomTest(): string[][] {
        const retVal: string[][] = [[]];
        retVal[0] = "#######".split('');
        retVal.push("#B....#".split(''));
        retVal.push("#...###".split(''));
        retVal.push("#.....#".split(''));
        retVal.push("###A..#".split(''));
        retVal.push("#######".split(''));
        return retVal;
    }

    /** 
     * Makes a new room on the heavens gate dungeon. 
     * Rooms -1 entrance and 0 base floor are more or less pre generated
     * and so is the winning floor 72. 
     * 
     * @param floor what floor to generate. Some are premade. Difficulty increases. From -1 to 72.
     */
    public static generateDungeonRoomForHeavensGate(): string[] {
        LevelGenerator.levelCleanup();

        // full demo should have about 72 + 3 floors + yard + first floor.
        const floor = Math.min(Level.currentFloor, 75);
        const room: string[] = [];
        let playerSpawnX: number = 0;
        let playerSpawnY: number = 0;
        const stairSpawnPositionsXY: number[][] = [[8, 2], [2, 1], [1, 7], [7, 8]]
        if (floor === -1) {
            // yard leading up to the tower
            // in smaller scale
            room.push("..........")
            room.push("...####.⚶.")
            room.push("..######..")
            room.push("..######..")
            room.push("..⚘#^=#⚘..")
            room.push("....::....")
            room.push("..ȹ.::.ȹ..")
            room.push("....::....")
            room.push("..ȹ.::.ȹ.#")
            room.push("....::....")
            // player is at 1, 5
            playerSpawnX = 5;
            playerSpawnY = 8;
            // You have arrived at your trial
            // the gate to heaven, will you ascend?
            // or will you fall?
            // For the ascended shall be light 
            // as upper plane angels. Wonder if that's true.
            //  
            // the tower goes up to the clouds, so will I.
            //
            // Remember what the fortune teller said.
            // This is only a giant's leap, 
            // there's many more to take.
        }
        else if (floor === 0) {
            room.push("  ######  ")
            room.push(" #......# ")
            room.push("#.......^#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("⚘#......#⚘")
            room.push(" ⚘##==##⚘ ")
            // room[stairSpawnPositionsXY[floor[1][stairSpawnPositionsXY[floor][0]] = '^';
            playerSpawnX = 4;
            playerSpawnY = 8;
            GameplayUi.Instance.addToLogText('The doors slam shut.')
            // the doors slam shut
            // the signs read:
            // many have come to seek gain
            // the tower accepts their sacrifice
            // ON REVISIT from yard revisit they say
            // As you come you will leave.
            // None can be given what is not earned.
            // A journey filled with bodies, 
            // of toil and thunder, is earned or plunder?
            // AND
            // If you believe in yourself, 
            // cross the chasm of death, 
            // fly to the sky. Meet us. 
            // If not, sleep and never come back.
            // WHEN GOING UPSTAIRS go to same floor
            // WHEN GOING OUTSIDE there's now a chasm 
            // when you go over it you are over 
            // the emptiness and screen fades black
            // YOU DIED (pause)
            // After a long happy life.
            // After you freed the land of evil.
            // Your wings imbued with Spirit.
            // Your mind full of trust.
            // And with curiosity.
            // Gained Corrupted Wings: Hover (Spi + 1).
            // IF SLEEPING ^ +
            // You never looked back, as no soul is perfect.
            // You found your way and used the
            // other blessings, the Horn Helmet, 
            // The Forgotten Wisp, The Rings of Earthmother.
            // And you felt, that what you gained that day
            // kept your heels on the ground but raised your
            // spirit to the sky.
            // Gained Spi +1 (from 0 to 1).
        }
        else if (floor > 0) {
            room.push("  ######  ");
            room.push(" #......# ")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push("#........#")
            room.push(" #......# ")
            room.push("  ######  ")
            let stairRow = room[stairSpawnPositionsXY[floor % 4][1]];
            console.log('stair should go to place: ' + stairSpawnPositionsXY[floor % 4][0]);
            stairRow = stairRow.slice(0, stairSpawnPositionsXY[floor % 4][0]) + '^' + stairRow.slice(stairSpawnPositionsXY[floor % 4][0] + 1);
            console.log(stairRow);
            room[stairSpawnPositionsXY[floor % 4][1]] = stairRow;
            playerSpawnX = Player.Instance.x;
            playerSpawnY = Player.Instance.y;
        }
        Player.Instance.setPosition(playerSpawnX, playerSpawnY, false);

        // generate monsters
        for (let y = 0; y < room.length; y++) {
            for (let x = 0; x < room[y].length; x++) {
                // don't spawn monster to player's starting tile
                if (y === playerSpawnY && x === playerSpawnX) {
                    continue;
                }

                if (room[y][x] === '.' && Phaser.Math.Between(1, 100) <= 5) {
                    let foe = Foes.generateFoe();
                    foe.x = x;
                    foe.y = y;
                    Level.dungeonMonsters.set(`${x},${y}`, foe);
                }
            }
        }

        Level.dungeonBaseLayer = room;

        return room;
    }

    /** Needs to be done to flush the level and monsters before making new ones. */
    private static levelCleanup(): void {
        Level.destroyItemsMonstersAndBaseLayerTexts();
        Player.Instance.charText?.destroy();
    }
}
