import Phaser from "phaser";
import { isDeathAnimationFinished } from "../scenes/World";

function rotatePlayerPhysicsShape(character, shapeLeft, shapeRight) {
    
    character.on('animationupdate', function() {

        const sx = character.x;
        const sy = character.y;
        const sav = character.body.angularVelocity;
        const sv = character.body.velocity;

        let nextFrameID = character.anims.currentFrame.textureFrame.slice(0, character.anims.currentFrame.textureFrame.indexOf('.'))
        let nextShape;

        if (character.isFacingLeft()) {

            nextShape = shapeLeft[nextFrameID];
            character.setBody(nextShape, { shape: shapeLeft[nextFrameID] });

        } else if (character.isFacingRight()) {

            nextShape = shapeRight[nextFrameID];
            character.setBody(nextShape, { shape: shapeRight[nextFrameID] });

        }

        character.setPosition(sx, sy);
        character.setVelocity(sv.x, sv.y);
        character.setAngularVelocity(sav);
        character.setFixedRotation();

    })

}

export{

    rotatePlayerPhysicsShape

}