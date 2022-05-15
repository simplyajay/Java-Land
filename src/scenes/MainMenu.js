import { createCoinAnimations } from "../animations/CoinsAnimation";
import HowToPlayDialog from "../dialog/HowToPlayDialog";

export default class MainMenu extends Phaser.Scene {

    constructor() {

        super({

            key: 'main-menu'

        })

    }

    preload() {

        this.load.image('background', 'main_menu/bg.png');
        this.load.image('title', 'main_menu/title-new.png');
        this.load.image('play', 'main_menu/play.png');
        this.load.image('how-to-play', 'main_menu/how_to_play.png');

        this.load.atlas('gold-coin-cursor', 'coin_gold/gold.png', 'coin_gold/gold.json')

        this.load.image('gold-cursor', 'coin_gold/Gold_1.png');

        this.load.atlas('gold-coin', 'coin_gold/gold.png', 'coin_gold/gold.json')

    }

    create() {

        "use strict";

        //////////////////////////////////////////

        this.anims.create({

            key: 'gold-coin-anims',
            frameRate: 15,
            frames: this.anims.generateFrameNames('gold-coin', {

                start: 1,
                end: 10,
                prefix: 'Gold_',
                suffix: '.png'

            }),
            repeat: -1

        });

        let background = this.add.image(0, 0, 'background').setOrigin(0);
        let title = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setScale(0.85);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, 'play').setScale(0.85);
        let howToPlayButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65, 'how-to-play').setScale(0.85);

        let goldCursor = this.add.sprite(playButton.x - playButton.width * 0.6, playButton.y, 'gold-cursor').setScale(0.05).setVisible(false);
        goldCursor.play('gold-coin-anims')

        playButton.setInteractive();
        howToPlayButton.setInteractive();

        playButton.on('pointerover', () => {

            playButton.setScale(1);
            goldCursor.setPosition(playButton.x - playButton.width * 0.7, playButton.y);
            goldCursor.setVisible(true);

        });

        playButton.on('pointerout', () => {

            playButton.setScale(0.9);
            goldCursor.setVisible(false);

        });

        playButton.on('pointerdown', () => {

            this.scene.start('main-scene')

        });

        howToPlayButton.on('pointerover', () => {

            howToPlayButton.setScale(1);
            goldCursor.setPosition(howToPlayButton.x - howToPlayButton.width * 0.6, howToPlayButton.y);
            goldCursor.setVisible(true);

        });

        howToPlayButton.on('pointerout', () => {

            howToPlayButton.setScale(0.9);
            goldCursor.setVisible(false);

        });

        howToPlayButton.on('pointerdown', () => {

            howToPlayButton.setScale(0.9);
            goldCursor.setVisible(false);

            var dialog = new HowToPlayDialog();
            dialog.showDialog(this.scene);

        });

    }

}