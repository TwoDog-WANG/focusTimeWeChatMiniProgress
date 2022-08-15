const { drawArc } = require('./drawArc');

const app = getApp();
let ctx = null;
const ctxSize = {
    width: NaN,
    height: NaN,
};
let beginTime = NaN;
let timeClear = null;
Component({
    properties: {
        durationTime: {
            type: Number
        },
        timeToken: {
            type: Object,
            observer: function(newVal) {
                if(newVal) {
                    this.__proto__._changeIntervalFun.call(this, newVal);
                }
            }
        }
    },
    options: {
        pureDataPattern: /^_/
    },
    data: {
        time: 0,
        _isContinue: true,
    },
    methods: {
        _beginInterval: function() {
            drawArc(ctx, ctxSize.width, ctxSize.height, this.properties.durationTime, this.data.time);
            timeClear = setInterval(() => {
                this.setData({
                    time: this.data.time - 1,
                })
                drawArc(ctx, ctxSize.width, ctxSize.height, this.properties.durationTime, this.data.time, timeClear);
            }, 1000);
            app.componentData.timeClear._token = timeClear;
        },
        _changeIntervalFun: function(newVal) {
            switch (newVal.activeName) {
                case 'reset':
                    this.__proto__._resetTime.call(this);
                    break;
                case 'continue':
                    this.__proto__._continueTime.call(this);
                    break;
                default:
                    break;
            }
        },
        _resetTime() {
            if(timeClear) {
                clearInterval(timeClear);
            }
            this.setData({
                time: this.properties.durationTime,
                _isContinue: true
            })
            this.__proto__._beginInterval.call(this)
        },
        _continueTime() {
            if(this.data._isContinue) {
                clearInterval(timeClear);
                timeClear = null;
                app.componentData.timeClear._token = timeClear;
            }
            else {
                this.__proto__._beginInterval.call(this)
            }
            this.setData({
                _isContinue: !this.data._isContinue,
            })
        }
    },
    lifetimes: {
        ready() {
            this.setData({
                time: this.properties.durationTime,
            })
            wx.createSelectorQuery()
              .in(this)
              .select('.time-canvs')
              .fields({node: true, size: true})
              .exec((res) => {
                  const canvs = res[0].node;
                  const {width, height} = res[0];
                  canvs.width = width;
                  canvs.height = width;
                  ctxSize.width = width;
                  ctxSize.height = height;
                  ctx = canvs.getContext('2d');
                  beginTime = new Date().getTime();
                  this.__proto__._beginInterval.call(this);
              })
        }
    }
})
