import { _decorator, Component, Node, Vec3, Collider2D, tween, Animation, AnimationClip, Prefab, instantiate } from 'cc';

import { ScoreGame } from './ScoreGame';
import { GameController } from './@GameController';

const { ccclass, property } = _decorator;

@ccclass('@EnemyController')
export class EnemyController extends Component {

    @property({
        type: Node
    })
    private squareNode: Node;

    @property({
        type: GameController
    })
    private gameCtrl: GameController;

    @property({
        type: ScoreGame
    })
    private scoreGame: ScoreGame;

    private shouldTween1: boolean = true;
    private shouldTween2: boolean = true;
    private targetPosition: Vec3 = new Vec3();
    private tweenDuration: number = 3;


    protected update(): void {
        this.targetPosition = this.squareNode.position.clone();

        switch (true) {
            case this.scoreGame.CurrentScore < 10:
                this.tweenDuration = 2.5;
                break;
            case this.scoreGame.CurrentScore < 50:
                this.tweenDuration = 2;
                break;
            case this.scoreGame.CurrentScore < 100:
                this.tweenDuration = 1.6;
                break;
            case this.scoreGame.CurrentScore < 150:
                this.tweenDuration = 1.3;
                break;
            default:

        }

        if (this.shouldTween1) {
            this.shouldTween1 = false;

            tween(this.gameCtrl.ArrEnemies[0])
                .to(this.tweenDuration, { position: this.targetPosition }, {
                    onUpdate: () => {
                        this.gameCtrl.ArrEnemies[0].getComponent(Collider2D).apply();                    // Assign the position of the node to the result calculated by the tween system
                    },
                    onComplete: () => {
                        this.gameCtrl.randomPrefab(this.gameCtrl.ArrEnemies[0], 0);
                        this.shouldTween1 = true;

                        this.startTwween2();
                    }
                })
                .start();
        }
    }
    private startTwween2(): void {
        this.scheduleOnce(() => {
            if (this.shouldTween2) {
                this.shouldTween2 = false;
                tween(this.gameCtrl.ArrEnemies[1])
                    .to(this.tweenDuration, { position: this.targetPosition }, {

                        onUpdate: () => {
                            this.gameCtrl.ArrEnemies[1].getComponent(Collider2D).apply();                    // Assign the position of the node to the result calculated by the tween system
                        },
                        onComplete: () => {
                            this.gameCtrl.randomPrefab(this.gameCtrl.ArrEnemies[1], 1);
                            this.shouldTween2 = true;

                        }
                    })
                    .start();
            }
        }, 0.8)
    }
}
