import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Square')
export class Square extends Component {

    private position: Vec3 = new Vec3();
   
    protected start(): void {
        this.setPosSquare();
    }

    protected setPosSquare(): void {
        this.position = new Vec3(0,-150);
        this.node.setPosition(this.position);
    }

  
}

