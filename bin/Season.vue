<template>
    <div class="Season">
        <canvas id="canvas_season" ref="canvas_season" :style="{ zIndex: zIndex }"></canvas>
    </div>
</template>

<script>
class Falling {
    constructor(x, y, s, r, fn, that, img) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
        this.that = that;
        this.img = img;
    }
    draw(cxt) {
        cxt.save();
        var xc = 40 * this.s / 4;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s)
        cxt.restore();
    }
    update() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);
        if (this.x > window.innerWidth ||
            this.x < 0 ||
            this.y > window.innerHeight ||
            this.y < 0
        ) {
            this.r = this.that.getRandom('fnr');
            if (Math.random() > 0.4) {
                this.x = this.that.getRandom('x');
                this.y = 0;
                this.s = this.that.getRandom('s');
                this.r = this.that.getRandom('r');
            } else {
                this.x = window.innerWidth;
                this.y = this.that.getRandom('y');
                this.s = this.that.getRandom('s');
                this.r = this.that.getRandom('r');
            }
        }
    }
}
class FallingList {
    constructor() {
        this.list = [];
    }
    push(falling) {
        this.list.push(falling);
    }
    update() {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].update();
        }
    }
    draw(cxt) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].draw(cxt);
        }
    }
    get(i) {
        return this.list[i];
    }
    size() {
        return this.list.length;
    }
}
export default {
    name: 'Season',
    data() {
        return {
            staticx: false,
            stop: null,
            num: SEASON_NUM,
            show: SEASON_SHOW,
            zIndex: SEASON_ZINDEX
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.show) {
                this.startFalling()
            }
        })
    },
    methods: {
        getRandom(option) {
            var ret, random;
            switch (option) {
                case 'x':
                    ret = Math.random() * window.innerWidth;
                    break;
                case 'y':
                    ret = Math.random() * window.innerHeight;
                    break;
                case 's':
                    ret = Math.random();
                    break;
                case 'r':
                    ret = Math.random() * 6;
                    break;
                case 'fnx':
                    random = -0.5 + Math.random() * 1;
                    ret = function (x, y) {
                        return x + 0.5 * random - 1.7;
                    };
                    break;
                case 'fny':
                    random = 1.5 + Math.random() * 0.7
                    ret = function (x, y) {
                        return y + random;
                    };
                    break;
                case 'fnr':
                    random = Math.random() * 0.03;
                    ret = function (r) {
                        return r + random;
                    };
                    break;
            }
            return ret;
        },
        startFalling() {
            let that = this
            requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame;
            var canvas = document.getElementById('canvas_season');
            this.staticx = true;
            this.$refs.canvas_season.width = window.innerWidth;
            this.$refs.canvas_season.height = window.innerHeight;
            var cxt = this.$refs.canvas_season.getContext('2d');
            var fallingList = new FallingList();
            const img = new Image();
            const season= {
                spring:require('./img/sakura.png'),
                summer:require('./img/pop.png'),
                autumn:require('./img/leaf.png'),
                winter:require('./img/snow.png')
            }
            const month = new Date().getMonth() + 1;
            if (SEASON_IMG.replace) {
                season.spring = SEASON_IMG.httpUrl.spring||season.spring;
                season.summer = SEASON_IMG.httpUrl.summer||season.summer;
                season.autumn = SEASON_IMG.httpUrl.autumn||season.autumn;
                season.winter = SEASON_IMG.httpUrl.winter||season.winter;  
            }
            switch (month) {
                    case 3:
                    case 4:
                    case 5:
                        img.src = season.spring;
                        break;
                    case 6:
                    case 7:
                    case 8:
                        img.src = season.summer;
                        break;
                    case 9:
                    case 10:
                    case 11:
                        img.src = season.autumn;
                        break;
                    case 12:
                    case 1:
                    case 2:
                        img.src = season.winter;
                        break;
                    default:
                        break;
                }
            for (var i = 0; i < that.num; i++) {
                let falling, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
                randomX = this.getRandom('x');
                randomY = this.getRandom('y');
                randomR = this.getRandom('r');
                randomS = this.getRandom('s');
                randomFnx = this.getRandom('fnx');
                randomFny = this.getRandom('fny');
                randomFnR = this.getRandom('fnr');
                falling = new Falling(randomX, randomY, randomS, randomR, {
                    x: randomFnx,
                    y: randomFny,
                    r: randomFnR
                }, this, img);
                falling.draw(cxt);
                fallingList.push(falling);
            }
            this.stop = requestAnimationFrame(function fn() {
                cxt.clearRect(0, 0, canvas.width, canvas.height);
                fallingList.update();
                fallingList.draw(cxt);
                that.stop = requestAnimationFrame(fn);
            })
        },
        stopp() {
            if (this.staticx) {
                var child = document.getElementById("canvas_season");
                child.parentNode.removeChild(child);
                window.cancelAnimationFrame(this.stop);
                this.staticx = false;
            } else {
                this.startFalling();
            }
        }
    }
}
</script>

<style scoped>
#canvas_season {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
