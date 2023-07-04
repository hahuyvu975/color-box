import { _decorator, Component, Node, input, Input, Sprite, Color, Prefab, Collider2D, Contact2DType, IPhysics2DContact, instantiate, Vec3, math, director, AudioSource, find, random, Animation } from 'cc';

import { Constants } from './Constants';
import { GameParamater } from './GameParamater';
import { AudioGame } from './@AudioGame';
import { ScoreGame } from './ScoreGame';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private square: Node;

    @property({
        type: Prefab
    })
    private prefabEnemy: Prefab;

    @property({
        type: Node
    })
    private nodeEnemies: Node;

    @property({
        type: ScoreGame
    })
    private scoreGame: ScoreGame;

    @property({
        type: AudioGame
    })
    private audioGame: AudioGame;

    @property({
        type: Prefab
    })
    private prefabAnimWhite: Prefab;

    private arrAnim: Node[] = [];

    private arrEnemies: Node[] = [];

    public get ArrEnemies(): Node[] {
        return this.arrEnemies;
    }
    public set ArrEnemies(value: Node[]) {
        this.arrEnemies = value;
    }

    private anim: Animation

    protected onLoad(): void {
        
        this.initialListener();
        this.initPrefab();
    }
    protected start(): void {
        this.anim = this.square.getComponent(Animation)
        const collider = this.square.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact): void {
        const self = selfCollider.node.getComponent(Sprite).color.toString();
        const other = otherCollider.node.getComponent(Sprite).color.toString();
        if (self === other) {
            this.scoreGame.addScore();
            this.anim.play();
            if (localStorage.getItem('volume') === '1') {
                this.audioGame.onAudioQueue(0);
            }
        }
        else {
            this.overGame();
        }
    }

    protected initialListener(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected onTouchStart(): void {
        this.square.getComponent(Sprite).color = Color.BLACK;
    }

    protected onTouchEnd(): void {
        this.square.getComponent(Sprite).color = Color.WHITE;
    }

    protected overGame(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        if (localStorage.getItem('volume') === '1') {
            this.audioGame.onAudioQueue(1);
        }

        let node = find('GameParamater');
        if (node === null) {
            let node = new Node('GameParamater');
            let param = node.addComponent(GameParamater);
            param.IndexScore = this.scoreGame.CurrentScore;
            director.addPersistRootNode(node);
            director.loadScene(Constants.EntryScene);
        }
    }

    private setEnemyColor(enemy: Node, index: number): void {
        const randomColor = Math.random() < 0.5 ? 'white' : 'black';
        const sprite = enemy.getComponent(Sprite);

        if (sprite) {
            sprite.color = randomColor === 'white' ? new Color(255, 255, 255) : new Color(0, 0, 0);
        }

        const nodeAnim = this.arrAnim[index];

        for (let i = 0; i < nodeAnim.children.length; i++) {
            nodeAnim.children[i].getComponent(Sprite).color = randomColor === 'white' ? new Color(255, 255, 255) : new Color(0, 0, 0);
        }

        // nodeAnim.children.map((child) => {
        //     child.getComponent(Sprite).color = randomColor === 'white' ? new Color(255, 255, 255) : new Color(0, 0, 0);
        // })
    }

    public randomPrefab(node: Node, index: number): void {
        const spacingY = 150;
        let randomY = math.randomRangeInt(200, 300);
        let randomX = math.randomRangeInt(180, 100);
        let posX = 0;
        let rotation = 0;
        if (randomY >= 250) {
            posX = math.random() < 0.5 ? -randomX : randomX;
            rotation = posX === randomX ? -10 : 10;
        } else {
            posX = math.random() < 0.5 ? -280 : 280;
            rotation = posX === 280 ? -25 : 25;
        }

        node.setRotationFromEuler(0, 0, rotation);
        node.setPosition(posX, randomY + spacingY);
        this.setEnemyColor(node, index);
    }


    protected initPrefab(): void {
        for (let i = 0; i < 2; i++) {
            const element = instantiate(this.prefabEnemy);
            const anim = instantiate(this.prefabAnimWhite);
            this.arrAnim.push(anim);
            element.getComponent(Collider2D).apply();
            this.nodeEnemies.addChild(element);
            this.nodeEnemies.addChild(anim);
            this.arrEnemies.push(element);
            this.randomPrefab(element, i);
        }
    }

    protected update(): void {
        console.log(this.square.scale)
        for (let i = 0; i < 2; i++) {
            this.arrAnim[i].setPosition(this.arrEnemies[i].position);
            this.arrAnim[i].setRotation(this.arrEnemies[i].rotation);
        }
    }
}

