import World from './scenes/World'
import Phaser from 'phaser'
import Interface from './scenes/Interface'
import MainMenu from './scenes/MainMenu'

const config = {

	type: Phaser.AUTO,

	backgroundColor: '#ADD8E6',

	scale: {

		mode: Phaser.Scale.RESIZE,
        parent: 'game-parent',
        autoCenter: Phaser.Scale.CENTER_BOTH,
		
    },

	physics: {

		default: 'matter',
		matter: {

			gravity: {

				y: 3,

			},

		}

	},
	
	scene: [MainMenu ,World, Interface]
}

export default new Phaser.Game(config)