//是否播放背景音乐状态
var musicStatus;
//是否播放音效状态
var effectStatus;

var StartLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        winSize = size;


        musicStatus = cc.sys.localStorage.getItem(MUSIC_KEY);
        //effectStatus = cc.sys.localStorage.getItem(EFFECT_KEY);
        if (musicStatus  == BOOL.YES) {
            cc.audioEngine.playMusic(res.music, true);
        }

        //load menu pics
        cc.spriteFrameCache.addSpriteFrames(res.menu_plist);

        //add bg
        this.bgSprite = new cc.Sprite(res.bg_house);
        this.bgSprite.attr({
            x:size.width/2,
            y:size.height/2,
        });
        this.addChild(this.bgSprite);

        //add banner
       var bannerSprite = new cc.Sprite("#banner.png");
       bannerSprite.attr({
                   x:size.width/2,
                   y:size.height/2 + 240,

                   anchorX:0.5,
                   anchorY:0.5,
               });
       this.addChild(bannerSprite);


        //add start menu
       var startSpriteNormal = new cc.Sprite("#start_up.png");
       var startSpriteSelect = new cc.Sprite("#start_up.png");
       var startItem = new cc.MenuItemSprite(startSpriteNormal, startSpriteSelect,this.onMenuCallback,this);
       startItem.tag  = ActionTypes.START;
       startItem.attr({
                   x:size.width/2,
                   y:size.height/2 + 40,

                   anchorX:0.5,
                   anchorY:0.5,


               });

       //add setting menu
       var settingSpriteNormal = new cc.Sprite("#setting_up.png");
       var settingSpriteSelect = new cc.Sprite("#setting_up.png");
       var settingItem = new cc.MenuItemSprite(settingSpriteNormal, settingSpriteSelect,this.onMenuCallback,this);
       settingItem.tag  = ActionTypes.SETTING;
       settingItem.attr({
                   x:size.width/2,
                   y:size.height/2 + 140,

                   anchorX:0.5,
                   anchorY:0.5,


               });


       //add help menu
       var helpSpriteNormal = new cc.Sprite("#help_up.png");
       var helpSpriteSelect = new cc.Sprite("#help_up.png");
       var helpItem = new cc.MenuItemSprite(helpSpriteNormal, helpSpriteSelect,this.onMenuCallback,this);
       helpItem.tag  = ActionTypes.HELP;
       helpItem.attr({
                   x:size.width/2,
                   y:size.height/2 + 190,

                   anchorX:0.5,
                   anchorY:0.5,


               });


       var mn = new cc.Menu(startItem, settingItem, helpItem);
       mn.alignItemsVertically();
       this.addChild(mn);

       return true;

        },


        onExitTransitionDisStart:function(){
            this._super();
             cc.audioEngine.stopMusic(res.music);
        },


        onMenuCallback:function (sender) {
            	cc.log("tag = " + sender.tag);

            	switch(sender.tag){
                    case ActionTypes.START:
                            var scene = new PlayScene();
                            var layer = new PlayLayer();
                            scene.addChild(layer);
                            cc.director.pushScene(new cc.TransitionSlideInR(0.6, scene));
                            break;
                    case ActionTypes.SETTING:
                            var scene = new SettingsScene();
                            var layer = new SettingLayer();
                            scene.addChild(layer);
                            cc.director.pushScene(new cc.TransitionSlideInR(0.6, scene));
                            break;
                    case ActionTypes.HELP:
                            var scene = new HelpScene();
                            var layer = new HelpLayer();
                            scene.addChild(layer);
                            cc.director.pushScene(new cc.TransitionSlideInR(0.6, scene));
                            break;
            	}


        },

});



var StartScene = cc.Scene.extend({
        onEnter:function(){
            this._super();
            var layer = new StartLayer();
            this.addChild(layer);
        }
});