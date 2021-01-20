const { resolve } = require('path')

module.exports = (options = {}, context) => ({
    define() {
        const {
            num = 10,
            show = true, // true显示  false隐藏
            zIndex = -1,
            img = {
                replace: false,   // absolute 图片绝对路径 relative 相对路径,
                httpUrl: '...'
            }
        } = options

        return {
            SAKURA_NUM: num,
            SAKURA_IMG: img,
            SAKURA_SHOW: show,
            SAKURA_ZINDEX: zIndex
        }
    },
    enhanceAppFiles: resolve(__dirname, "./bin/enhanceAppFile.js"),
    globalUIComponents: ["Sakura"]
});
