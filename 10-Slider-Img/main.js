var imgWidth = 300;
var wrapper = document.getElementsByClassName("slider-wrapper")[0];
var ul = document.getElementsByClassName("slider-ul")[0];
var leftBtn = document.getElementsByClassName("slider-left")[0];
var rightBtn = document.getElementsByClassName("slider-right")[0];
var sliderDiv = document.getElementsByClassName("slider-dots-div")[0];
var sliderDotsList = Array.prototype.slice.call(document.getElementsByClassName("slider-dot-span"), 0);

var leftBtnSwitch = true;
var rightBtnSwitch = true;


//getStyle(elem, "prop")获取任意元素的任意样式
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}


// 点击下一张
rightBtn.addEventListener("click", function () {
    if (rightBtnSwitch) {
        clearInterval(ul.aotuMoveTimer)
        rightBtnSwitch = false;
        leftBtnSwitch = false;
        moveStep(ul, "->", imgWidth)
        aotuMove(ul, "->")
    }
})


// 点击上一张
leftBtn.addEventListener("click", function () {
    if (leftBtnSwitch) {
        clearInterval(ul.aotuMoveTimer)
        rightBtnSwitch = false;
        leftBtnSwitch = false;
        moveStep(ul, "<-", imgWidth)
        aotuMove(ul, "->")
    }
})


// 移动一张图片(包括顶端判定处理)
function moveStep(ele, direction, imgWidth) {
    clearInterval(ele.moveStepTimer);
    var v;
    var target;
    imgSum = ele.offsetWidth / imgWidth - 1;
    if (direction == "->") {
        target = parseInt(getStyle(ele, "left")) - imgWidth;
    } else if (direction == "<-") {
        if (parseInt(getStyle(ele, "left")) == 0) {
            ele.style.left = -(imgWidth * imgSum) + "px";
        }
        target = parseInt(getStyle(ele, "left")) + imgWidth;
    }

    ele.moveStepTimer = setInterval(function () {
        v = (target - parseInt(getStyle(ele, "left"))) / 7;
        v = (v > 0) ? Math.ceil(v) : Math.floor(v);
        if (parseInt(getStyle(ele, "left")) === target) {
            rightBtnSwitch = true;
            leftBtnSwitch = true;
            clearInterval(ele.moveStepTimer);
            if (target == -(imgWidth * imgSum) && direction == "->") {
                ele.style.left = "0px";
                console.log("swith")
            }
        } else {
            ele.style.left = parseInt(getStyle(ele, "left")) + v + "px";
        }
    }, 1000 / 120)


}


// 自动轮播 direction == "->" / "<-"
function aotuMove(ele, direction) {
    clearInterval(ele.aotuMoveTimer)
    ele.aotuMoveTimer = setInterval(function () {
        moveStep(ele, direction, imgWidth)
    }, 2000)
    // 图片切换间隔不可过小（1000ms）
}


function changeDotActive() {
    sliderDotsList.forEach(function (item) {
        item.setAttribute("class","slider-dot-span")
    })
    sliderDotsList[i].setAttribute("class","slider-dot-span slider-dot-active")
}


sliderDotsList.forEach(function (item, index) {
    item.addEventListener("click", function () {
        console.log("click slider-dot-span, index: ", index)
    })
})


wrapper.onmouseenter = function () {
    leftBtn.style.display = "block";
    rightBtn.style.display = "block";
    sliderDiv.style.display = "block";
}


wrapper.onmouseleave = function () {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    sliderDiv.style.display = "none";
}


aotuMove(ul, "->")