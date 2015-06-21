var PlayLayer = cc.Layer.extend({
    MySprites:null,
    scoreLabel:null,
    score:0,
    timeoutLabel:null,
    timeout: TIMEOUT,
    bucket:null,

    ctor:function(){
        this._super();
        this.MySprites = [];
        size = cc.winSize;


        musicStatus = cc.sys.localStorage.getItem(MUSIC_KEY);
        effectStatus = cc.sys.localStorage.getItem(EFFECT_KEY);

        if(musicStatus == BOOL.YES){
            cc.audioEngine.playMusic(res.music, true);
            cc.log("playing bgm");
        }

        //load FrameCache pic to cache
        cc.spriteFrameCache.addSpriteFrames(res.food_plist);

        //add bg
        var myBg = [res.bg_3, res.bg_4, res.bg_5, res.bg_6];
        var n = parseInt(Math.random()*10)%4;
        //cc.log("n=>"+n);
        var bgSprite = new cc.Sprite(myBg[n]);
        bgSprite.attr({
            x:size.width/2,
            y:size.height/2,

            rotation:180,
        });
        this.addChild(bgSprite, 0);

        //add scoreLabel
        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        this.scoreLabel.attr({
            x:size.width,
            y:size.height,

            anchorX:1,
            anchorY:1
        });
        this.addChild(this.scoreLabel, 110);

        //add timeLabel
        this.timeoutLabel = cc.LabelTTF.create("Time:" +this.timeout, "Arial",30);
        this.timeoutLabel.attr({
            x:0,
            y:size.height,

            anchorX:0,
            anchorY:1
        });
        this.addChild(this.timeoutLabel, 110);


       /*  //add suspend menu
       var suspendSprite = new cc.Sprite("#suspend.png");
       suspendSprite.attr({
                   x:size.width/2,
                   y:size.height,

                   anchorX:0,
                   anchorY:1,


               });
       this.addChild(suspendSprite);*/

        //add bucket
        this.bucket = new cc.Sprite('#bucket_1.png');
        this.bucket.attr({
            x:0,
            y:0,

            anchorX:0,
            anchorY:0
        });
        this.addChild(this.bucket,100);

        this.schedule(this.addFood, 1, 16*1024, 1);//40 point
        this.schedule(this.addGold, 5, 16*1024, 1);//40 point
        this.schedule(this.addBoom, 0.8, 16*1024, 1);
        this.schedule(this.update, 1, 16*1024, 1);

        this.schedule(this.timer,1,this.timeout,1);
        return true;
    },


    //更改右上角分数，产生加分特效
    addScore:function(type, pos){
        switch(type){
            case SpriteTypes.GOLD :
                this.score += SpriteScore.GOLD;
                this.scefLabel = cc.LabelTTF.create("+"+SpriteScore.GOLD, "Arial",37);
                break;
            case SpriteTypes.FOOD :
                this.score += SpriteScore.FOOD;
                this.scefLabel = cc.LabelTTF.create("+"+SpriteScore.FOOD, "Arial",25);
                break;
            case SpriteTypes.BOOM :
                this.score += SpriteScore.BOOM;
                this.scefLabel = cc.LabelTTF.create(SpriteScore.BOOM, "Arial",37);
                break;
        }

        this.scefLabel.x = pos.x + 20;
        this.scefLabel.y = pos.y + 20;
        this.addChild(this.scefLabel, 10);
        this.scefLabel.runAction(cc.fadeOut(1.5));

        this.scoreLabel.setString("score:" + this.score);
    },


    addFood:function(){
        if(cc.pool.hasObject(BoomSprite)){
            var myItem = cc.pool.getFromPool(FoodSprite);
        }else{
            var index_pic = parseInt(Math.random()*22) + 1;//1~22
            var myItem = new FoodSprite('#food_'+index_pic+'.png');
        }



        var size = cc.winSize;

        var x = myItem.width/2 + size.width*3/4*cc.random0To1();
        myItem.attr({
            x:x,
            y:size.height + 50
        });

       this.MySprites.push(myItem);

       //if(myItem.getParent() == null){
            this.addChild(myItem,100);

       //}

        var speedPara = this.timeout/20;
        var ran = parseInt(size.width/2 * cc.random0To1());

        var speedPara = this.timeout/20;
        var dropAction = cc.moveTo(4 - speedPara, cc.p(myItem.x,-50));//var p = cc.p(x,y); //a point located in (x,y)
        myItem.runAction(new cc.EaseIn(dropAction,2));

        return true;
    },

    addGold:function(){

        if(cc.pool.hasObject(BoomSprite)){
            var myItem = cc.pool.getFromPool(GoldSprite);
        }else{
            var myItem = new GoldSprite('#gold.png');
        }
        var size = cc.winSize;

        var x = myItem.width/2 + size.width*3/4*cc.random0To1();
        myItem.attr({
            x:x,
            y:size.height + 50
        });

       this.MySprites.push(myItem);

       //if(myItem.getParent() == null){
            this.addChild(myItem,100);

       //}

        var speedPara = this.timeout/20;
        var ran = parseInt(size.width/2 * cc.random0To1());

        var dropAction = cc.moveTo(5 - speedPara, cc.p(myItem.x,-50));//var p = cc.p(x,y); //a point located in (x,y)
        var rotateAc = cc.rotateBy(1,400);
        var rotateRep = cc.repeat(rotateAc,4);

        myItem.runAction(cc.spawn(new cc.EaseIn(dropAction,2), rotateRep));

        return true;
    },

    addBoom:function(){

        var myItem = BoomSprite.createBoom();

        var size = cc.winSize;

        myItem.attr({
            x:0,
            y:size.height + 350
        });

       this.MySprites.push(myItem);

       //if(myItem.getParent() == null){
            this.addChild(myItem,100);

       //}




        var ran = parseInt(size.width*3/4 * cc.random0To1());

        if(ran%2 == 1){//从左边投
            myItem.x = -size.width;
            bezier = [cc.p(size.width/2, size.height),cc.p(size.width*3/4, size.height/2), cc.p(size.width/4 + ran, -size.height/2)];
        }else{//从右边投炸弹
            myItem.x = 2*size.width;
            bezier = [cc.p(size.width/2, size.height),cc.p(size.width/4, size.height/2), cc.p(size.width*3/4 - ran, -size.height/2)];
        }

        var rotateAc = cc.rotateBy(1,400);
        var rotateRep = cc.repeat(rotateAc,4);
        var bezierAc = cc.bezierTo(3,bezier);
        myItem.runAction(cc.spawn(bezierAc, rotateRep));

        return true;
    },

    update:function(){
        this.removeSushi();
        if(this.timeout < 19){
            this.addBoom();
            this.addFood();//共19 point
        }

        if(this.timeout in [3,4,6,9]){
            this.addGold();//共20分
        }
    },

    removeSushi : function(){
        //移除屏幕底部的精灵
        for(var i = 0; i < this.MySprites.length; i++){
            if(0 > this.MySprites[i].getPosition().y || this.MySprites[i].isTouched == true){
                this.MySprites[i].removeFromParent();
                //cc.pool.putInPool(this.MySprites[i]);
                this.MySprites[i] = undefined;
                this.MySprites.splice(i,1);// remove one element at i
                i = i - 1;
            }
        }
    },

    removeBoomEffectedFood:function(pos){
        for(var i = 0; i < this.MySprites.length; i++){
            if(this.MySprites[i].isTouched == true ||
            (this.MySprites[i].getPosition().y < pos.y + 300 && this.MySprites[i].getPosition().y > pos.y - 250)){
                this.MySprites[i].removeFromParent();
                //cc.pool.putInPool(this.MySprites[i]);
                this.MySprites[i] = undefined;
                this.MySprites.splice(i,1);// remove one element at i
                i = i - 1;
            }
        }
    },

    timer:function(){
        if(this.timeout <= 0){
            //停止现在正在下落的sushi
            for(var i = 0; i < this.MySprites.length; i++){
                this.MySprites[i].stopAllActions();
                //this.MySprites[i].removeTouchEventListener();
             }

            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;

            var highScore = cc.sys.localStorage.getItem(HIGHSCORE_KEY);
            var titleLabel;
            if(highScore == null){
                highScore = this.score;
                titleLabel = new cc.LabelTTF("新纪录：" + highScore , "Arial", 30);
            }else if(highScore <= this.score){
                //new record
                highScore = this.score;
                cc.sys.localStorage.setItem(HIGHSCORE_KEY, highScore);
                titleLabel = new cc.LabelTTF("新纪录：" + highScore, "Arial", 30);
            }else{
                titleLabel = new cc.LabelTTF("您的分数：" + this.score +"\n最高记录：" + highScore, "Arial", 30);
            }

            titleLabel.attr({
                x:size.width / 2 ,
                y:size.height / 2,
            });
            gameOver.addChild(titleLabel, 5);

            var bg = new cc.Sprite("res/gameover.png");
            bg.attr({
                x:size.width/2,
                y:size.height/2,

                 scale: 0.66
            });
            gameOver.addChild(bg, 1);


            var TryAgainItem = new cc.MenuItemFont(
                    "重新开始",
                    function () {
                        var transition= cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
                        cc.director.runScene(transition);
                    }, this);
            TryAgainItem.attr({
                x: size.width/2,
                y: size.height / 2 - 70,
                anchorX: 0.5,
                anchorY: 0.5
            });


            var QuitItem = new cc.MenuItemFont(
                    "返回菜单",
                    function () {
                        cc.log("Menu 2 is clicked!");
                        var transition= cc.TransitionFade(1, new StartScene(),cc.color(255,255,255,255));
                        cc.director.runScene(transition);
                    }, this);
            QuitItem.attr({
                x: size.width/2,
                y: size.height / 2 - 127,
                anchorX: 0.5,
                anchorY: 0.5
            });

            var menu = new cc.Menu(TryAgainItem, QuitItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu, 1);
            this.getParent().addChild(gameOver);


            this.unschedule(this.timer);
            this.unschedule(this.addFood);
            this.unschedule(this.update);
            this.unschedule(this.addBoom);
            this.unschedule(this.addGold);



             for(var i = 0; i < this.MySprites.length; i++){
                       this.MySprites[i].removeTouchEventListener();
                    }


            return;

        }

         this.timeout -=1;
         this.timeoutLabel.setString("Time:" + this.timeout);

    },

    //bucket放大特效
    doScale:function(){

        var ac1 = cc.scaleTo(0.15,1.4);
        var ac2 = cc.fadeTo(0.15,50);

        var ac3 = cc.scaleTo(0.09,1);
        var ac4 = cc.fadeTo(0.01,255);

        this.bucket.runAction(cc.sequence(cc.spawn(ac1,ac2), cc.spawn(ac3,ac4)));
    },


    onExitTransitionDisStart:function(){
        this._super();
         cc.audioEngine.stopMusic(res.music);
    }
});

var PlayScene = cc.Scene.extend({
        onEnter:function(){
            this._super();
            var layer = new PlayLayer();
            this.addChild(layer);
        }
});