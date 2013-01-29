var ctx;
var panner;
var bufferLoader;

var timeoutId = false;
var noteTime = 0;
var startTime = 0;
var createStart = false;

var bgloop = new Audio('audio/background.wav');
bgloop.autoplay = false;
bgloop.loop = false;

var animaX = 0;
var animaY = 0;

var initX=0;
var initY=0;

var source = new Array();

var classLevel = new Array(11); // 最終が revX なら X+1 で作成

$(function(){
  try{
    ctx = new webkitAudioContext();
  }catch(e){
    alert('Web Audio API is not supported in this browser');
  }
  
  for(var i=0; i < classLevel.length; i++){
    classLevel[i] = "rev" + i;
  }

  var audioPath = [
    "beat.wav",
    "piano.wav",
    "piano2.wav",
    "pad.wav",
    "beat0.wav",
    "beat1.wav",
    "beat2.wav",
    "beat3.wav",
    "beat4.wav",
    "beat5.wav",
    "beat6.wav",
    "beat7.wav",
    "beat8.wav",
    "beat9.wav",
    "beat10.wav",
  ];
	
  for(var i=0; i < audioPath.length; i++){
    audioPath[i] = "audio/" + audioPath[i];
  }
	
  //Load Audio Files
  bufferLoader = new BufferLoader(ctx, audioPath, function(){
    console.log("finish load.");
		
    panner = ctx.createPanner();	
    panner.refDistance = 0.1;
    panner.rolloffFactor = 0.05;
    panner.connect(ctx.destination);
    panner.panningModel = 0;
    panner.distanceModel = 0;
		
    //SPACE key binding
    Mousetrap.bind('space', function(e){
      e.preventDefault();
      if(timeoutId === false){
				bgloop.play();
        startTime = ctx.currentTime - noteTime;
        schedule();
      }else{
        bgloop.pause();
        clearTimeout(timeoutId);
        timeoutId = false;
      }
    });
    
    //m key binding
    // http://yuiblog.com/blog/2008/07/22/non-blocking-scripts/
    var ss = document.createElement('link');
      ss.href = 'css/rect.css';
      ss.rel = 'stylesheet';
      ss.media = 'screen';
    Mousetrap.bind(['m', 'M'], function(){
      var h = document.getElementsByTagName('head')[0];
      var sheets = h.getElementsByTagName('link');
      if(sheets[sheets.length-1] === ss){
        h.removeChild(ss);
        console.log('remove style');
      }else{
        // http://www.softel.co.jp/blogs/tech/archives/994
        h.insertBefore(ss, h.getElementsByTagName('script')[0]);
        console.log('append style');
      }
      //document.getElementsByTagName('head')[0].appendChild(ss);
    });
    
		/*
    bgloop.addEventListener('ended', function(){
      //console.log("end at " + ctx.currentTime);
      //clearTimeout(timeoutId);
      bgloop.currentTime = 0;
      //bgloop.play();
    });

    bgloop.addEventListener('playing', function(){
      console.log("start at " + ctx.currentTime);
      startTime = ctx.currentTime - noteTime;
      schedule();
    });
    */
  });
  bufferLoader.load();
	
  $.fn.animaMove = function(x, y, duration){
    var obj = $(this);
    var animaTimer;
    obj.animate({left: '+='+x, top: '+='+y, opacity: '1'}, interval, function(){
      //playPiano2();
      obj.animate({left: '-=100', top: '+=100'}, interval, function(){
        //playPiano2();
        obj.animate({left: '+=100', top: '+=100'}, interval);
        obj.addClass('released');
      });
    });
  }

  //click にバインドするより操作性が高い
  $(document.getElementById('container')).mousedown(function(e){
    if(e.button !== 0){
      return;
    }
    
    if(timeoutId === false){		
			bgloop.play();        
      startTime = ctx.currentTime - noteTime;
      schedule();
    }
    
    createStart = true;
    animaX = e.clientX;
    animaY = e.clientY;
  });
  /*
  $(document).mouseup(function(e){
    createStart = false;
  });
  */
});

function autoStop(){
  
}

function playBass(timing){
  console.log("bass " + timing);
  source[0] = playSound(bufferLoader.bufferList[0], ctx.destination, timing);
}

function playBass0(timing){
  console.log("bass " + timing);
  source[4] = playSound(bufferLoader.bufferList[4], ctx.destination, timing);
}

function playBass1(timing){
  console.log("bass " + timing);
  source[5] = playSound(bufferLoader.bufferList[5], ctx.destination, timing);
}

function playBass2(timing){
  console.log("bass " + timing);
  source[6] = playSound(bufferLoader.bufferList[6], ctx.destination, timing);
}

function playBass3(timing){
  console.log("bass " + timing);
  source[7] = playSound(bufferLoader.bufferList[7], ctx.destination, timing);
}

function playBass4(timing){
  console.log("bass " + timing);
  source[8] = playSound(bufferLoader.bufferList[8], ctx.destination, timing);
}

function playBass5(timing){
  console.log("bass " + timing);
  source[9] = playSound(bufferLoader.bufferList[9], ctx.destination, timing);
}

function playBass6(timing){
  console.log("bass " + timing);
  source[10] = playSound(bufferLoader.bufferList[10], ctx.destination, timing);
}

function playBass7(timing){
  console.log("bass " + timing);
  source[11] = playSound(bufferLoader.bufferList[11], ctx.destination, timing);
}

function playBass8(timing){
  console.log("bass " + timing);
  source[12] = playSound(bufferLoader.bufferList[12], ctx.destination, timing);
}

function playBass9(timing){
  console.log("bass " + timing);
  source[13] = playSound(bufferLoader.bufferList[13], ctx.destination, timing);
}

function playBass10(timing){
  console.log("bass " + timing);
  source[14] = playSound(bufferLoader.bufferList[14], ctx.destination, timing);
}

function playPiano(panX){
  source[1] = playSound(bufferLoader.bufferList[1], panner, 0);
  createAnima(source[1].buffer.duration, animaX, animaY);
  //source[1].buffer.gain = 0;
}

function playPiano2(timing){
  //source[2] = playSound(bufferLoader.bufferList[2], panner, timing);
  //source[2].buffer.gain = 0.5;
  //source[2].buffer.gain = 0;
}

function playPad(panX){
  //	panner.setPosition(panX,2,2);
  //source[3] = playSound(bufferLoader.bufferList[3], ctx.destination, 0);
  //source[3].buffer.gain = 0.02;
}

function playSound(buffer, dest, timing){
  var src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = false;
  src.connect(dest);
  src.start(ctx.currentTime + timing);
  //src.stop(ctx.currentTime + buffer.duration);
  return src;
}

function levelCheck(cl){ //tmp
  if(cl.contains(classLevel[classLevel.length-1]) === false){
    for(var j=0; j < classLevel.length-1; j++){
      if(cl.contains(classLevel[j])){
        cl.add(classLevel[j+1]);
        cl.remove(classLevel[j]);
        break;
      }
    }
    if(j === classLevel.length-1){
      cl.add(classLevel[0]);            
    }
  }else{
    console.log('final level');
  }
 
}

var time = 0;
var interval = 542; //542;
var hitInterval = interval * 0.00048 // 0.001 * 1/12 * 4
var frog, released, varXY, hit, hitObj;
function schedule(){
  var currentTime = ctx.currentTime - startTime;
  var parent = document.getElementById('container');
  if(bgloop.ended === true){
    if(document.getElementsByClassName('released').length > 0){
      console.log("restart");
      bgloop.play();
    }else{
      //welcome
    }
  }
  while(noteTime <= currentTime){
    noteTime += (interval*0.0001);
    if(time%5 == 0){
      
      if(createStart === true){
        panner.setPosition((animaX - window.innerWidth * 0.5) * 0.01, 0, 10);
        playPiano();
        createStart = false;
      }
    }

    if(time%10 === 0){
      released = document.getElementsByClassName('released');
      var len = released.length;
      //参考 http://nanto.asablo.jp/blog/2006/02/21/262269
      //forループ外でlengthプロパティを呼び出し、パフォーマンス向上

      $(released).css('opacity', '-=' + 0.000025 * len * len * len);
      frog = document.getElementsByClassName('frog');
      hit = 0;
			
      var i, elm, obj, varX, varY;
      var inW = window.innerWidth;
      var inH = window.innerHeight;
      //each method start
      for(i=0; i < len; i++){
        var current = i + Math.round(Math.random());
        elm = released[i], obj = $(elm);
        var cl = elm.classList;

        varX = Math.floor((Math.random()-0.5)*400);
        varY = Math.floor((Math.random()-0.5)*400);
        varXY = (Math.abs(varX) + Math.abs(varY)) * 1.5 + 100;
        
        if(cl.contains(classLevel[classLevel.length-1])){
          varX = varX * 1.5 + 50;
          varY = varY * 1.5 + 50;
        }
        
        
        //画面外のオブジェクトの早期消去
        if(parseFloat(elm.style.left) < 0 || inW < parseFloat(elm.style.left) || parseFloat(elm.style.top) < 0 || inH < parseFloat(elm.style.top)){
          elm.style.opacity = elm.style.opacity - 0.1;
          console.log('out');
        }

        // 生存判定        
        var opc = parseFloat(elm.style.opacity);
        if(opc <= 0.05){
          parent.removeChild(elm); //$.fn.remove の高速化
          len--;
          i--;
          console.log("died..." + len);
        }
        
        //TODO: jQuery Collision は重いので別のを
        //追記: 重さは別の原因がある？
                
        hitObj = obj.collision(frog).not(elm);
        if(hitObj.length > 0){
          var j = classLevel.length-1;
          if(cl.contains(classLevel[j]) === false){
            for(j=0; j < classLevel.length-1; j++){
              if(cl.contains(classLevel[j])){
                cl.add(classLevel[j+1]);
                cl.remove(classLevel[j]);
                break;
              }
            }
            if(j === classLevel.length-1){
              j = false;
              cl.add(classLevel[0]);
            }
          }else{
            console.log('final level');
          }
          
          elm.style.opacity = opc + 0.5; // opacity は 0 を超えないのでmax()は不要
          elm.style.webkitAnimation = 'none';
          setTimeout(restartAnimation, 4/* + hit * hitInterval */, elm);
          
          if(j === false){
            playBass(hitInterval * hit);
          }else{
            switch(j){
              case 0:
              playBass0(hitInterval * hit);
              break;
              case 1:
              playBass1(hitInterval * hit);
              break;
              case 2:
              playBass2(hitInterval * hit);
              break;
              case 3:
              playBass3(hitInterval * hit);
              break;
              case 4:
              playBass4(hitInterval * hit);
              break;
              case 5:
              playBass5(hitInterval * hit);
              break;
              case 6:
              playBass6(hitInterval * hit);
              break;
              case 7:
              playBass7(hitInterval * hit);
              break;
              case 8:
              playBass8(hitInterval * hit);
              break;
              case 9:
              playBass9(hitInterval * hit);
              break;
              case 10:
              playBass10(hitInterval * hit);
              break;
            }
          }
          for(var j=0; j < classLevel.length; j++){
            if(cl.contains(classLevel[j])){
              
              break;
            }
          }
          hit++;
        }
        
        if(Math.round(Math.random() + 0.3) === 1){
          obj.animate(
            {
              left: '+=' + varX,
              top: '+=' + varY,
              //opacity: '-=' + 0.005 * len,
              rotate: Math.atan2(varX, -varY) * 180 / Math.PI + 'deg',
            },
            interval - 1
          );
        }
                
        playPad(/* (off.left-$(document).width()*0.5)*0.01 + 5 */);
      };
      $(".ripple:gt(" + (len*2 <= 15? len*2: 15) + ")").remove();
      
      if(hit > 0){
        if('0' in source){
          //source[0].stop(ctx.currentTime);
        }
      }
    }

    if(time%20 === 0){
      //playBass();
      time = 0;
      if(source[3]){
        //source[3].disconnect(ctx.destination);
      }
    }
    
    time++;
  }
  timeoutId = setTimeout(function(){ schedule(); }, 4);
}

function restartAnimation(elm){
  elm.style.webkitAnimation = '';
  var parent = document.getElementById('container');
  
  var ripple = "<div class='ripple' style='"
  + "width:" + varXY + "px;"
  + "height:" + varXY + "px;"
  + "border-radius:" + varXY + "px;"
  + "left:" + (parseFloat(elm.style.left) + (elm.offsetWidth - varXY) * 0.5) + 'px;'
  + "top: " + (parseFloat(elm.style.top) + (elm.offsetHeight - varXY) * 0.5) + 'px;'
  + "-webkit-animation-duration:" + hit * hitInterval + 's;'
  + "'></div>";

  parent.insertBefore($(ripple).get(0), parent.childNodes[0]);
}

// Visualize

function createAnima(duration){
  initX = Math.floor(Math.random() * window.innerWidth);
  initY = Math.random() < 0.5? -30: window.innerHeight;
  var frog = $("<div class='frog' style='left: " +initX+ "px; top: " +initY+ "px'>o o</div>");
  frog.animaMove(animaX - initX, animaY - initY, duration * 1000);
  var parent = document.getElementById('container');
  parent.insertBefore(frog.get(0), parent.childNodes[0]);
}
