import { _decorator, Component, Node, Prefab, UITransform } from 'cc';
import { Monster } from './Monster';
import Until from './until/GameUnitl';
const { ccclass, property } = _decorator;

@ccclass('MonsterControl')
export class MonsterControl extends Component {
    @property(Prefab)
    monster:Prefab = null;


    public gameStart(){
        this.schedule(this.createMonster,0.01,100)
    }

    public createMonster(){
        let monster = Monster.get(this.monster);
        let range = this.node.getComponent(UITransform).contentSize.width;
        let x = Until.getRandom(0,range);
        x =  range/2 -x;
        let y = Until.getRandom(700,800)
        monster.node.setPosition(x,y);
        this.node.addChild(monster.node);
    }

}

