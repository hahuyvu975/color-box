import { _decorator, Component, Node, Collider2D, Contact2DType, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Square')
export class Square extends Component {
    
    protected onLoad(): void {
        
    }
    
    protected start(): void {
        const collider = this.node.getComponent(Collider2D);
        if(collider) {
            console.log('213')
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider : Collider2D, otherCollider: Collider2D, contact: PhysicsSystem2D): void {
        console.log('2222')
        if(otherCollider.tag === 1) {
            console.log('contact')
        }
    }

    
}

