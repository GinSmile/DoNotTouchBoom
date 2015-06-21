var SettingLayer = cc.Layer.extend({

    ctor: function () {
           this._super();
           var winSize = cc.winSize;


           //add bg
           this.bgSprite = new cc.Sprite(res.bg_river);
           this.bgSprite.attr({
               x:winSize.width/2,
               y:winSize.height/2,
           });
           this.addChild(this.bgSprite);


           //add back menu
           var backMenuItem = new cc.MenuItemImage(res.Back_up, res.Back_down, this.backMenu, this);
           backMenuItem.x = 100;
           backMenuItem.y = winSize.height - 40;

           var mn = new cc.Menu(backMenuItem);
           mn.x = 0;
           mn.y = 0;
           mn.anchorX = 0.5;
           mn.anchorY = 0.5;
           this.addChild(mn);


           //音效
           this.seSprite = new cc.Sprite("#sound_effect.png");
           this.seSprite.attr({
                      x:winSize.width/2 - 100,
                      y:winSize.height/2 + 180,
           });
           this.addChild(this.seSprite);

           var soundOnMenuItem = new cc.MenuItemImage(
                    "#dui.png", "#dui.png");
           var soundOffMenuItem = new cc.MenuItemImage(
                    "#cuo.png", "#cuo.png");
           var soundToggleMenuItem = new cc.MenuItemToggle(
                    soundOnMenuItem,
                    soundOffMenuItem,
                this.menuSoundToggleCallback, this);
            soundToggleMenuItem.x = winSize.width/2 + 100;
            soundToggleMenuItem.y = winSize.height/2  + 180;

           //背景音乐
           this.BGMSprite = new cc.Sprite("#BGM.png");
           this.BGMSprite.attr({
                    x:winSize.width/2 - 100,
                    y:winSize.height/2 + 80,
           });
           this.addChild(this.BGMSprite);

           var musicOnMenuItem  = new cc.MenuItemImage(
                    "#dui.png", "#dui.png");
           var musicOffMenuItem  = new cc.MenuItemImage(
                    "#cuo.png", "#cuo.png");
           var musicToggleMenuItem = new cc.MenuItemToggle(
                    musicOnMenuItem,
                    musicOffMenuItem,
                    this.menuMusicToggleCallback, this);
           musicToggleMenuItem.x = soundToggleMenuItem.x;
           musicToggleMenuItem.y = soundToggleMenuItem.y - 110;

            //Ok按钮
            var okNormal = new cc.Sprite("#ok.png");
            var okSelected = new cc.Sprite("#ok.png");
            var okMenuItem = new cc.MenuItemSprite(okNormal, okSelected, this.menuOkCallback, this);
            okMenuItem.x = winSize.width/2;
            okMenuItem.y = 200;

            var mu = new cc.Menu(soundToggleMenuItem, musicToggleMenuItem, okMenuItem);
            mu.x = 0;
            mu.y = 0;
            this.addChild(mu);

            //设置音效和音乐选中状态
            musicStatus = cc.sys.localStorage.getItem(MUSIC_KEY);
            effectStatus = cc.sys.localStorage.getItem(EFFECT_KEY);
            if (musicStatus  == BOOL.YES) {
                musicToggleMenuItem.setSelectedIndex(0);
            } else {
                musicToggleMenuItem.setSelectedIndex(1);
            }
            if (effectStatus  == BOOL.YES) {
                soundToggleMenuItem.setSelectedIndex(0);
            } else {
                soundToggleMenuItem.setSelectedIndex(1);
            }



               return true;
           },

           backMenu: function (sender) {
                   cc.director.popScene();
           },



           menuSoundToggleCallback: function (sender) {
               cc.log("menuSoundToggleCallback!");
               if (effectStatus == BOOL.YES) {
                    cc.sys.localStorage.setItem(EFFECT_KEY, BOOL.NO);
                    effectStatus == BOOL.NO;

               } else {
                cc.sys.localStorage.setItem(EFFECT_KEY, BOOL.YES);
                   effectStatus == BOOL.YES;
               }
           },
           menuMusicToggleCallback: function (sender) {
               cc.log("menuMusicToggleCallback!");
               if (musicStatus  ==  BOOL.YES) {
                   cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.NO);
                   musicStatus = BOOL.NO;
                   cc.audioEngine.stopMusic();
               } else {
                   cc.sys.localStorage.setItem(MUSIC_KEY,  BOOL.YES);
                   musicStatus = BOOL.YES;
                   cc.audioEngine.playMusic(res.music, true);
               }
           },
           menuOkCallback: function (sender) {
               cc.log("menuOkCallback!");
               cc.log("musicStatus=>"+musicStatus);
               cc.log("soundStatus=>"+effectStatus);
               cc.director.popScene();

           },





           onEnterTransitionDidFinish: function () {
               this._super();
               cc.log("SettingLayer onEnterTransitionDidFinish");
               if (musicStatus == BOOL.YES) {
                   cc.audioEngine.playMusic(res.music, true);
               }
           },
           onExit: function () {
               this._super();
               cc.log("SettingLayer onExit");
           },
           onExitTransitionDidStart: function () {
               this._super();
               cc.log("SettingLayer onExitTransitionDidStart");
               cc.audioEngine.stopMusic(res.music);
           }
});

var SettingsScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        //var layer = new SettingLayer();
        //this.addChild(layer);
    }
});

