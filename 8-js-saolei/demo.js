//点击start显示game区域（去除hidden），随机给item添加lei，开始计时

//左键 -- 有旗   --- 无反应
//     -- 有lei  --- 败
//     -- 没有lei -- 显示周围雷数 -- 数字
//                                                            -- 0 递归查看直到不为0
//右键 -- 有旗 ---- 取消旗
//     -- 没有旗 -- 插旗 ---所有旗都对 -- 胜
//     -- 数字或0 - 无反应

var timeNum = document.getElementsByClassName("timeNum")[0];
var start = document.getElementsByClassName("start")[0];
var game = document.getElementsByClassName("game")[0];
var alertCon = document.getElementsByClassName("alertCon")[0];
var close = document.getElementsByClassName("close")[0];

var item = document.getElementsByClassName("item");

var flag;
var minMap = new Array(81);
var numMap = new Array(81);

function csh () {
    for (var i = 0; i < 81; i++) {
        minMap[i] = 0;
        numMap[i] = 0;
    }
    flag = 20;
    flagNum.innerHTML = flag;
    var quqi = document.getElementsByClassName("qied");
    var qul = quqi.length;
    for (var i = 0; i < qul; i++) {
        quqi[i].classList.remove("qied");
    }
    var cheIte = document.getElementsByClassName("checked");
    var chl = cheIte.length;
    for (var i = 0; i < chl; i++) {
        cheIte[i].classList.remove("checked");
    }
    
}

var key = true;

allEvent ();
function allEvent () {
    // csh();
    start.addEventListener("click", function () {
        csh();
        if (key) {
            console.log(timeNum + "开始计时，" + "初始化")
            game.classList.remove("hidden")
            
            lei();
            key = false;
        }
        
    })

    //取消右键
    game.oncontextmenu = function () {
        return false;
    }

    //事件委托找到被点击的小方格,调用对应左键和右键函数
    game.addEventListener("mousedown", function (e) {
        console.log(e)
        targetItem = e.target;
        console.log("targetItem"+targetItem)
        // var itemNumber = Array.prototype.indexOf.call(item, targetItem);
        var itemNumber = [].indexOf.call(item, targetItem);
        if (e.which == 1 && !item[itemNumber].classList.contains("qied")) {
            leftClick(itemNumber);
        }else if (e.which == 3 && flag > 0) {
            rightClick(itemNumber);
        }
    })

    close.addEventListener("click", function () {
        key = true;
        for (var i = 0; i < 81; i++) {
            item[i].innerHTML = "";
            if (minMap[i] == 1) {
                item[i].classList.remove("isLei");
            }
        }
        alertCon.classList.add("hidden");
        game.classList.add("hidden");
        
    })
}


//随机确定雷的位置
function lei() {
    for (i = 0; i < flag; i++) {
        var n = Math.floor(Math.random() * 81);
        if (minMap[n] == 0) {
            item[n].classList.add("isLei");
            minMap[n] = 1;
        }else {
            i--;
        }
    }
    for (n = 0; n < 81; n++) {
        if (minMap[n] == 0) {
            switch (n) {
                case 9:
                case 18:
                case 27:
                case 36:
                case 45:
                case 54:
                case 63:
                numMap[n] = num(minMap[n-9]) + num(minMap[n-8]) + num(minMap[n+1]) + num(minMap[n+9]) + num(minMap[n+10]);
                break;
                case 17:
                case 26:
                case 35:
                case 44:
                case 53:
                case 62:
                case 71:
                numMap[n] = num(minMap[n-10]) + num(minMap[n-9]) + num(minMap[n-1]) + num(minMap[n+8]) + num(minMap[n+9]);
                break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                numMap[n] =num(minMap[n-1]) + num(minMap[n+1]) + num(minMap[n+8]) + num(minMap[n+9]) + num(minMap[n+10]);
                break;
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                numMap[n] = num(minMap[n-10]) + num(minMap[n-9]) + num(minMap[n-8]) + num(minMap[n-1]) + num(minMap[n+1]);
                break;
                case 0:
                numMap[n] = num(minMap[1]) + num(minMap[9]) + num(minMap[10]);
                break;
                case 8:
                numMap[n] = num(minMap[7]) + num(minMap[16]) + num(minMap[17]);
                break;
                case 72:
                numMap[n] = num(minMap[63]) + num(minMap[64]) + num(minMap[73]);
                break;
                case 80:
                numMap[n] = num(minMap[70]) + num(minMap[71]) + num(minMap[79]);
                break;
                default:
                numMap[n] = num(minMap[n-10]) + num(minMap[n-9]) + num(minMap[n-8]) + num(minMap[n-1]) + num(minMap[n+1]) + num(minMap[n+8]) + num(minMap[n+9]) + num(minMap[n+10]);
            }
        }
    }
}

//num()
function num(a) {
    var value = Number(a);
    if (Number.isNaN(value)) {
        value = 0;
    }
    return value;
}

//
function leftClick(itemNumber) {

    item[itemNumber].classList.add("checked");
    var pos = item[itemNumber].getAttribute("id").split("-");
    var x = pos[0];
    var y = pos[1];
    //没雷
    if (minMap[itemNumber] == 0) {
        item[itemNumber].innerHTML = numMap[itemNumber];
        //判断周边
        if (numMap[itemNumber] == 0) {
            for (var i = x - 1; i <= x + 1; i++) {
                for (var j = y - 1; j <= y + 1; j++) {
                    var near = document.getElementById(i + "-" + j);
                    if (near) {
                        var nearNum = Array.prototype.indexOf.call(item, near);
                        if (minMap[nearNum] == 0 && !near.classList.contains("checked")) {
                            leftClick(nearNum);
                        }
                    }
                }
            }
            
            
        }
    } else {
        for (var i = 0; i < 81; i++) {
            if (item[i].classList.contains("qied")) {
                item[i].classList.remove("qied");
            }
            if (minMap[i] == 0) {
                item[i].innerHTML = numMap[i];
            } else {
                item[i].innerHTML = "💥";
            }
        }
        setTimeout(function () {
            alertCon.classList.remove("hidden");
        }, 555)
    }
}

//右键函数
function rightClick (itemNumber) {
    if (!item[itemNumber].classList.contains("qied")) {
        if (!item[itemNumber].classList.contains("checked")) {
            item[itemNumber].classList.add("qied");
            flag--;
            flagNum.innerHTML = flag;
        }
        
        if (flag == 0) {
            var qizi = document.getElementsByClassName("qied");
            var n = 0;
            for (var i = 0; i < 20; i++) {
                if (qizi[i].classList.contains("isLei")) {
                    n++;
                }
            }
            if (n == 20) {
                console.log("sheng");
            }
        }
        
    }else {
        item[itemNumber].classList.remove("qied")
        flag++;
        flagNum.innerHTML = flag;
    }
    
}