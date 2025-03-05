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
        this.youSeeText = this.add.text(width * 0.5, height * 0.03, '', {
            fontSize: 36, color: '#ffffff', align: 'center'
        })
            .setOrigin(0.5);

        const outlines: GameObjects.Text = this.add.text(0, 0,
`*---Character---*                  *--Inventory--*
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               *-------Log--------*             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
|               |                  |             |
*---------------*------------------*-------------*`, {
            color: '#aaaaaa', fontSize: 53
        })
        // this.add.circle(width * 0.5, height * 0.55, 10, 0xffffff, 1)
    }

    /** Updates description text that is shown when user hovers a symbol. */
    public updateYouSeeText(text: string): void {
        this.youSeeText.text = text;
        if (text.length === 0) {
            this.youSeeText.text = '';
        }
    }
}