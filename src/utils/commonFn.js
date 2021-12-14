export function lcgFormatDate(date, type) {
    let tt = new Date(date)
    let y = tt.getFullYear()
    let mon = (tt.getMonth()+1).toString().padStart(2,0)
    let dd = tt.getDate().toString().padStart(2,0)
    let h = tt.getHours().toString().padStart(2,0)
    let min = tt.getMinutes().toString().padStart(2,0)
    let s = tt.getSeconds().toString().padStart(2,0)
    return type?`${y}-${mon}-${dd} ${h}:${min}:${s}`:`${y}-${mon}-${dd}`
}

export function getDateBeforeDay(day,type){
    let nowTimestamp = new Date().getTime() - Number(day)*84600000
    let tt = new Date(nowTimestamp)
    let y = tt.getFullYear()
    let mon = (tt.getMonth()+1).toString().padStart(2,0)
    let dd = tt.getDate().toString().padStart(2,0)
    let h = tt.getHours().toString().padStart(2,0)
    let min = tt.getMinutes().toString().padStart(2,0)
    let s = tt.getSeconds().toString().padStart(2,0)
    return type?`${y}-${mon}-${dd} ${h}:${min}:${s}`:`${y}-${mon}-${dd}`

}

export function getTurnedUrl(url) {
    //你的文档地址
    // var file = "https://smart-doc.oss-cn-chengdu.aliyuncs.com/material/cus/8097711376564289536.docx";
    // var file = "https://view.xdocin.com/demo/view/view.pdf";
    var file = url;
    //XDOC文档预览服务地址
    var xurl = "https://view.xdocin.com/xdoc?_xdoc=";
    //传入文档地址
    xurl += encodeURIComponent(file);
    //预览参数
    var ops = {
        "_pdf": true, //word/excel文档尝试以pdf方式显示，默认false
        // "_watermark": "XDOC文档预览", //水印文本，显示水印
        // "_saveable": false, //是否允许保存PDF，默认true
        // "_printable": false, //是否允许打印PDF，默认true
        // "_copyable": false, //是否允许选择复制内容，默认true
        // "_toolbar": false, //是否显示底部工具条，默认true
        // "_title": "文档预览", //自定义标题
        // "_expire": 30, //预览链接有效期，单位分钟，默认永久有效
        // "_limit": "1,3", //限制页数，如：“5”表示只显示前5页，“2,5”表示从第2页开始的5页，对pdf/doc/docx/ppt/pptx有效
    };
    //传入预览参数
    for (var a in ops) {
        xurl += "&" + encodeURIComponent(a) + "=" + encodeURIComponent(ops[a]);
    }
    return xurl
    //开始预览
    //window.location.replace(xurl);
    // window.location.href = xurl;
}

export function clipContent(value){
    let oInput = document.createElement('input')
    oInput.value = value
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.style.display = 'none'
}

export function returnUploadPrm(fileId, result, fileList) {
    const idxSite = fileList.name.indexOf('.')
    const nameSite = fileList.name.substring(idxSite)
    const requestData = new FormData()
    const fileKeySite = result.dir + fileId + nameSite
    requestData.append('policy', result.policy)
    requestData.append('signature', result.signature)
    requestData.append('ossaccessKeyId', result.accessid)
    requestData.append('callback', result.callback)
    requestData.append('x:companyid', result.companyid)
    requestData.append('x:name', fileList.name)
    requestData.append('key', fileKeySite)
    requestData.append('secure', true)
    requestData.append('dir', result.dir)
    requestData.append('host', result.host)
    requestData.append('file', fileList)
    return requestData
}

