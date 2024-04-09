import { Color } from "cc";
export class GameUntil {
    public getRandom(min, max) {
        switch (min) {
            case 0: return Math.round(Math.random() * max);
            case 1: return Math.ceil(Math.random() * max);
            default: return Math.round(Math.random() * (max - min) + min);
        }
    }

    public hexToRgb(val: string){
        let sColor = val.toLowerCase()
        //十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#"
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            //处理六位的颜色值
            let sColorChange: number[] = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            return new Color(sColorChange[0],sColorChange[1],sColorChange[2] )
            // return "rgb(" + sColorChange.join(",") + ")"
        }
        return  new Color(255,255,255);
    }

    /**数组去重 */
    unique(arr: any[]): any[] {
        return Array.from(new Set(arr));
    }

    

    /**时间戳转换分钟 */
    timeToMin(times) {
        var hours = Math.floor(times / (3600 * 1000));
        //计算相差分钟数
        var leave2 = times % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        // //console.log(days + "天 " + hours + "小时 ")
        // //console.log(days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");
        // return   days + "天 " + hours + "小时 "
        let strh = hours.toString();
        if (strh.length == 1) {
            strh = "0"+strh;
        }
        let strm = minutes.toString();
        if (strm.length == 1) {
            strm = "0"+strm;
        }
        let strs = seconds.toString();
        if (strs.length == 1) {
            strs = "0"+strs;
        }
    //    return strh+":"+strm+":"+strs;
       return strm+":"+strs;
    }

    /**打乱数组 */
    shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


   
  
    /**随机概率 */
    public randomProbability(arrs:number[]){
        let maxquan = 0;
        for (let i = 0; i < arrs.length; i++) {
            maxquan+=arrs[i];
        }
        const randomWeight = Math.random() * maxquan;
        let cumulativeWeight = 0;

        for (let i = 0; i < arrs.length; i++) {
            cumulativeWeight += arrs[i];
            if (randomWeight <= cumulativeWeight) {
                return i
            }
        }
    }

    public stringLine(str: string, length: number) {
        let line = [];
        let lines = ""
        let sizeSum = 0
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            // console.log("uncod", c);
            // console.log("字符", str[i]);
            lines += str[i];
            let size = 0;
            if (c < 48) {
                size = 0.29;
            }else if (c < 97) {
                size = 0.66;
            } else if (c < 10000) {
                size = 0.46;
            } else {
                size = 1;
            }
            sizeSum+=size;
            if (i==str.length-1) {
                line.push(lines);
                break;
            }
            if (sizeSum>=length) {
                line.push(lines);
                lines= "";
                sizeSum = 0;
            }
        
        }
        let strs = "";
        for (let i = 0; i < line.length; i++) {
            if (i!=line.length-1) {
                strs+=line[i]+"\n";
            }else{
                strs+=line[i]
            } 
        }
        return strs;
    }
    
}

let Until = window["Common"] = new GameUntil();
export default Until;



