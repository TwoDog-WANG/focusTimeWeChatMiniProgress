const { findElementByClass } = require('../../publicFun/findEle');
Component({
    properties: {

    },
    options: {
        pureDataPattern: /^_/
    },
    data: {
        isContinue: true,
    },
    methods: {
        changeInterval(e) {
            switch (e.currentTarget.dataset.name) {
                case 'reset':
                    this.triggerEvent('changeinterval', 'reset');
                    break;
                case 'continue':
                    this.triggerEvent('changeinterval', 'continue');
                    this.setData({
                        isContinue: !this.data.isContinue,
                    })
                    break;
                case 'quit': 
                    this.triggerEvent('changeinterval', 'quit');
                default:
                    break;
            }
        },
    }
})
