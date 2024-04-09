import { _decorator, CircleCollider2D, Collider2D, Color, color, Component, Contact2DType, EventTouch, IPhysics2DContact, Node, RigidBody2D, Sprite } from 'cc';
import gameMgr from './Com/GameManger';
import eventMgr from './until/EventManager';
import { LocalEventType } from './Com/ConstData';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(RigidBody2D)
    body:RigidBody2D = null;
    protected onLoad(): void {
        let collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        gameMgr.playerCount++;
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(Node.EventType.TOUCH_START,this.onTouchEnd,this);
    }

    public  onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.off(Node.EventType.TOUCH_START,this.onTouchEnd,this);
    }

    public onTouchEnd(event:EventTouch){
        if (!this.body.enabled) {
            this.body.enabled = true;
            eventMgr.sendEvent(LocalEventType.checkGameStart);
        }
    }



    onBeginContact (selfCollider: CircleCollider2D, otherCollider: CircleCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 1) {
            console.log("死亡----------");
            this.node.getComponent(Sprite).color = Color.BLACK;
            gameMgr.bWin = false;
        }
        // 只在两个碰撞体开始接触时被调用一次
    }
    onEndContact (selfCollider: CircleCollider2D, otherCollider: CircleCollider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
    }
}

