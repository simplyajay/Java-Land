function createMaleCharacterAnimation(anims)  {

    anims.create({

        key: 'player-idle',
        frameRate: 15,
        frames: anims.generateFrameNames('character', {

            start: 1,
            end: 15,
            prefix: 'idle_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'player-walk',
        frameRate: 15,
        frames: anims.generateFrameNames('character', {

            start: 1,
            end: 15,
            prefix: 'walk_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'player-jump',
        frameRate: 15,
        frames: anims.generateFrameNames('character', {

            start: 3,
            end: 15,
            prefix: 'jump_',
            suffix: '.png'

        }),
        repeat: 0

    });

    anims.create({

        key: 'player-run',
        frameRate: 15,
        frames: anims.generateFrameNames('character', {

            start: 1,
            end: 15,
            prefix: 'run_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'player-death',
        frameRate: 15,
        frames: anims.generateFrameNames('character', {

            start: 1,
            end: 15,
            prefix: 'dead_',
            suffix: '.png'

        }),
        repeat: 0

    });


}

export {

    createMaleCharacterAnimation

}