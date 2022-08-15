const { getTime } = require('../../timeComponent/timeCanvs/timeNumShow/getTime');

Component({
    properties: {
        active: {
            type: Object
        },
        isMultiple: {
            type: Boolean
        },
        index: {
            type: Number,
        }
    },
    data: {
        durationTime: ['00', '00', '00'],
        controlBtnIsShow: false,
    },
    lifetimes: {
        attached() {
            let arr = [...getTime(this.properties.active.durationTime)];
            this.setData({
                durationTime: arr
            })
        }
    },
    methods: {
        changeBtnIsShow() {
            this.setData({
                controlBtnIsShow: !this.data.controlBtnIsShow
            })
        },
        startTime(e) {
            this.__proto__.changeBtnIsShow.call(this);
            const thingIndex = e.currentTarget.dataset.index;
            this.triggerEvent('startTime', thingIndex);
        },
        clickCheck(e) {
            let length = e.detail.value.length;
            let obj = {};
            if(length > 0) {
                obj.checked = true;
            }
            else {
                obj.checked = false;
            }
            obj.id = e.currentTarget.dataset.key;
            this.triggerEvent('checkThing', obj);
        },
        deleteThing(e) {
            this.triggerEvent('deleteThing', e.currentTarget.dataset.key);
        }
    }
})
