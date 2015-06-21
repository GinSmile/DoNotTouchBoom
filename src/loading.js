var loadingLayer = cc.Layer.extend({//继承LayerColor，初始化的时候可以直接改背景颜色
    a:0,//记录当前加载了多少个文件
    ctor : function() {
        this._super();
        var size = cc.winSize;

        //添加一个文本框显示
        var l = new cc.LabelTTF("current percent : 0%", "wawa", 18);
        //居中
        l.x = size.width * 0.5;
        l.y = size.height * 0.5 - 200;
        this.addChild(l, 11, 12);

        //add bg
        this.bgSprite = new cc.Sprite(res.bg_house);
        this.bgSprite.attr({
            x:size.width/2,
            y:size.height/2,
        });
        this.addChild(this.bgSprite);

        //加载文件的几种方式，特别是在cc.loader里面，还有好多种加载的函数，记得把加载的资源路径和文件名改掉

        for(var i in g_resources){
            cc.loader.load(g_resources[i], this.loadCall,this);
        }
    },
    loadCall : function() {
        //每次调用进行计数
        this.a ++;
        //以tag的形式获取文本框对象
        var subTile = this.getChildByTag(12);
        //toFixed(2)意思是取小数点后两位，小数点后第三位为四舍五入
        subTile.setString("正在加载 :" + (this.a / g_resources.length).toFixed(2) *100 + "%");
        //加载完毕，貌似好多教程都是用百分比判断( >= 1 )
        if (this.a == g_resources.length) {
            //带翻页动画的场景跳转，第一个参数为动画的执行时间，第二个为跳到的场景，第三个为false时从右下角往左边翻页，true时左边往右边翻页
            this.scheduleOnce(this.callBack, 0.9); //延时
        }
    },


    callBack:function(){
             var trans = new cc.TransitionSplitCols(0.5, new StartScene(), false);
             cc.director.runScene(trans);

    }
});

var HelloScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new loadingLayer();
        this.addChild(layer);
    }


});

