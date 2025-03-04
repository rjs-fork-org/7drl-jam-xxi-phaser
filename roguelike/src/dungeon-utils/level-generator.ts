import { Map } from "./map";

/** 
 * Used to make ASCII roguelike levels that fit the game. 
 * For now this is largely a placeholder until more sophisticated
 * algorithms are written and designed.
 * 
 * Levels consist of base/ground layer which doesn't change on it's own
 * and items and monsters and temporary environmental effects that are placed 
 * on top of that the base layer. For pathfinding, attacks, and movement checks
 * a combined map is made (which is what is visible for the player).
 * 
 * Monsters, player, items and temporary environmental effects are gameobjects 
 * which are not saved to 2D grid but they are rather a collection of 
 * gameobjects. This will save some memory. Enemies take 1 space and multiple
 * enemies can't be in the same space. Environmental effects are directly over
 * base layer and then comes enemies. 
 * 
 * This script makes the maps and enemy/item collections and sends them forward
 * to LevelRenderer.ts (TODO) and/or other systems to be processed.
 * 
 * Level coordinates begin from x0, y0 at bottom left corner to make
 * calculations simpler. 
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
    public static generateDungeonRoomForHeavensGate(floor: number): string[][] {
        const room: string[][] = [];
        let playerPosXY: number[] = [];
        const x = 0;
        const y = 1;
        if (floor === -1) {
            // yard leading up to the tower
            // in smaller scale
            room.push([".........."])
            room.push(["...####.⚶."])
            room.push(["..######.."])
            room.push(["..######.."])
            room.push(["..⚘#^^#⚘.."])
            room.push(["....::...."])
            room.push(["..ȹ.::.ȹ.."])
            room.push(["....::...."])
            room.push(["..ȹ.::.ȹ.."])
            room.push(["....::...."])
            // player is at 1, 5
            playerPosXY[x] = 1;
            playerPosXY[y] = 5;
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
            room.push(["..######.."])
            room.push([".#..~~..#."])
            room.push(["#.......^#"])
            room.push(["#........#"])
            room.push(["#........#"])
            room.push(["#........#"])
            room.push(["#........#"])
            room.push(["#........#"])
            room.push(["⚘#......#⚘"])
            room.push([".⚘##==##⚘."])
            // player is at 0, 4/5
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

        Map.dungeonBaseLayer = room.flat();
        return room;
    }
}
