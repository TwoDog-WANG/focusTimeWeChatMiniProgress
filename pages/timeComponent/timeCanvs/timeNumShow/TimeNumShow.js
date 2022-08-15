const { getTime } = require('./getTime');

Component({
    properties: {
        timeData: {
            type: Number,
            observer: function(newVal) {
                let arr = getTime(newVal);
                let oldArr = this.data.timeArr;
                arr.forEach((val, index) => {
                    if(val !== oldArr[index]) {
                        let arr = new Array(3);
                        arr[index] = true;
                        this.setData({
                            numClassArr: arr 
                        })
                    }
                })
                this.setData({
                    timeArr: arr,
                })
            }
        }
    },
    data: {
        timeArr: [],
        numClassArr: [false, false, false],
    },
    methods: {
        clearNumArr() {
            this.setData({
                numClassArr: new Array(3),
            })
        }
    },
    lifetimes: {
        // attached() {
        //     let arr = getTime(this.properties.timeData);
        //     this.setData({
        //         timeArr: arr,
        //     })
        // }
    }
})
