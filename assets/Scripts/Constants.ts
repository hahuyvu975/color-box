import { EntryController } from './@EntryController';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constants')
export class Constants extends Component {
    public static readonly EntryScene = 'Entry'
    public static readonly GameScene = 'Game'
}

