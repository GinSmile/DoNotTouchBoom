var BoomSprite = cc.Sprite.extend({
        isTouched:false,
        touchListener:null,
        type: SpriteTypes.BOOM,
        onEnter:function(){
            this._super();
            this.addTouchEventListener();
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

                              target.getParent().removeBoomEffectedFood(pos);//移除boom以及影响的food


                            return true;
                    }
                    return false;
                }

            });

            cc.eventManager.addListener(this.touchListener, this);

        },



        removeTouchEventListener:function(){
            cc.eventManager.removeListener(this.touchListener);
        }
});

BoomSprite.createBoom = function(){
                       if(cc.pool.hasObject(BoomSprite)){
                           return cc.pool.getFromPool(BoomSprite);
                       }else{
                           return new BoomSprite('#boom.png');
                       }
                   }