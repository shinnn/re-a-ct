/*
 * Copyright (c) 2012-2013 Shinnosuke Watanabe
 * https://github.com/shinnn
*/

//TODO: ref: https://developer.mozilla.org/ja/docs/DOM/Using_full-screen_mode
$(function(){
  function toggleFullscreen(){
    if(document.webkitIsFullScreen){
      document.webkitCancelFullScreen();
    }else{
      var body = document.getElementsByTagName('body')[0];
      if(body.webkitRequestFullScreen){
        console.log("\"webkitRequestFullScreen()\"");
        body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }else if(body.mozRequestFullScreen){
        console.log("\"mozRequestFullScreen()\"");
        body.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }else{
        console.log("\"requestFullScreen()\"");
        body.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
  }

  Mousetrap.bind(['f', 'F'], toggleFullscreen);
});
