function getTime(timeData) {
    let hour = parseInt(timeData / 3600);
    hour = hour < 10 ? `0${hour}` : `${hour}`;
    let minute = parseInt((timeData % 3600) / 60);
    minute = minute < 10 ? `0${minute}` : `${minute}`;
    let second = parseInt((timeData % 3600) % 60);
    second = second < 10 ? `0${second}` : `${second}`;
    return [hour, minute, second]
}

module.exports.getTime = getTime;