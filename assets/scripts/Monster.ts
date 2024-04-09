import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Component {
    static pools:Monster[] = [];
    static get(Prefab: Prefab) {
        let monster = this.pools.pop();
        if (!monster) {
            monster = instantiate(Prefab).getComponent(Monster);
        }
        return monster;
    }

    static put( monster: Monster) {
        //压入缓存池管理节点
        this.pools.push(monster);
        monster.node.parent = null;
        //移除node不回收body
       
    }

    protected update(dt: number): void {
        if (this.node.position.y<= -800) {
            Monster.put(this);
        }
    }
    
}

