var HelpLayer = cc.Layer.extend({

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        musicStatus = cc.sys.localStorage.getItem(MUSIC_KEY);
        effectStatus = cc.sys.localStorage.getItem(EFFECT_KEY);

        //add bg
        this.bgSprite = new cc.Sprite(res.bg_3);
        this.bgSprite.attr({
            x:size.width/2,
            y:size.height/2,
        });
        this.addChild(this.bgSprite);



        var backMenuItem = new cc.MenuItemImage(res.Back_up, res.Back_down, this.backMenu, this);
        backMenuItem.x = 100;
        backMenuItem.y = size.height - 40;

        var mn = new cc.Menu(backMenuItem);
        mn.x = 0;
        mn.y = 0;
        mn.anchorX = 0.5;
        mn.anchorY = 0.5;
        this.addChild(mn);


        //add HelpLabel
        this.helpLabel = cc.LabelTTF.create("酒庄的老板要收集食物来酿酒了，快去帮帮她吧！\n点击食物就能把吃的收集到酒庄的仓库！\n小心炸弹！！\n\n"+
        "食物：1 point\n 金币：5 point\n 炸弹：-10 point\n \n", "Arial",17);
        this.helpLabel.x = size.width/2;
        this.helpLabel.y = size.height/2;
        this.addChild(this.helpLabel, 5);

        return true;
    },

    backMenu: function (sender) {
            cc.director.popScene();
        },


});

var HelpScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelpLayer();
        this.addChild(layer);
    }
});

