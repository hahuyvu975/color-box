import { Constants } from './Constants';
import { GameParamater } from './GameParamater';
import { AudioGame } from './@AudioGame';
import { _decorator, Component, Node, input, Input, Sprite, Color, Prefab, Collider2D, Contact2DType, IPhysics2DContact, instantiate, Vec3, math, director, AudioSource, find, random } from 'cc';
import { GameModel } from './@GameModel';
import { ScoreGame } from './ScoreGame';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private square: Node;

    @property({
        type: GameModel
    })
    private gameModel: GameModel;

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

    private arrEnimies: Node[] = [];

    public get ArrEnimies(): Node[] {
        return this.arrEnimies;
    }
    public set ArrEnimies(value: Node[]) {
        this.arrEnimies = value;
    }

    private position1: Vec3 = new Vec3();

    private randomY: number;

    protected onLoad(): void {
        this.initialListener();
        this.initPrefab();
    }
    protected start(): void {
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
            if (localStorage.getItem('volume') === '1') {
                this.audioGame.onAudioQueue(0);
            }
        }
        else {
            // this.overGame();
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

    protected initPrefab(): void {  
            let element1 = instantiate(this.prefabEnemy);
            let element2 = instantiate(this.prefabEnemy);
            element1.getComponent(Collider2D).apply();
            element2.getComponent(Collider2D).apply();
            this.nodeEnemies.addChild(element1);
            this.nodeEnemies.addChild(element2);
            this.arrEnimies.push(element1);
            this.arrEnimies.push(element2);
            this.randomPrefab1(element1);
            this.randomPrefab2(element2); 
    }

    public randomPrefab1(node: Node): void {
        this.randomY = math.randomRangeInt(150, 215);
        this.position1 = new Vec3(this.randomPosX(), this.randomY);
        node.setPosition(this.position1);
        this.randomColor(node);
    }

    public randomPrefab2(node: Node): void {
        const spacingY = 150;
        node.setPosition(this.randomPosX(), this.randomY + spacingY);
        this.randomColor(node);
    }
    
    private randomPosX(): number {
         return Math.random() < 0.5 ? 265 : -265;
    }

    protected randomColor(node: Node): void {
        const randomColor = Math.random() < 0.5 ? 'white' : 'black';
        let sprite = node.getComponent(Sprite);

        if (sprite) {
            if (randomColor === 'white') {
                // console.log('1 enemy white')
                sprite.color = new Color(255, 255, 255);
            } else {
                // console.log('enemy black')
                sprite.color = new Color(0, 0, 0);
            }
        }
    }
}

