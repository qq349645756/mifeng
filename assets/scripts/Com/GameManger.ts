import { PlayerControl } from "../PlayerControl";
import { UIControl } from "../UIControl";

export class GameManger {
    public playerCount:number = 0;
    public bWin:boolean = true;
    public uiControl:UIControl = null;
    public playerControl:PlayerControl = null;
    public init(){
        this.playerCount = 0;
        this.bWin = true;
    }

    public gameEnd(){
        if (this.bWin) {
            console.log("游戏胜利下一关")
        }else{
            console.log("游戏失败---");
        }
        this.uiControl.ShowGameEnd();
    }


}
let gameMgr = window["Common"] = new GameManger();
export default gameMgr;

