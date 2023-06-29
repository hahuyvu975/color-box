import { GameController } from './@GameController';
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, Sprite, Color, Collider2D } from 'cc';
import { GameModel } from './@GameModel';
const { ccclass, property } = _decorator;

@ccclass('@EnemyController')
export class EnemyController extends Component {

    @property({
        type: Prefab
    })
    private prefabEnemy: Prefab;

    @property({
        type: Node
    })
    private enemiesNode: Node;

    @property({
        type: GameModel
    })
    private gameModel: GameModel;

    @property({
        type: GameController
    })
    private gameCtrl: GameController;

    private speedEnemy: number = 10;
    private tempPos1: Vec3 = new Vec3();
    private tempPos2: Vec3 = new Vec3();
    private speed: number = 0.4;


    update(deltaTime: number) {

        this.tempPos1 = this.gameCtrl.ArrEnimies[0].position;


        this.gameCtrl.ArrEnimies[0].setPosition(new Vec3(this.tempPos1.x + 10 * this.speed, this.tempPos1.y - 10 * this.speed))
        this.gameCtrl.ArrEnimies[0].getComponent(Collider2D).apply();
      

        this.tempPos2 = this.gameCtrl.ArrEnimies[1].position;
        // this.tempPos2.y -= this.speedEnemy * deltaTime;
       
        this.gameCtrl.ArrEnimies[1].setPosition(new Vec3(this.tempPos2.x - 7 * this.speed, this.tempPos2.y - 12 * this.speed))
        this.gameCtrl.ArrEnimies[1].getComponent(Collider2D).apply();

        if (this.tempPos1.y < -170) {
            this.gameCtrl.randomPrefab(this.gameCtrl.ArrEnimies[0]);

        }

        if (this.tempPos2.y < -200) {
            this.gameCtrl.randomPrefab(this.gameCtrl.ArrEnimies[1]);
        }

    }


}

