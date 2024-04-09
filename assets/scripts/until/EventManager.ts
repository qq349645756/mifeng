export class EventMananger {
    /**事件列表*/
    private eventList = {};
    // private static Instance:EventMananger = null;


    // public static getInstance():EventMananger{
    //     if (this.Instance == null) {
    //         this.Instance = new EventMananger();
    //     }
    //     return this.Instance;
    // }


    /**
     * 发送事件
     * @type 事件类型
     * @args 携带数据
     */
    public sendEvent(type:any,...args:any[]){
        var arr:Array<any> = this.eventList[type];
        if(arr != null){
            var len = arr.length;
            var listen:Function;
            var thisObject:any;
            for(var i=0;i<len;i++){
                var msg = arr[i];
                listen = msg[0];
                thisObject = msg[1];
                listen.apply(thisObject, args);
            }
        }
    }
    /**
     * 监听事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    public addEvent(type:any, listener:Function, thisObject:any){
        var arr:Array<any> = this.eventList[type];
        if(arr == null){
            arr = [];
            this.eventList[type] = arr;
        }else{
            var len = arr.length;
            for(var i=0;i<len;i++){
                if(arr[i][0] == listener && arr[i][1] == thisObject){
                    return;
                }
            }
        }
        arr.push([listener, thisObject]);
    }

    /**
     * 移除事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    public removeEvent(type:any ,listener, thisObject:any){
        var arr:Array<any> = this.eventList[type];
        if(arr != null){
            var len = arr.length;
            for(var i = len-1; i>=0;i--){
                if(arr[i][0] == listener && arr[i][1] == thisObject){
                    arr.splice(i,1);
                }
            }
        }
        if(arr && arr.length == 0){
            this.eventList[type] = null;
            delete this.eventList[type];
        }
    }

}


let eventMgr = window["Common"] = new EventMananger();
export default eventMgr;

