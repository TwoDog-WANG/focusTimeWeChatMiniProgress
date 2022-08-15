const app = getApp();

Component({
    properties: {
        isFist: {
            type: Boolean,
        }
    },
    options: {
        pureDataPattern: /^_/
    },
    data: {
        thingArr: [],
        arrIsNull: true,
        formIsShow: false,
        isMultiple: false,
        _deleteArr: []
    },
    observers: {
        'thingArr': function(newVal) {
            this.setData({
                arrIsNull: newVal.length <= 0
            })
        }
    },
    methods: {
        startTime(e) {
            this.triggerEvent('startTime', e.detail);
            console.log(e.detail);
        },
        showForm() {
            this.setData({
                formIsShow: true,
            })
        },
        cancelForm() {
            this.setData({
                formIsShow: false
            })
        },
        addThing(e) {
            this.setData({
                formIsShow: false,
                // 在attached里，this.data.thingArr被指向了app实例里的_thingArr
                // setData没有进行深拷贝
                thingArr: this.data.thingArr
            })
        },
        showMultipleDelete() {
            this.setData({
                isMultiple: !this.data.isMultiple,
                _deleteArr: []
            })
        },
        checkThing(res) {
            let obj = res.detail;
            if(obj.checked) {
                this.data._deleteArr.push(obj.id);
            }
            else {
                let index = this.data._deleteArr.findIndex((val) => {
                    return val === obj.id
                })
                this.data._deleteArr.splice(index, 1);
                this.setData({
                    _deleteArr: this.data._deleteArr
                })
            }
        },
        confirmDelete() {
            let { _deleteArr: deleteArr, thingArr} = this.data;
            deleteArr.forEach((val) => {
                this.__proto__.deleteThing.call(this, val);
            });
            this.setData({
                thingArr
            });
            this.__proto__.showMultipleDelete.call(this);
        },
        deleteThing(e) {
            let key;
            if(typeof e === 'number') {
                key = e;
            }
            else {
                key = e.detail;
            }
            let index = this.data.thingArr.findIndex((val) => {
                return val.id === key
            });
            if(index !== -1) {
                this.data.thingArr.splice(index, 1)
            }
            if(typeof e !== 'number') {
                this.setData({
                    isMultiple: false,
                    _deleteArr: [],
                    thingArr: this.data.thingArr
                })
            }
        }
    },
    lifetimes: {
        attached() {
            let data = wx.getStorageSync('fangqieToDo');
            if(this.properties.isFist) {
                if(data) {
                    app.componentData = data
                }
                else {
                    let obj = {
                        allDurationTime: {
                            _timeArr: []
                        },
                        things: {
                            _thingArr: []
                        },
                        thingType: {
                            _typeArr: [],
                        },
                        timeClear: {
                            _token: null,
                        }
                    }
                    app.componentData = obj;
                }
                this.triggerEvent('fistLode');
            }
            const thingArr = app.componentData.things._thingArr;
            this.setData({
                thingArr,
                arrIsNull: thingArr.length <= 0
            })
        }
    }
})
