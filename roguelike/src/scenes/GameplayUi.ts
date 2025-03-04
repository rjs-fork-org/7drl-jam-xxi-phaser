import { Game, Scene } from 'phaser';
import { GameManager } from '../game-manager';
import { GameObjects } from 'phaser';

/** 
 * Shows adventure log and other UI elements when playing.
 */
export class GameplayUi extends Scene {
    /** Tells what's under the cursor. */
    private youSeeText: GameObjects.Text;
    public static Instance: GameplayUi;

    constructor() {
        super('GameplayUi');
        GameplayUi.Instance = this;
    }

    /** Create UI. */
    create() {
        const { width, height } = this.scale;

        // Empty at first since nothing is selected.
        this.youSeeText = this.add.text(width * 0.5, height * 0.025, 'Character description.', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5);
    }

    /** Updates description text that is shown when user hovers a symbol. */
    public updateYouSeeText(text: string): void {
        this.youSeeText.text = text;
        if (text.length === 0) {
            this.youSeeText.text = 'Character description.';
        }
    }
}