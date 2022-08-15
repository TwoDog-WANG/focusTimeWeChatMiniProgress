function drawArc(ctx, width, height, durationTime, nowTime, timeClear) {
    // const nowTime = new Date().getTime();
    // const currentTime = (nowTime - beginTime) / 1000;
    let precent = NaN
    if(nowTime <= 0) {
        precent = 0;
        ctx.lineCap = 'butt';
        clearInterval(timeClear);
        timeClear = null;
    }
    else {
        precent = nowTime / durationTime;
        ctx.lineCap = 'round';
    }
    const x = parseFloat(width) / 2;
    const y = parseFloat(height) / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(x, y, x - 3, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgb(220,220,220)';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, x - 15, -0.5 * Math.PI, ((precent * 2) - 0.5) * Math.PI);
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#66ccff';
    ctx.stroke();
}

module.exports = {
    drawArc
}