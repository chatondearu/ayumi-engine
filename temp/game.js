(function(window, undefined){

    var Game,
    //Core = new Core(window),
        document = window.document,
        location = window.location,
        navigator = window.navigator;


    Game = function(){
        var i = 0;
        Core.Handler.AddEvent(new Event('test',function(){
            if(i++<6)
                console.log('toto');
        }));
    };
    console.log(Core);

    window.Game = new Game();

})(window);

