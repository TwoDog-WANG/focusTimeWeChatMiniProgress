function findElementByClass(className, nowEle) {
    if(nowEle.nodeType !== 'BODY') {
        let classArr = Array.from(nowEle.classList);
        if(classArr.includes(className)) {
            return nowEle
        }
        else {
            let newEle = nowEle.parentElement;
            return findElementByClass(className, newEle);
        }
    }
    else {
        return undefined
    }
}

module.exports = {
    findElementByClass,
}