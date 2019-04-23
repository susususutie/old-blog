var oDiv = document.getElementsByClassName("oDiv")[0];
var oBtn = document.getElementsByClassName("oBtn")[0];
var timer = null;

oBtn.onclick = function() {
    move(oDiv)
}

function move(ele) {
    clearInterval(timer);
    var iSpeed;
    timer = setInterval(function() {
        iSpeed = (300 - ele.offsetLeft) / 7;
        iSpeed = (iSpeed > 0) ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(ele.offsetLeft === 300) {
            clearInterval(timer);
        }else {
            ele.style.left = ele.offsetLeft + iSpeed + "px";
        }
    }, 10)
}
