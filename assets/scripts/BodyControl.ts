import { _decorator, BoxCollider2D, Component, EventTouch, Node, RigidBody2D } from 'cc';
import { LocalEventType } from './Com/ConstData';
import eventMgr from './until/EventManager';
const { ccclass, property } = _decorator;

@ccclass('Rig')
export class BodyControl extends Component {
    @property(RigidBody2D)
    body:RigidBody2D = null;
    resetInEditor(): void {
        this.body = this.node.getComponent(RigidBody2D);
        this.body.awakeOnLoad = true;
        this.body.enabled = false;
    }

    public onLoad(): void {
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

}

