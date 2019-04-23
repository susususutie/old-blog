var oDiv = document.getElementsByClassName("oDiv")[0];
var oBtn = document.getElementsByClassName("oBtn")[0];
var timer = null;


oBtn.onclick = function() {
    move(oDiv)
}

function move(ele) {
    clearInterval(timer);
    var iSpeed;

    if(ele.offsetLeft > 300) {
        iSpeed = -1;
    }else {
        iSpeed = 1;
    }
    
    timer = setInterval(function() {
        if (Math.abs(300 - ele.offsetLeft) < Math.abs(iSpeed) ) {
            ele.style.left = "300px";
            clearInterval(timer)
        }else {
            ele.style.left = ele.offsetLeft + iSpeed + "px";
        }
    }, 10)
}
