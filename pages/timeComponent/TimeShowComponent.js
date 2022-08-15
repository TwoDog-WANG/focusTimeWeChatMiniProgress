const app = getApp();
Component({
    properties: {
        index: {
            type: Number,
        }
    },
    data: {
        doing: {
            durationTime: 0,
        },
        timeToken: {
            activeName: ''
        }
    },
    methods: {
        changeInterval(...rest) {
            const [ { detail: activeName} ] = rest;
            const toCanvsName = ['reset', 'continue'];
            if(toCanvsName.includes(activeName)) {
                this.setData({
                    timeToken: {
                        activeName
                    }
                })
            }
            else {
                this.triggerEvent('quit');
            }
        }
    },
    lifetimes: {
        attached() {
            this.setData({
                doing: app.componentData.things._thingArr[this.properties.index]
            })
        }
    }
})
