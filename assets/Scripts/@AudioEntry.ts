import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioEntry')
export class AudioEntry extends Component {
    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];

    @property({
        type: AudioSource
    })
    private audioSource: AudioSource;


    public onAudioQueue(index: number): void {
        let clip: AudioClip = this.clips[index]
        this.audioSource.playOneShot(clip);
    }
    public soundTrack(num: number): void {
        this.audioSource.volume = num;
    }
}

