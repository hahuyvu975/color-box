import { Constants } from './Constants';
import { GameParamater } from './GameParamater';
import { AudioEntry } from './@AudioEntry';
import { _decorator, Component, Node, Label, find, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {

    @property({
        type: Label
    })
    private labelBestScore: Label;

    @property({
        type: Label
    })
    private labelScore: Label;
    
    @property({
        type: Node
    })
    private btnTurnOn: Node;

    @property({
        type: Node
    })
    private btnTurnOff: Node;

    @property({
        type: AudioEntry
    })
    private audioEntry: AudioEntry;

    private onClicked: boolean = false;
    private bestScore: number;
    private currentScore: number;
    

    protected onLoad(): void {
        if(!localStorage.getItem('volume')) {        
            localStorage.setItem('volume', '1')
            this.audioEntry.soundTrack(1);
        }
        if (localStorage.getItem('volume') === '1') {
            this.btnTurnOn.active = true;
            this.btnTurnOff.active = false;
            this.audioEntry.soundTrack(1);
        } else {
            this.btnTurnOn.active = false;
            this.btnTurnOff.active = true;
            this.audioEntry.soundTrack(0);
        }

        let node = find('GameParamater')
        if(node) {
            this.currentScore = node.getComponent(GameParamater).IndexScore;
            node.destroy();
        }else{
            this.currentScore = 0;
        }

    }

    protected start(): void {
        this.showBestScore();
        this.showScore();
    }

    protected showScore(): void {
        this.labelScore.string = `${this.currentScore}`;
    }

    protected showBestScore(): void {
        this.bestScore = parseInt(localStorage.getItem('bestScore'));
        this.labelBestScore.string = `${this.bestScore}`
    }

    protected onClickPlay(): void {
        if(localStorage.getItem('volume') === '1') {
            this.audioEntry.onAudioQueue(0);
        }
        director.loadScene(Constants.GameScene)
    }

    protected onClickSound(): void {
        if(!this.onClicked) {
            // if(localStorage.getItem('volume') === '1') {
            //     this.audioEntry.onAudioQueue(0);
            // }
            localStorage.setItem('volume', '0');
            this.audioEntry.soundTrack(0);
            this.btnTurnOn.active = false;
            this.btnTurnOff.active = true;
            this.onClicked = true;
        } else {
            localStorage.setItem('volume', '1');
            this.audioEntry.soundTrack(1);
            this.btnTurnOn.active = true;
            this.btnTurnOff.active = false;
            this.onClicked = false;
        }
    }
}

