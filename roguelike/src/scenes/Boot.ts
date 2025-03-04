import { Scene } from 'phaser';
import { GameManager } from '../game-manager';

/** 
 * First scene of the game. 
 * A lite preloader for the actual @see Preloader scene if you will.
 *  */
export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor(0x302d2d);
        new GameManager();

        this.scene.launch('LevelRenderer');
        this.scene.start('Game');
        this.scene.launch('GameplayUi');
        this.scene.launch('ScreenBackgroundColor');
    }
}
