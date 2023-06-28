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

    private arrPrefab: Node[] = [];
    private speedEnemy: number = 300;
    private tempPrefab: Vec3 = new Vec3();

    protected onLoad(): void {
        this.initPrefab();
    }

    protected initPrefab(): void {
        for (let i = 0; i < 2; i++) {
            let element = instantiate(this.prefabEnemy);
            element.getComponent(Collider2D).apply()
            this.enemiesNode.addChild(element);
            this.arrPrefab.push(element);
            this.randomPrefab();
        } 
    }

    protected randomPrefab(): void {
        const position1: Vec3 = new Vec3(-50, 180);
        const position2: Vec3 = new Vec3(50, 280);
    
        for (let i = 0; i < this.arrPrefab.length; i++) {
            const node = this.arrPrefab[i];
            node.getComponent(Collider2D).apply()
            this.randomColor(node);
            const position = i === 0 ? position1 : position2;
            node.setPosition(position);
            
        }
    }
    
    protected randomColor(node: Node): void {
        const randomColor = Math.random() < 0.5 ? 'white' : 'black';
        let sprite = node.getComponent(Sprite);

        if (sprite) {
            if (randomColor === 'white') {
                // console.log('1 enemy white')
                this.gameModel.ContactWhite = true;
                sprite.color = new Color(255, 255, 255);
            } else {
                // console.log('enemy black')
                this.gameModel.ContactWhite = false;
                sprite.color = new Color(0, 0, 0);
            }
        }
    }

    update(deltaTime: number) {
        for (let i = 0; i < this.arrPrefab.length; i++) {
            let element = this.arrPrefab[i];
            this.tempPrefab = element.position;
            this.tempPrefab.y -= this.speedEnemy * deltaTime;
            // this.tempPrefab.x += this.speedEnemy * deltaTime * (i % 2 === 0 ? -1 : 1);
            element.setPosition(this.tempPrefab.x, this.tempPrefab.y)
            element.getComponent(Collider2D).apply();
            if(this.tempPrefab.y < -400) {
                this.randomPrefab();
            }
        }
    }
}

