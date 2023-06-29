import Phaser from "phaser";
import ContentDialog from "../dialog/ContentDialog";
import { addBronze, addGold, addScore, addSilver, health, isCharacterAlive, killCharacter, setIsCharacterAlive, spawnPointX, spawnPointY, updateHealth} from "../scenes/World";

let showInteractText = false;
function onSignOverlap(scene, character, signsArray, cursors) {

    var characterBounds = character.getBounds();

    let dialog = new ContentDialog();

    for (var i = 0; i < signsArray.length; i++) {

        const sign = signsArray[i];

        const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(characterBounds, sign.getBounds());

        if (isColliding) {

            if(isCharacterAlive){

                showInteractText = true;

            }
            

            if (Phaser.Input.Keyboard.JustDown(cursors.space)) {

                scene.pause();
                dialog.newDialog(scene, sign);

            }

            break;

        } else {

            if(i == signsArray.length -1){

                showInteractText = false;

                dialog.hideDialog();

            }

        }

    }

}

function onDangerZoneOverlap(character, dangerZones){

    var characterBounds = character.getBounds();

    for(var i = 0; i < dangerZones.length; i++){

        const dangerZone = dangerZones[i];

        if(Phaser.Geom.Intersects.RectangleToRectangle(characterBounds, dangerZone.getBounds()) && isCharacterAlive){

            killCharacter(character);

            break;

        }

    }

}

function onCoinOverlap(scene){

    scene.on("collisionstart", function (event, bodyA, bodyB) {

		if (bodyA.gameObject instanceof Phaser.Physics.Matter.Sprite && bodyB.gameObject instanceof Phaser.Physics.Matter.Sprite) {

            var bodies = [bodyA, bodyB];
            var character;

            bodies.forEach(body =>{

                switch(body.gameObject.name){

                    case 'character':{

                        character = body.gameObject;

                        break;

                    }

                }

            });

            //find obstacle or coin
            bodies.forEach(body => {

                switch(body.gameObject.name){

                    case 'bronze-coin':{

                        addScore('bronze', null);
                        addBronze(1);

                        body.gameObject.destroy();

                        break;

                    }                  

                    case 'silver-coin':{

                        addScore('silver', null);
                        addSilver(1);
                        body.gameObject.destroy();

                        break;

                    }

                        

                    case 'gold-coin':{

                        addScore('gold', null);
                        addGold(1);
                        body.gameObject.destroy();

                        break; 

                    }

                    case 'heart':{

                        updateHealth('add', 1);
                        body.gameObject.destroy();

                        break; 

                    }

                    case 'obstacle':{

                        if(isCharacterAlive){

                            killCharacter(character);

                            break;

                        } 

                    }

                        

                }
                
            });

		}

	});

}

export {

    onSignOverlap, onDangerZoneOverlap, onCoinOverlap, showInteractText

}