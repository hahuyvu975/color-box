import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, Sprite, Color, Collider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({
        type: Prefab
    })
    private prefabEnemy: Prefab;

    @property({
        type: Node
    })
    private enemiesNode: Node;

    private arrPrefab: Node[] = [];
    private speedEnemy: number = 300;
    private tempPrefab: Vec3 = new Vec3();

    protected onLoad(): void {
        this.initPrefab();
    }

    protected initPrefab(): void {
        for (let i = 0; i < 3; i++) {
            let element = instantiate(this.prefabEnemy);
            this.enemiesNode.addChild(element);
            this.arrPrefab.push(element);
            this.randomPrefab();
        } 
    }

    protected randomPrefab(): void {
        for (let i = 0; i < this.arrPrefab.length; i++) {
            const numX = math.randomRange(-150, 150);
            const numY = math.randomRange(50, 100);
            let node = this.arrPrefab[i];
            node.position = new Vec3(numX, numY);
            // node.getComponent(Collider2D).apply();
            this.arrPrefab[i].setPosition(node.position);
            this.randomColor(node);
        }
    }

    protected randomColor(node: Node): void {
        const randomColor = Math.random() < 0.5 ? 'white' : 'black';
        let sprite = node.getComponent(Sprite);

        if (sprite) {
            if (randomColor === 'white') {
                sprite.color = new Color(255, 255, 255);
            } else {
                sprite.color = new Color(0, 0, 0);
            }
        }
    }

    update(deltaTime: number) {
        for (let i = 0; i < this.arrPrefab.length; i++) {
            let element = this.arrPrefab[i];
            this.tempPrefab = element.position;
            this.tempPrefab.y -= this.speedEnemy * deltaTime;
            element.getComponent(Collider2D).apply();
            this.arrPrefab[i].setPosition(this.tempPrefab.x, this.tempPrefab.y)
            if(this.tempPrefab.y < -550) {
                this.randomPrefab();
            }
        }
    }
}

