import { _decorator, Component, Node, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({
        type: CCBoolean
    })
    private contactWhite: boolean;
    public get ContactWhite(): boolean {
        return this.contactWhite;
    }
    public set ContactWhite(value: boolean) {
        this.contactWhite = value;
    }


    
}

