import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameParamater')
export class GameParamater extends Component {
    private indexScore: number;
    public get IndexScore(): number {
        return this.indexScore;
    }
    public set IndexScore(value: number) {
        this.indexScore = value;
    }
}

