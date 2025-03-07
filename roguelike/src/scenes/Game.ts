import { Input, Scene } from 'phaser';
import { GameManager } from '../game-manager';
import { Player } from '../entities/player';

/** 
 * Main adventure gamemode that is started by selecting New Game
 * and going through Character Creation. Alternatively load new game 
 * can be also used when that is implemented.
 * 
 * Atm used for grabbing player input as the scene has access to input
 * plugin and as a general class movement could be part of game.
 */
export class Game extends Scene {
    // Player input handling (must be done in scene to access plugin?).
    private firstUpPress = true;
    private firstDownPress = true;
    private firstLeftPress = true;
    private firstRightPress = true;

    constructor() {
        super('Game');
    }

    /** Create UI and start the game. */
    create() {
        // const { width, height } = this.scale;

        // // Placeholder text.
        // this.add.text(width * 0.5, height * 0.5, 'Insert Gameplay here.', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        // Show map and begin game loop.
        GameManager.Instance.startGame();
    }

    /** Processes input for the player. */
    update() {
        const upW: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        const upArrow: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        if (this.firstUpPress && (upW?.isDown || upArrow.isDown)) {
            Player.Instance.moveUp();
            this.firstUpPress = false;
        }
        else if (!(upW?.isDown || upArrow.isDown)) {
            this.firstUpPress = true;
        }
        const downS: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const downArrow: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        if (this.firstDownPress && (downS?.isDown || downArrow.isDown)) {
            Player.Instance.moveDown();
            this.firstDownPress = false;
        }
        else if (!(downS?.isDown || downArrow.isDown)) {
            this.firstDownPress = true;
        }
        const leftA: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const leftArrow: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        if (this.firstLeftPress && (leftA?.isDown || leftArrow.isDown)) {
            Player.Instance.moveLeft();
            this.firstLeftPress = false;
        }
        else if (!(leftA?.isDown || leftArrow.isDown)) {
            this.firstLeftPress = true;
        }
        const rightD: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        const rightArrow: Input.Keyboard.Key = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        if (this.firstRightPress && (rightD?.isDown || rightArrow.isDown)) {
            Player.Instance.moveRight();
            this.firstRightPress = false;
        }
        else if (!(rightD?.isDown || rightArrow.isDown)) {
            this.firstRightPress = true;
        }
    }
}
