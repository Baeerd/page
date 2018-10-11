var color = 'red'; //提示信息颜色
/**
 * 替换全部文本
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if(!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

/**
 * 显示提示信息
 * @param {*} event 
 * @param {*} msg 
 */
function log(event, msg) {
    msg = "=====================<font color='"+color+"'>" + msg + "</font>=====================";
    event.html(msg);
}

/**
 * 显示错误信息
 * @param {*} event 
 * @param {*} msg 
 */
function error(event, msg) {
    var i = 0;
    while(i<15) {
        msg+="&nbsp;";
        i++;
    }
    msg = "=====================<font color='"+color+"'>" + msg + "</font>=====================";
    event.html(msg);
    return true;
}

/**
 * 清除提示信息
 * @param {*} event 
 * @param {*} msg 
 */
function clean(event) {
    if(event.html()) {
        event.html("");
    }
}