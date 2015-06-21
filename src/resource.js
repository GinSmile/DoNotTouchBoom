var res = {

    bg_house : "res/bg/bg0.png",
    bg_desk : "res/bg/bg1.jpeg",
    bg_river : "res/bg/bg2.jpeg",
    bg_3 : "res/bg/bg3.jpeg",
    bg_4 : "res/bg/bg4.jpeg",
    bg_5 : "res/bg/bg5.jpeg",
    bg_6 : "res/bg/bg6.jpeg",


    menu_plist : "res/menu.plist",
    menu : "res/menu.png",


    food_plist : "res/foods.plist",
    food : "res/foods.png",

    Back_up:"res/Back-up.png",
    Back_down:"res/Back-down.png",


    //music
    music: 'res/sound/00041.ogg',
    //effect
    food_effect : 'res/sound/00004.ogg',
    gold_effect : 'res/sound/00009.ogg',
    throw_effect : 'res/sound/5054.wav',
    exp_effect :'res/sound/4737.ogg'



};

var g_resources = [
    //font
    {
        type:"font",
        name:"Herculanum",
        srcs:["res/font/Herculanum.ttf"]
    },

    {
            type:"font",
            name:"wawa",
            srcs:["res/font/WawaSC-Regular.otf"]
    }
];
for (var i in res) {
    g_resources.push(res[i]);
}