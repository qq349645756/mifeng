import { _decorator, Button, Component, Node } from 'cc';
import { MonsterControl } from './MonsterControl';
import eventMgr from './until/EventManager';
import { LocalEventType } from './Com/ConstData';
import gameMgr from './Com/GameManger';
const { ccclass, property } = _decorator;

@ccclass('UIControl')
export class UIControl extends Component {
    @property(MonsterControl)
    monsterControl:MonsterControl= null;
    @property(Button)
    btn_start:Button = null;

    protected onLoad(): void {
        gameMgr.uiControl  = this;
        eventMgr.addEvent(LocalEventType.checkGameStart,this.checkGameStart,this);
        this.init();
    }

    protected onDestroy(): void {
        eventMgr.removeEvent(LocalEventType.checkGameStart,this.checkGameStart,this);
    }

    public checkGameStart(){
        gameMgr.playerCount--;
        if ( gameMgr.playerCount == 0) {
            this.scheduleOnce(this.onCLickStart,3);
        }   
        // this.btn_start.interactable =  gameMgr.playerCount == 0;
            
        
    }

    onCLickStart(){
        this.monsterControl.gameStart();
        this.btn_start.interactable = false;
        this.scheduleOnce(this.gameEnd,8)
    }

    public gameEnd(){
        gameMgr.gameEnd();
    
    }

    public ShowGameEnd(){
        if (gameMgr.bWin) {
            this.node.getChildByName("gameWin").active = true;
        }else{
            this.node.getChildByName("gameLost").active = true;
        }
    }


    public init(){
        this.btn_start.node.active = false;
        this.node.getChildByName("gameWin").active = false;
        this.node.getChildByName("gameLost").active = false;
        
    }
}

