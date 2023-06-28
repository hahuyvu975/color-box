import { _decorator, Component, Node, input, Input, Sprite, Color, Prefab } from 'cc';
import { GameModel } from './@GameModel';
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

    private switchColor: boolean = false;
    

    protected onLoad(): void {
        this.initialListener();
    }
    protected start(): void {

    }

    protected initialListener(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    
    protected onTouchStart(): void {
        console.log('black')
        this.gameModel.ContactWhite = false;
        this.switchColor = true;
        this.square.getComponent(Sprite).color = Color.BLACK;
    }
    
    protected onTouchEnd(): void {
        console.log('white')
        this.gameModel.ContactWhite = true;
        this.switchColor = false;
        this.square.getComponent(Sprite).color = Color.WHITE;
    }

    protected overGame(): void {

    }
    

    update(deltaTime: number) {
        
    }
}

