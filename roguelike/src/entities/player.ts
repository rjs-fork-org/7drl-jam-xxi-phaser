import { GameObjects } from "phaser";
import { Attributes } from "../character-creation/attributes";
import { AncestryType } from "../enums/ancestry-type";
import { Entity } from "./entity";
import { GameplayUi } from "../scenes/GameplayUi";
import { Level } from "../dungeon-utils/level";

/** 
 * The main player script that holds data about the player and commands. 
 * PlayerController should be a separate script.
 */
export class Player extends Entity {
    // Outcomes of character creation + HP, MP
    /** Ancestry as a string presentation. */
    private ancestryName: string = 'Human';
    /** Ancestry as enum. */
    private ancestryType: AncestryType = AncestryType.Human;
    private name: string = 'John Doe';
    /** Attributes/stat points are between 0 and 3 (Avg/Good/Great/Divine). */
    private attributes: Attributes;
    /** Maximum hit points. Increases by 5 for every con. */
    private maxHitPoints: number = 25;
    /** Current hit points of the player. Regenerates on their own. */
    private currentHitPoints: number = this.maxHitPoints;
    /** Maximum mana. */
    private maxMana: number = 5;
    /** Current mana of the player. Regenerates on their own. */
    private currentMana: number = this.maxMana;
    /** 
     * Access pattern. Monsters and game systems might be interested in
     * Player and lots of CPU time saving guard clauses can be made for 
     * example in regards to distance to player entity. 
     */
    public static Instance: Player;

    /** Sets up the singleton. */
    constructor() {
        super();
        Player.Instance = this;
    }

    // Movement
    public moveRight(): void {
        // if not on grid do nothing
        if (this.x >= Level.levelHeight) {
            GameplayUi.Instance.addMovementWarningToLog(`At level edge.`);
            return;
        }
        // see whats on right
        if (Level.isUntravellableAt(this.x + 1, this.y)) {
            // not ok to move
            GameplayUi.Instance.addMovementWarningToLog(`Bump.`);
        }
        else if (Level.isMonsterAt(this.x, this.y)) {
            // not ok to move, attack monster instead
        }
        else {
            // ok to move
            this.oldX = this.x;
            this.oldY = this.y;
            this.x++;
            this.setPosition(this.x, this.y);
        }
    }

    public moveLeft(): void {
        GameplayUi.Instance.addMovementWarningToLog(`Can't move left.`);

    }

    public moveUp(): void {
        GameplayUi.Instance.addMovementWarningToLog(`Can't move up.`);

    }

    public moveDown(): void {
        GameplayUi.Instance.addMovementWarningToLog(`Can't move down.`);

    }

    // Character creation
    /** Sets player's ancestry. */
    public setAncestry(ancestryType: AncestryType, ancestryName: string): void {
        /* eslint-disable-next-line prefer-rest-params -- Don't think this rule applies here. */
        console.log(Player.name, this.setAncestry.name, ...arguments);

        this.ancestryName = ancestryName;
        this.ancestryType = ancestryType;
    }

    /** Sets max hitpoints for the player. Does not heal the player. */
    public setMaxHitPoints(amount: number): void {
        /* eslint-disable-next-line prefer-rest-params -- Don't think this rule applies here. */
        console.log(Player.name, this.setMaxHitPoints.name, ...arguments);

        this.maxHitPoints = amount;
    }

    /** Sets player's attributes. */
    public setAttributes(attributes: Attributes) {
        /* eslint-disable-next-line prefer-rest-params -- Don't think this rule applies here. */
        console.log(Player.name, this.setAttributes.name, ...arguments);

        this.attributes = attributes;
    }

    /** Sets player's name. */
    public setName(name: string) {
        /* eslint-disable-next-line prefer-rest-params -- Don't think this rule applies here. */
        console.log(Player.name, this.setName.name, ...arguments);

        this.name = name;
    }
}
