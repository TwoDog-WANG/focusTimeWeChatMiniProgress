const { getTime } = require('../../timeComponent/timeCanvs/timeNumShow/getTime');

const app = getApp();

Component({
    properties: {

    },
    data: {
        thing: '',
        multiTimeArr: [[],[],[]],
        time: NaN,
        timeStr: '00:00:00',
        typeArr: [],
        typeIndex: 0,
        typeStr: '',
        typeInputIsShow: false,
        newType: '',
    },
    methods: {
        timeChange(e) {
            let index = e.detail.value;
            // let timeStr = index.reduce((pre, curr, _index) => {
            //     let str = `${pre}${this.data.multiTimeArr[_index][curr] < 10 ? `0${this.data.multiTimeArr[_index][curr]}` : this.data.multiTimeArr[_index][curr]}`;
            //     return str
            // }, '');
            // console.log(timeStr);
            let multiTimeArr = this.data.multiTimeArr;
            let timeArr = [multiTimeArr[0][index[0]], multiTimeArr[1][index[1]], multiTimeArr[2][index[2]]];
            let time = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
            timeArr = getTime(time);
            let timeStr = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`;
            this.setData({
                time,
                timeStr
            })
        },
        choseType(e) {
            this.setData({
                typeStr: this.data.typeArr[e.detail.value]
            })
        },
        inputChange(e) {
            this.setData({
                [e.currentTarget.dataset.key]: e.detail.value
            })
        },
        addType() {
            if(this.data.newType && !this.data.typeArr.includes(this.data.newType)) {
                this.data.typeArr.push(this.data.newType);
                this.setData({
                    typeArr: this.data.typeArr,
                    typeStr: this.data.typeArr[this.data.typeArr.length - 1],
                    typeIndex: this.data.typeArr.length - 1
                })
            }
            else if(this.data.newType) {
                wx.showToast({
                  title: '已经有了，多找找',
                })
            }
            else {
                wx.showToast({
                  title: '空滴',
                })
            }
        },
        btnClick(e) {
            if(e.currentTarget.dataset.key === 'add') {
                this.__proto__._addThing.call(this);
            }
            else {
                this.triggerEvent('cancelForm');
            }
        },
        _addThing() {
            let { time, thing, typeStr } = this.data;
            let id = new Date().getTime();
            if( time && thing && typeStr) {
                let obj = {
                    thing,
                    durationTime: time,
                    type: typeStr,
                    id
                }
                app.componentData.things._thingArr.push(obj);
                if(!this.data.typeArr.includes(typeStr)) {
                    app.componentData.thingType._typeArr.push(typeStr);
                }
                this.triggerEvent('addThing', obj)
            }
            else {
                wx.showToast({
                  title: '咋就有空的地方内',
                  icon: 'error',
                  duration: 2000
                })
            }
        }
    },
    lifetimes: {
        attached() {
            let arr1 = [];
            let arr2 = [];
            for(let i = 0; i <= 24; i++) {
                arr1.push(i);
            }
            for(let i = 0; i <= 59; i++) {
                arr2.push(i);
            }
            let typeArr = app.componentData.thingType._typeArr;
            let typeStr = '';
            if(typeArr.length !== 0) {
                typeStr = typeArr[0];
            }
            this.setData({
                'multiTimeArr[0]': arr1,
                'multiTimeArr[1]': arr2,
                'multiTimeArr[2]': arr2,
                typeArr,
                typeStr
            })
        }
    }
})
