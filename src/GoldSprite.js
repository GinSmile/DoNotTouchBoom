var GoldSprite = cc.Sprite.extend({
        disappearAction:null,
        isTouched:false,
        touchListener:null,
        type: SpriteTypes.GOLD,
        onEnter:function(){
            this._super();
            this.addTouchEventListener();
            this.disappearAction = this.createDisappearAction();
        },

        unuse:function(){
            this.retain();
            this.setVisible(false);
        },

        reuse:function(){
            this.setVisible(true);
        },

        addTouchEventListener:function(){
            this.touchListener = cc.EventListener.create({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,

                onTouchBegan:function(touch,event){
                    var pos = touch.getLocation();
                    var target = event.getCurrentTarget();
                    if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                            target.removeTouchEventListener();
                            target.stopAllActions();

                            //在点击处添加加分特效
                            target.getParent().addScore(target.type, pos);

                             //播放音效
                            if (effectStatus == BOOL.YES) {
                                cc.audioEngine.playEffect(res.gold_effect);
                            }

                            //开始进行消失的动作
                            var ac =  cc.moveTo(0.3, cc.p(0, 0));
                            var acFade = cc.fadeOut(0.28);
                            var action = cc.spawn(ac,acFade);
                            target.runAction(action);

                            var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function(){
                                    target.isTouched = true;
                                    target.getParent().removeSushi();
                            },target) );
                            target.runAction(seqAc);

                            //bucket的动作
                            target.getParent().doScale();

                            return true;
                    }
                    return false;
                }

            });

            cc.eventManager.addListener(this.touchListener, this);

        },




        createDisappearAction:function(){
            //var size = cc.winSize;
            var ac =  cc.moveTo(0.3, cc.p(0, 0));
            var acFade = cc.fadeOut(0.28);
            var action = cc.spawn(ac,acFade);

            return action;
        },


        removeTouchEventListener:function(){
            cc.eventManager.removeListener(this.touchListener);
        }
});