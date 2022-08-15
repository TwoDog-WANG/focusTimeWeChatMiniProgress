// app.js
App({
    data: {
    },
    onHide() {
        wx.setStorage({
            key: 'fangqieToDo',
            data: this.componentData
        })
    },
    componentData: {}
})
