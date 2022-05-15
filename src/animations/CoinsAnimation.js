function createCoinAnimations(anims){

    anims.create({

        key: 'bronze-coin-anims',
        frameRate: 15,
        frames: anims.generateFrameNames('bronze-coin', {

            start: 1,
            end: 10,
            prefix: 'Bronze_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'silver-coin-anims',
        frameRate: 15,
        frames: anims.generateFrameNames('silver-coin', {

            start: 1,
            end: 10,
            prefix: 'Silver_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'gold-coin-anims',
        frameRate: 15,
        frames: anims.generateFrameNames('gold-coin', {

            start: 1,
            end: 10,
            prefix: 'Gold_',
            suffix: '.png'

        }),
        repeat: -1

    });

    anims.create({

        key: 'heart-anims',
        frameRate: 15,
        frames: anims.generateFrameNames('heart', {

            start: 1,
            end: 10,
            prefix: 'heart_',
            suffix: '.png'

        }),
        repeat: -1

    });

}

export{

    createCoinAnimations

}