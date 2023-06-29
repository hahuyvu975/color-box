import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioGame')
export class AudioGame extends Component {
    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    @property({
        type: AudioSource
    })
    private audioSource: AudioSource = null;

    public onAudioQueue(index: number): void {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }
}

