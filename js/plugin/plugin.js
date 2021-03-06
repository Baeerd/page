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
 * @param {*} msg 
 */
function log(msg) {
    toastr.info(msg);
}

/**
 * alert弹窗
 * @param {*} msg 
 */
function alert(msg) {
    bootbox.alert(msg, function() {
        console.log(msg + " callback");
    });
}

/**
 * confirm确认框
 * @param {*} msg 
 * @param {*} callback 
 */
function confirm(msg, callback) {
    bootbox.confirm(msg, function(result) {
        console.log("Confirm result: "+result);
        if(callback) {
            callback(result);
        }
   });
}

/**
 * 显示错误信息
 * @param {*} msg 
 */
function error(msg) {
    toastr.error(msg);
}

/**
 * 显示成功信息
 * @param {*} msg 
 */
function success(msg) {
    toastr.success(msg);
}

/**
 * 显示警告信息
 * @param {*} msg 
 */
function warning(msg) {
    toastr.warning(msg);
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