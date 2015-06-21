var SushiSprite = cc.Sprite.extend({
        disappearAction:null,
        isTouched:false,
        touchListener:null,
        type: SpriteTypes.FOOD,
        onEnter:function(){
            //cc.log("onEnter");
            this._super();
            this.addTouchEventListener();
            this.disappearAction = this.createDisappearAction();
            this.disappearAction.retain();

        },

        oneExit:function(){
            //cc.log("onExit");
            this.disappearAction.release();
            this._super();
        },


        addTouchEventListener:function(){
            this.touchListener = cc.EventListener.create({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,

                onTouchBegan:function(touch,event){
                    var pos = touch.getLocation();
                    var target = event.getCurrentTarget();
                    if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                            //cc.log("选中了一个精灵!");
                            target.removeTouchEventListener();
                            target.stopAllActions();


                            //在点击处添加加分特效
                            target.getParent().addScore(target.type, pos);



                            switch(target.type){
                                case SpriteTypes.BOOM:
                                    //播放音效
                                    if (effectStatus == BOOL.YES) {
                                        cc.audioEngine.playEffect(res.exp_effect);
                                    }

                                    //如果是炸弹，爆炸效果
                                    var acBoom = cc.scaleTo(1, 6);
                                    var ac2 = cc.fadeOut(1.3);
                                    target.runAction(cc.spawn(acBoom, ac2));

                                    var boomLight = new cc.Sprite('#boomlight1.png');
                                    boomLight.attr({
                                        x:pos.x,
                                        y:pos.y
                                    });
                                    target.getParent().addChild(boomLight,110);

                                    var acRot = cc.rotateTo(1,300);
                                    var ac2 = cc.fadeOut(1);
                                    var ac3 = cc.scaleTo(1,3)
                                    boomLight.runAction(cc.spawn(acRot, ac2,ac3));
                                    target.isTouched = true;
                                    //target.getParent().removeSushi();//移除boom

                                    target.getParent().removeBoomEffectedFood(pos);//移除boom以及影响的food

                                    break;
                                case SpriteTypes.GOLD:
                                    //播放音效
                                    if (effectStatus == BOOL.YES) {
                                        cc.audioEngine.playEffect(res.gold_effect);
                                    }
                                    //开始进行消失的动作
                                    var ac = target.disappearAction;
                                    var acFade = cc.fadeOut(0.28);
                                    target.runAction(cc.spawn(ac,acFade));

                                    var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function(){
                                            target.isTouched = true;
                                            target.getParent().removeSushi();
                                    },target) );
                                    target.runAction(seqAc);

                                    //bucket的动作
                                    target.getParent().doScale();

                                    break;
                                case SpriteTypes.FOOD:
                                    if (effectStatus == BOOL.YES) {
                                        cc.audioEngine.playEffect(res.food_effect);
                                    }

                                    //开始进行消失的动作
                                    var ac = target.disappearAction;
                                    var acFade = cc.fadeOut(0.28);
                                    target.runAction(cc.spawn(ac,acFade));

                                    var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function(){
                                            target.isTouched = true;
                                            target.getParent().removeSushi();
                                    },target) );
                                    target.runAction(seqAc);

                                    //bucket的动作
                                    target.getParent().doScale();
                                    break;


                            }








                            return true;
                    }
                    return false;
                }

            });

            cc.eventManager.addListener(this.touchListener, this);

        },




        createDisappearAction:function(){
            //var size = cc.winSize;
            var action =  cc.moveTo(0.3, cc.p(0, 0));

            return action;
        },


        removeTouchEventListener:function(){
            cc.eventManager.removeListener(this.touchListener);
        }
});