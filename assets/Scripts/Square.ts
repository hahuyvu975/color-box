import { _decorator, Component, Node, Collider2D, Contact2DType, PhysicsSystem2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Square')
export class Square extends Component {
    
    protected onLoad(): void {
        
    }

    protected start(): void {
        const collider = this.node.getComponent(Collider2D);
        if(collider) {
            console.log('1');
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact ): void {
        console.log('contact')
        if(otherCollider.tag === 1) {
        }
    }

    
}

