var timeNum = document.getElementsByClassName("timeNum")[0];
var flagNum = document.getElementsByClassName("flagNum")[0];
var start = document.getElementsByClassName("start")[0];
var game = document.getElementsByClassName("game")[0];
var item = document.getElementsByClassName("item");
var alertCon = document.getElementsByClassName("alertCon")[0];
var msg = document.getElementsByClassName("msg")[0];
var close = document.getElementsByClassName("close")[0];

bindEvent();

//计时器
var c = 0;
var t;
var flag = 20;

//清除items的class、计时器
function clearItemcls () {
    c = 0;
    clearInterval(t);
    flag = 20;
    flagNum.innerHTML = 20;
    for (var i = 0; i < item.length; i++) {
        if (item[i].classList.contains("isLei")) {
            item[i].classList.remove("isLei");
        }
        if (item[i].classList.contains("dianEd")) {
            item[i].classList.remove("dianEd");
        }
        if (item[i].classList.contains("qiEd")) {
            item[i].classList.remove("qiEd");
        }
        if (item[i].classList.contains("showLei")) {
            item[i].classList.remove("showLei");
        }
        item[i].innerHTML = "";
    }
    
}

function jiShi() {
    timeNum.innerHTML = c
    c = c + 1
    t = setTimeout("jiShi()", 1000)
}

//xuanLei选雷[0, 80],不是雷让它变雷，是雷重选
function xuanLei (leishu) {
    for (var i = 0; i < leishu; i++) {
        var suijishu = Math.floor(Math.random() * 81);
        if (!item[suijishu].classList.contains("isLei")) {
            item[suijishu].classList.add("isLei");
        }else {
            i--;
        }
    }
}

//showNum没被点开，没插旗，不是雷，显示数字
function showNum (targetItem) {
    var pos = targetItem.getAttribute("id").split("-");
    var posx = pos[0];
    var posy = pos[1];
    var n = 0;

    for (var i = posx - 1; (i - 1) <= posx; i++) {
        for (var j = posy - 1; (j - 1) <= posy; j++) {
            var near = document.getElementById(i + "-" + j);
            if (near && near.classList.contains("isLei")) {
                n++;
            }
        }
    }
    targetItem && (targetItem.innerHTML = n);
    if (n == 0) {
        for (var i = posx - 1; (i - 1) <= posx; i++) {
            for (var j = posy - 1; (j - 1) <= posy; j++) {
                var near = document.getElementById(i + "-" + j);
                if (near && !near.classList.contains("isLei") && !near.classList.contains("qiEd")) {
                    leftClick(near);
                }
            }
        }
    }
}

//lose
function loseGame () {
    clearInterval(t);
    msg.innerHTML = "扫雷失败"
    setTimeout(function () {
        alertCon.classList.remove("hidden");
    }, 300)
    showLei();
}

//win
function winGame () {
    var endTime = Number.parseFloat(timeNum.innerHTML);
    clearInterval(t);
    msg.innerHTML = `扫雷成功，你用时${endTime}S`
    setTimeout(function () {
        alertCon.classList.remove("hidden");
    }, 300)
    showLei();
}

//显示所有雷
function showLei () {
    var alllei = document.getElementsByClassName("isLei");
    for (var i = 0; i < alllei.length; i++) {
        if (alllei[i].classList.contains("qiEd")) {
            alllei[i].classList.remove("qiEd");
        }
        alllei[i].classList.add("showLei");
    }
}

//左键函数
function leftClick (targetItem) {
    if (!targetItem.classList.contains("dianEd") && !targetItem.classList.contains("qiEd")) {
        if (!targetItem.classList.contains("isLei")) {
            targetItem.classList.add("dianEd");
            showNum(targetItem);
            winOrNot(1);
            //判断，所有的数都显示，剩下全都是雷，win
        }else {
            loseGame();
        }
    }
}

//取消右键
game.oncontextmenu = function () {
    return false;
}

//右键函数
function rightClick (targetItem) {
    if (!targetItem.classList.contains("dianEd")) {
        if (!targetItem.classList.contains("qiEd") && flag > 0) {
            targetItem.classList.add("qiEd");
            flag--;
        }else if (targetItem.classList.contains("qiEd")) {
            targetItem.classList.remove("qiEd");
            flag++;
        }
    }
    flagNum.innerHTML = flag;
}

//1、旗子插完后，判断是否全对，2、点开一个格子，判断是否所有非雷的格子都被点开
function winOrNot (leftorright) {
    var islei = document.getElementsByClassName("isLei");
    if (leftorright == 3) {
        
        var qied = document.getElementsByClassName("qiEd");
        var n = 0;
        for (var i = 0; i < qied.length; i++) {
            if (qied[i].classList.contains("isLei")) {
                n++;
            }
        }
        if (n == 20) {
            winGame();
        }
    }else if (leftorright == 1) {
        console.log("zuojian")
        var dianed = document.getElementsByClassName("dianEd");
        console.log("dianEd " + dianed.length);
        console.log("islei " + islei.length);
        if (dianed.length + islei.length == 81) {
            console.log("win");
            winGame();
        }
    }
}

//事件绑定
function bindEvent() {
    // start-btn
    start.addEventListener("click", function () {
        clearItemcls ();
        game.classList.remove("hidden");
        jiShi();
        xuanLei(20);
    })

    game.addEventListener("mousedown", function (e) {
        targetItem = e.target;
        if (e.which == 1) {
            leftClick(targetItem);
        }else if (e.which == 3) {
            rightClick(targetItem);
            if (flag == 0) {
                winOrNot(3);
            }
        }
    })

    // close-btn
    close.addEventListener("click", function () {
        alertCon.classList.add("hidden");
        game.classList.add("hidden");
        timeNum.innerHTML = 0;
    })
}