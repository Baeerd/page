$(function() {

    /**
     * 源文本模板输入框监听
     */
    reTextTemplateListener();

    /**
     * 下载文件
     */
    downloadResultText();

    /**
     * 提交后台获取结果字符串
     */
    submitForm();

});

var reCount = 1;
var deCount = 1;

/**
 * 源文本模板输入框监听
 */
function reTextTemplateListener() {

    var lastTxt = "";

    $(".textTemp").keyup(function(event) {
        if(event.keyCode == 13) {
            var inputInfoVal =  $(this).val();
            var resultStr = '';
            console.log(lastTxt);
                console.log(inputInfoVal);
            // 原字符串与新字符串不一样，将不一样的地方替换
            if(lastTxt != inputInfoVal) {
                resultStr = replaceDiff(lastTxt, inputInfoVal, $(this));
                if(!resultStr) {
                    $(this).next().next().html(inputInfoVal);
                    return;
                }
            }
            $(this).val(resultStr);
            printHtml($(this).next(), resultStr);
            // $(this).next().html(resultStr);
        }
    });

    $(".textTemp").change(function() {
        var inputInfoVal =  $(this).val();
        if(!inputInfoVal) {
            reCount = 1;
            deCount = 1;
            lastTxt = '';
            $(this).next().html("设置源文本模板");
            $(this).next().next().html("");
            return;
        }
        lastTxt = getSpanHtml($(this).next().html());
        // lastTxt = getSpanHtml($(this).next());
        $(this).next().html(inputInfoVal);
    }); 
}

/**
 * 将原文本中与目标文本不一致的字符串替换成占位符
 * @param {原文本} reText 
 * @param {目标文本} deText 
 */
function replaceDiff(reText, deText, event) {
    reText = getSpanHtml(reText);
    if(reText === '设置源文本模板') {
        return;
    }
    
    var reLength = reText.length;
    var deLength = deText.length;
    var diffLength = reLength - deLength;

    if(diffLength <= 0) {
        return;
    }
    
    // 获取不同的字符串
    var reTextArr = reText.split('');
    var deTextArr = deText.split('');
    var changeFlag = false;
    for(var i=0; i<reTextArr.length; i++) {
        // 比较字符是否相等
        if(reTextArr[i] != deTextArr[i] && deTextArr[i] != undefined) {
            changeFlag = true;
            break;
        }
    }
    // 如果全部相同没有更改
    if(!changeFlag) {
        alert("模板字符全部相同，重新填写源文本");
        return;
    }
    var diffStr = reText.substr(i, diffLength);//需要替换的字符串
    var id = event.attr("id");
    switch(id) {
        case 'reCount': 
            var countStr = reCount < 10 ? '0'+reCount : reCount;
            reCount++;
        break;
        case 'deCount':
            var countStr = deCount < 10 ? '0'+deCount : deCount;
            deCount++;
        break;
        default:
        break;
    }

    console.log("#"+countStr+"==========>"+diffStr);
    var resultStr = reText.substring(0,i) + '#' + countStr + deText.substring(i);

    return resultStr;
}

/**
 * 获取span的html，自动去掉font渲染标签
 * @param {} event 
 */
function getSpanHtml(str) {
    str = str.replace("<font color='red'>", "").replace("</font>", "");
    str = str.replace('<font color="red">', '').replace('</font>', '');
    return str;
}

/**
 * 输出字符串到元素,渲染占位符
 * @param {*} event 
 */
function printHtml(event, content) {
    if(!content) {
        return;
    }
    var contentArr = content.split("");
    var j = 0;
    for(var i=0; i<contentArr.length; i++) {
        if(contentArr[i] == '#') {
            if(j > 0) {
                content = content.substring(0, i+25*j) + "<font color='red'>" 
                + content.substring(i+25*j, i+25*j+3) + "</font>" 
                + content.substring(i+25*j+3);
            } else {
                content = content.substring(0, i) + "<font color='red'>" 
                + content.substring(i, i+3) + "</font>" 
                + content.substring(i+3);
            }
            j++;
        }
    }
    event.html(content);
}

/**
 * 下载文件
 */
function downloadResultText() {

}

/**
 * 提交后台获取结果字符串
 */
function submitForm() {
    var url = '';
    $('button[type=button]').on('click', function(e) {
        var formData = new FormData();
        // formData.append(name, element);
        formData.append('reFile', $('input[name=reFile]')[0].files[0]); //源文本文件
        formData.append('reStrTemp', $('input[name=reStrTemp]')[0].val()); //源文本模板
        formData.append('deStrTemp', $('input[name=reFile]')[0].val());//目标文本模板

        $.ajax({
              url: url,
              method: 'POST',
                  data: formData,
                  contentType: false,
                  processData: false,
                  cache: false,
                  success: function(data) {
                      // TODO 将文本输出到textarea上
                      alert(data + "上传成功");
                  },
                  error: function (jqXHR) {
                      console.log(JSON.stringify(jqXHR));
                  }
              })
              .done(function(data) {
                  console.log('done');
              })
              .fail(function(data) {
                  console.log('fail');
              })
              .always(function(data) {
                  console.log('always');
        });
    });
}