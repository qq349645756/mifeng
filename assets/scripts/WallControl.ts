import { _decorator, BoxCollider2D, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WallControl')
export class WallControl extends Component {
    protected onLoad(): void {
        let coll = this.node.getComponent(BoxCollider2D);
        coll.size = this.node.getComponent(UITransform).contentSize;
        this.node.getComponent(Sprite).enabled = false;
    }
}

