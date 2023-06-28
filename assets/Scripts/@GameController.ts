import { _decorator, Component, Node, input, Input, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private square: Node;
    private switchColor: boolean = false;

    protected onLoad(): void {
        this.initialListener();
    }
    start() {

    }

    protected initialListener(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    
    protected onTouchStart(): void {
        this.switchColor = true;
        this.square.getComponent(Sprite).color = Color.BLACK;
    }
    
    protected onTouchEnd(): void {
        this.switchColor = false;
        this.square.getComponent(Sprite).color = Color.WHITE;
    }

    protected overGame(): void {
        
    }
    

    update(deltaTime: number) {
        
    }
}

