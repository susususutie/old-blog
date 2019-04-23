var __main = function () {
    //所有事件绑定
    bindEvents()
}

//所有事件绑定
var bindEvents = function () {
    //鼠标事件，点击add输入框显示与隐藏
    bindAddClick()
    // 鼠标事件，添加任务
    bindAddList()
}

//鼠标事件，点击add显示添加输入框，点击完成和删除显示对应效果
var bindAddClick = function () {
    var inputSwitch = document.querySelector(".todo-switch");
    var inputComponent = document.querySelector(".todo-input-component");
    inputSwitch.addEventListener("click", function () {
        //切换类名状态，显示输入框
        classNameSwitch(inputComponent, "hidden")
        classNameSwitch(inputSwitch, "todo-open")
    })

    var todoList = document.querySelector(".todo-list");
    
    todoList.addEventListener("click", function (e) {
        //Update todoitem
        updateItem(e.target);
    })
}

//切换类名状态，有就去掉，没有就加上
var classNameSwitch = function (ele, className) {
    if (ele.classList.contains(className)) {
        ele.classList.remove(className);
    }else {
        ele.classList.add(className);
    }
}

//鼠标事件，点击添加后，获取input的内容，创建一条任务清单
var bindAddList = function () {
    var input = document.querySelector(".todo-input");
    var add = document.querySelector(".todo-add");
    add.addEventListener("click", function () {
        if(!(input.value == "")) {
        //创建一个包含了创建时间、内容等信息的task对象，并存到列表中
        var task = new CreatTask(input.value);
        console.log("刚生成task: ", task);
        suTodoList.push(task);
        //向页面写入task
        writeTodo(task);
        //清空input的内容
        input.value = "";
        }
    })
}

//向页面写入task对象
var writeTodo = function (task) {
    var list = document.querySelector(".todo-list");
    var i = `
    <div class="todo-item">
        <div class="todo-neiRong">任务详情：${task.particular}</div>
        <div class="todo-createdTime">创建于：${task.createdTime.nian}年${task.createdTime.yue}月${task.createdTime.ri}日，星期${task.createdTime.xingqi}，${task.createdTime.shi}时${task.createdTime.fen}分${task.createdTime.miao}秒</div>
        <div class="todo-updaTime">最后一次修改于：${task.updateTime.nian}年${task.updateTime.yue}月${task.updateTime.ri}日，星期${task.updateTime.xingqi}，${task.updateTime.shi}时${task.updateTime.fen}分${task.updateTime.miao}秒</div>
        <button class="todo-btn-wancheng">⭕标记为“已完成”</button>
        <button class="todo-btn-shanchu">❌删除该任务</button>
        <button class="todo-btn-xiugai">❓更改任务</button>
    </div>
    `;
    list.insertAdjacentHTML("afterbegin", i);
}

//创建一个任务对象
var CreatTask = function (particular) {
    var cTime = getTime();
    var o = {
        particular : particular,
        createdTime : cTime,
        updateTime : cTime,
        done : false,
    };
    o.update = function () {
        var c = getTime();
        o.updateTime = c;
    };
    o.doneSwitch = function () {
        if (o.done == false) {
            o.done = true;
        }else if (o.done == true) {
            o.done = false;
        }
    };
    return o;
}

//获取当前事件
var getTime = function () {
    var d = new Date();
    var trueWeek = ["日", "一", "二", "三", "四", "五", "六"];
    var date = {
        nian : d.getFullYear(),
        yue : d.getMonth() + 1,
        ri : d.getDate(),
        xingqi : trueWeek[d.getDay()],
        shi : d.getHours(),
        fen : d.getMinutes(),
        miao : d.getSeconds(),
    };
    return date;
}

//获得索引号
var getOwnIndex = function (child) {
    var parent = child.parentNode;
    var n = parent.childElementCount;
    for (var i = 0; i < n; i++) {
        if (child == parent.children[i]) {
            return i;
        }
    }
}

//update todoitem
var updateItem = function (btn) {
    var todoItem = btn.parentNode;
    //suTodoList中删除对象, divPos是在父元素中的位置，从0开始
    var divPos = getOwnIndex(todoItem);
    //arrPos是元素对应的task对象在数组中的位置
    var arrPos = Math.abs(suTodoList.length - divPos - 1);
    if (btn.classList.contains("todo-btn-wancheng")) {
        //完成函数
        completeBTN(todoItem, arrPos, btn)
    }else if (btn.classList.contains("todo-btn-shanchu")) {
        //Delete函数
        deleteBTN(todoItem, arrPos)
    }else if (btn.classList.contains("todo-btn-xiugai")) {
        //Modify函数
        if (modifyzt == 1) {
            //第一次点击，更改任务
            modifyBTN(todoItem, arrPos, btn);
            modifyzt = 2;
            console.log("更改任务");
        }else {
            //第二次点击，确认更改
            modifyBTN(todoItem, arrPos, btn);
            modifyzt = 1;
            console.log("确认更改")
        }
        
    }
}

//完成函数
var completeBTN = function (todoItem, i, btn) {
    var xiugaiBtn = todoItem.querySelector(".todo-btn-xiugai");
    classNameSwitch(todoItem, "todo-wancheng");
    disabedSwitch(xiugaiBtn);
    innerSwitch(btn, "⭕标记为“已完成”", "✔标记为“未完成”");
    suTodoList[i].doneSwitch();
}

//delete
var deleteBTN = function (todoItem, i) {
    suTodoList.splice(i, 1);

    //从内存中删去
    //待补充

    //从页面删除对象
    todoItem.remove();
}

//modifyBTN更改任务
var modifyBTN = function (todoItem, arrPos, genggaibtn) {
    
    var wanchengBtn = todoItem.querySelector(".todo-btn-wancheng");
    var shanchuBtn = todoItem.querySelector(".todo-btn-shanchu");
    var genggaiBtn = genggaibtn;

    var input = document.querySelector(".todo-input");
    var add = document.querySelector(".todo-add");
    var task = suTodoList[arrPos];

    var neiRong = todoItem.querySelector(".todo-neiRong");
    var updaTime = todoItem.querySelector(".todo-updaTime");
    
    if (modifyzt == 1) {
        //点击更改按钮
        disabedSwitch(wanchengBtn);
        disabedSwitch(shanchuBtn);
        disabedSwitch(add);
        
        innerSwitch(genggaiBtn, "❓更改任务", "确认更改");
        input.value = task.particular;
        console.log("点击更改按钮 : ", task);
    } else if (modifyzt == 2) {
        //提交更改
        disabedSwitch(wanchengBtn);
        disabedSwitch(shanchuBtn);
        disabedSwitch(add);
        task.particular = input.value;
        task.update();

        neiRong.innerHTML = `任务详情：${task.particular}`;
        updaTime.innerHTML = `最后一次修改于：${task.updateTime.nian}年${task.updateTime.yue}月${task.updateTime.ri}日，星期${task.updateTime.xingqi}，${task.updateTime.shi}时${task.updateTime.fen}分${task.updateTime.miao}秒`;

        //清空input的内容
        input.value = "";
        innerSwitch(genggaiBtn, "❓更改任务", "确认更改");
        console.log("提交更改后 : ", task);
    }
    
}

//disabedSwitch 使元素禁用
var disabedSwitch = function (ele) {
    if (ele.disabled == true) {
        ele.disabled = false;
    }else {
        ele.disabled = true;
    }
}

//innerSwitch ele
var innerSwitch = function (ele, sOn, sOff) {
    if (ele.innerHTML == sOn) {
        ele.innerHTML = sOff;
    }else if (ele.innerHTML == sOff) {
        ele.innerHTML = sOn;
    }
}

var suTodoList = [];
var modifyzt = 1;
__main()