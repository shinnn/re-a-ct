var ctx = new AudioContext();

var panner;
var bufferLoader;
var analyzer;
var processor;

var timeoutId = false;
var noteTime = 0;
var startTime = 0;
var createStart = false;

//BGM
var bgloop = new Audio();
var playlist = [bgloop];

var animaX = 0, animaY = 0;

//効果音の音量
var seVolume = 1;

//id = 'container' のDIV。 要素の挿入でしばしば使うためキャッシュしておく
var parentElm;

var maxLevel = 10;
var colorOfLevel = [
  '#000AEB',
  '#5F00EB',
  '#8900EB',
  '#C500EB',
  '#EB00CC',
  '#EB006B',
  '#EB0038',
  '#EB4F00',
  '#EBA300',
  '#EBD300',
  '#FFFFFF'
];

var src;

$.ajax({
  url: 'audio/data-json/src.json',
  dataType: 'json',
  async: false,
  success: function(data) {
    src = data;
  }
});

$(function() {
  // フルスクリーン
  Mousetrap.bind(['f', 'F'], screenfull.request);
  
  analyzer = ctx.createAnalyser();
  analyzer.smoothingTimeConstant = 0.85;
  analyzer.connect(ctx.destination);
  
  panner = ctx.createPanner();
  panner.refDistance = 0.1;
  panner.rolloffFactor = 0.05;
  panner.connect(analyzer);
  panner.panningModel = 0;
  panner.distanceModel = 0;
  
  parentElm = document.getElementById('container');
  
  var fileFormat, fileBitRate;
	
  if (isMobile.any) {
    if (audioSupportLevel('mp4', 'mp4a.40.5') > 0) {
      fileFormat = 'm4a';
    }
  
  } else if (location.hostname === 'localhost') {
    fileFormat = 'wav';

  } else {
    if (audioSupportLevel('mp4', 'mp4a.40.5') >= audioSupportLevel('webm', 'vorbis')) {
      fileFormat = 'm4a';

    } else if (audioSupportLevel('webm', 'vorbis') >= audioSupportLevel('ogg', 'vorbis')) {
        fileFormat = 'webm';
      
    } else {
      fileFormat = 'ogg';
    }
  }
  
  console.log(fileFormat + ' mode');
  
  var audioPath = [
    'beat',
    'piano',
    'piano2',
    'pad',
    'beat0',
    'beat1',
    'beat2',
    'beat3',
    'beat4',
    'beat5',
    'beat6',
    'beat7',
    'beat8',
    'beat9',
    'beat10'
  ];
    
  var preffix = src.cwd + src.format[fileFormat];
  var suffix = '.' + fileFormat;
  
  var path;
  $.getJSON(
    'audio/data-json/playlist.json',
    function (data) {
      var path = src.cwd +
                 src.tracks.replace('{format}', src.format[fileFormat]) +
                 data.tracks[0].fileName + '.' + fileFormat;
      bgloop.src = path;
    }
  );
  
  bgloop.src = path;
  bgloop.autoplay = false;
  bgloop.loop = false;
  
  var pointingEvent;
  if (parentElm.ontouchstart !== undefined) {
    pointingEvent = 'touchstart';
  } else if (parentElm.onmousedown !== undefined) {
    pointingEvent = 'mousedown';
  } else {
    pointingEvent = 'click';
  }
  
  //Load Audio Files
  bufferLoader = new BufferLoader(
    ctx, preffix + 'effects/', audioPath, fileFormat, bufferLoaderCallback
  );
  bufferLoader.load();
  
  function bufferLoaderCallback() {
    console.log('finish load.');
    
    //click にバインドするより操作性が高い
    $(parentElm).on(pointingEvent, null, function(e) {
      if(e.button !== undefined && e.button !== 0){
        return;
      }
  
      if (timeoutId === false) {
        bgloop.play();
        startTime = ctx.currentTime - noteTime;
        schedule();
      }
  
      createStart = true;
      animaX = e.pageX || e.originalEvent.pageX;
      animaY = e.pageY || e.originalEvent.pageY;
    });
    
    //SPACE key binding
    Mousetrap.bind('space', pauseBGloop);
    
    function pauseBGloop(keyboardEvent) {
      if (keyboardEvent && keyboardEvent.preventDefault) {
        keyboardEvent.preventDefault();
      }
      if (timeoutId === false) {
        bgloop.play();
        startTime = ctx.currentTime - noteTime;
        schedule();
      } else {
        bgloop.pause();
        clearTimeout(timeoutId);
        timeoutId = false;
      }
    }
    
    // タブがアクティブで無くなった場合、一時停止する
    // https://developers.google.com/chrome/whitepapers/pagevisibility
    document.addEventListener('webkitvisibilitychange', handleVisibilityChange, false);
    function handleVisibilityChange() {
      if (document.webkitHidden) {
        bgloop.pause();
        clearTimeout(timeoutId);
        timeoutId = false;
      } else {
        bgloop.play();
        startTime = ctx.currentTime - noteTime;
        schedule();
      }
    }
  }
  
  //m key binding
  // http://yuiblog.com/blog/2008/07/22/non-blocking-scripts/
  var ss = document.createElement('link');
  ss.href = 'debug/css/rect.css';
  ss.rel = 'stylesheet';
  ss.media = 'screen';

  function toggleRectStyle() {
    var head = document.getElementsByTagName('head')[0];
    var sheets = head.getElementsByTagName('link');
  
    if (sheets[sheets.length-1] === ss) {
      head.removeChild(ss);
    } else {
      // http://www.softel.co.jp/blogs/tech/archives/994
      head.insertBefore(ss, head.getElementsByTagName('script')[0]);
    }
    //document.getElementsByTagName('head')[0].appendChild(ss);
  }

  Mousetrap.bind(['m', 'M'], toggleRectStyle);
  Mousetrap.trigger('M');
});

function playBass(timing) {
  playSound(bufferLoader.bufferList[0], ctx.destination, timing);
}

function playBass0(timing) {
  playSound(bufferLoader.bufferList[4], ctx.destination, timing);
}

function playBass1(timing) {
  playSound(bufferLoader.bufferList[5], ctx.destination, timing);
}

function playBass2(timing) {
  playSound(bufferLoader.bufferList[6], ctx.destination, timing);
}

function playBass3(timing) {
  playSound(bufferLoader.bufferList[7], ctx.destination, timing);
}

function playBass4(timing) {
  playSound(bufferLoader.bufferList[8], ctx.destination, timing);
}

function playBass5(timing) {
  playSound(bufferLoader.bufferList[9], ctx.destination, timing);
}

function playBass6(timing) {
  playSound(bufferLoader.bufferList[10], ctx.destination, timing);
}

function playBass7(timing) {
  playSound(bufferLoader.bufferList[11], ctx.destination, timing);
}

function playBass8(timing) {
  playSound(bufferLoader.bufferList[12], ctx.destination, timing);
}

function playBass9(timing) {
  playSound(bufferLoader.bufferList[13], ctx.destination, timing);
}

function playBass10(timing) {
  playSound(bufferLoader.bufferList[14], ctx.destination, timing);
}

function playPiano(panX) {
  var src = playSound(bufferLoader.bufferList[1], panner, 0);
  createAnima(src.buffer.duration, animaX, animaY);
}

function playPiano2(timing) {
  //source[2]playSound(bufferLoader.bufferList[2], panner, timing);
  //source[2].buffer.gain = 0.5;
  //source[2].buffer.gain = 0;
}

function playPad(panX) {
  //  panner.setPosition(panX,2,2);
  //source[3] = playSound(bufferLoader.bufferList[3], ctx.destination, 0);
  //source[3].buffer.gain = 0.02;
}

function playSound(buffer, dest, timing) {
  var src = ctx.createBufferSource();
  src.buffer = buffer;
  src.buffer.gain = seVolume;
  src.loop = false;
  src.connect(analyzer);
  src.start(ctx.currentTime + timing);
  return src;
}

var time = 0;

var beatMap;
$.getJSON(
  'audio/data-json/_analysis.json',
  function(data) {
    var json = data.tracks['main/background'];

    beatMap = json.beat_times;    
    interval = (beatMap[1] - beatMap[0]) * 1000;
  }
);

//parameters
var movementRange = 500; //　一回の移動範囲

var frog, released, varXY, hit, hitObj;


//メインループ
function schedule() {
  var currentTime = ctx.currentTime - startTime;
  if (bgloop.restart && bgloop.ended) {
    if (document.getElementsByClassName('released').length > 0) {
      console.log('restart');
      bgloop.play();

    } else {
      //welcome or click here
    }
  }
  
  while (noteTime <= currentTime) {
    noteTime += interval * 0.001 * 0.1;
    drawSpectrum();

    if (time%5 === 0) {
      if (createStart === true) {
        panner.setPosition((animaX - window.innerWidth * 0.5) * 0.01, 0, 10);
        playPiano();
        createStart = false;
      }      
    }

    if(time%10 === 0){
      
      for(var i=1; i < beatMap.length; i++){
        if(beatMap[i] > currentTime){
          interval = (beatMap[i] - beatMap[i-1]) * 1000;
          hitInterval = interval * 0.001 * 1/12 * 6;
          break;
        }
      }
            
      released = document.getElementsByClassName('released');

      frog = document.getElementsByClassName('frog');
      hit = 0;
      
      var elm, obj, level, varX, varY;
      var inW = window.innerWidth, inH = window.innerHeight;
      //each method start
      for(i=0, len = released.length; i < len; i++){
        var current = i + Math.round(Math.random());
        elm = released[i];
        obj = $(elm);
        level = elm.dataset.level;

        varX = Math.floor((Math.random() - 0.5) * movementRange);
        varY = Math.floor((Math.random() - 0.5) * movementRange);
        varXY = (Math.abs(varX) + Math.abs(varY)) * 1.5 + 100;
        
        if(level === 10){
          varX = varX * 1.5 + 50;
          varY = varY * 1.5 + 50;
        }
        
        //画面外のオブジェクトの早期消去
        if(parseFloat(elm.style.left) < 0 || inW < parseFloat(elm.style.left) ||
        parseFloat(elm.style.top) < 0 || inH < parseFloat(elm.style.top)){
          elm.style.opacity = elm.style.opacity - 0.1;
        }

        // 生存判定
        var opc = parseFloat(elm.style.opacity);
        if(opc <= 0.05){
          parentElm.removeChild(elm); //$.fn.remove よりも高速
          len--;
          i--;
        }
        
        //TODO: jQuery Collision は重いので別のを
        //追記: 重さは別の原因がある？
                
        hitObj = obj.collision(frog).not(elm);
        if (hitObj.length > 0) {
          if (level !== 10) {
            if (level === undefined) {
              elm.dataset.level = 0;
            } else {
              elm.dataset.level++;
              level = Number(elm.dataset.level);
            }
          }
          
          elm.style.opacity = opc + 0.2 + 0.1 * (10 - level); // opacity は 0 を超えないのでmax()は不要
          elm.style.webkitAnimation = 'none';
          restartAnimation(elm);
          
          if(level === undefined){
            playBass(hitInterval * hit);
          }else{
            switch(level){
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
          hit++;
        }
        
        // アニメーション
        if(Math.round(Math.random() + 0.3) === 1){
          obj.transition(
            {
              left: '+=' + varX,
              top: '+=' + varY,
              opacity: '-=' + 0.0000125 * Math.pow(len, 3),
              rotate: Math.atan2(varX, -varY) * 180 / Math.PI + 'deg'
            },
            interval - 1
          );
        }
                
        //playPad(/* (off.left-$(document).width()*0.5)*0.01 + 5 */);
      }
      $('.ripple:gt(' + (len*2 <= 15? len*2: 15) + ')').remove();
    }

    if(time%20 === 0){
      //playBass();
      time = 0;
    }
    
    time++;
  }
  timeoutId = setTimeout(function(){ schedule(); }, 4);
}


var restartAnimation = (function(){
  var domAnimation = 'animation';
  _st = document.createElement('div').style;
  if(_st.webkitAnimation !== undefined){
    domAnimation = 'webkitAnimation';
  }else if(_st.mozAnimation !== undefined){
    domAnimation = 'webkitAnimation';
  }
  
  var _reset = function(elm){
    elm.style[domAnimation] = '';

    //波紋の描画
    var ripple = document.createElement('div');
    var rippleStyle = ripple.style;

    ripple.className = 'ripple';

    rippleStyle.width = varXY + 'px';
    rippleStyle.height = varXY + 'px';
    rippleStyle.borderRadius = varXY + 'px';
    rippleStyle.left = (parseFloat(elm.style.left) + (elm.offsetWidth - varXY) * 0.5) + 'px';
    rippleStyle.top = (parseFloat(elm.style.top) + (elm.offsetHeight - varXY) * 0.5) + 'px';
    rippleStyle[domAnimation + 'Duration'] = hit * hitInterval + 's';

    rippleStyle.borderColor = colorOfLevel[elm.dataset.level];

    parentElm.insertBefore(ripple, parentElm.childNodes[0]);
  };
  
  return function(){
    arguments[0].style[domAnimation] = 'none';
    setTimeout(_reset, 4/* + hit * hitInterval */, arguments[0]);
  };

}());

// Visualize

function createAnima(duration) {
  var initX = Math.floor(Math.random() * window.innerWidth);
  var initY = Math.random() < 0.5? -30: window.innerHeight;
  
  var frog = document.createElement('div');
  frog.className = 'frog';
  // 眼の描画
  if (frog.textContent !== undefined) {
    frog.textContent = 'o o';
  } else {
    frog.innerText = 'o o';
  }
  frog.style.left = initX + 'px';
  frog.style.top = initY + 'px';
  if (isMobile.any) {
    frog.style.boxShadow = 'none';
  }
  $(frog).animaMove(animaX, animaY, duration * 1000);
  parentElm.insertBefore(frog, parentElm.childNodes[0]);
}

$.fn.animaMove = function(x, y, duration) {
  var $this = $(this);
  $this.animate({
    left: x,
    top: y,
    opacity: '1'
  }, interval, function() {
    //playPiano2();
    $this.transition({left: '-=100', top: '+=100'}, interval, function() {
      //playPiano2();
      $this.transition({left: '+=100', top: '+=100'}, interval);
      $this.addClass('released');
    });
  });
};

var canvas, canvasCtx, canvasWidth, canvasHeight, bar_width;

$(function() {
  canvas = document.getElementById('waveform');
  canvasCtx = canvas.getContext('2d');
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  bar_width = 10;
});

function drawSpectrum(){
  canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  var freqByteData = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(freqByteData);

  var barCount = Math.round(canvasWidth / bar_width);
  for (var i = 0; i < barCount; i++) {
    var magnitude = freqByteData[i];
    // some values need adjusting to fit on the canvas
    canvasCtx.fillRect(bar_width * i, canvasHeight, bar_width - 2, -magnitude + 60);
  }
}

//User Interfaces

$(function() {
  //ポーズボタン
  var controlPause = document.getElementById('track-control-pause');
  
  //ポーズボタンのクラスの入れ替え
  function toggleControlClass(removeStr, addStr){
    var elmClassList = controlPause.classList;
    elmClassList.remove(removeStr);
    elmClassList.add(addStr);
  }
  
  bgloop.addEventListener('pause', function(){
    toggleControlClass('icon-pause', 'icon-play');
  }, false);
  bgloop.addEventListener('play', function(){
    toggleControlClass('icon-play', 'icon-pause');
  }, false);
  
  bgloop.addEventListener('loadeddata', function(){
    toggleControlClass('icon-pause', 'icon-play');
    
    var footer = document.getElementsByTagName('footer')[0];
    $(footer).animate({'bottom': 0}, 500);
    
    //カーソルの変更
    parentElm.style.cursor = 'url(img/cursor.png), crosshair';
  }, false);
  
  controlPause.addEventListener('click', function(){
     Mousetrap.trigger('space');
  }, false);
  
  // 前後
  if(playlist.length <= 1){
    $('#track-control-back, #track-control-next').css('display', 'none');
    $('#track-control')[0].style.width = '120px';
  }
  
  //リピートボタン
  var controlRepeat = document.getElementById('track-control-repeat');
  
  controlRepeat.addEventListener('click', toggleRepeatButton, false);
  
  function toggleRepeatButton(initialSetting){
    if(typeof initialSetting === 'boolean'){
      bgloop.restart = initialSetting;
    }else{
      bgloop.restart = !bgloop.restart;      
    }
    if(bgloop.restart){
      controlRepeat.classList.remove('disabled');
    }else{
      controlRepeat.classList.add('disabled');
    }
  }
  
  // 初期設定
  toggleRepeatButton(true);
  
  //Store frequently elements in variables
  var slider  = $('#volume .slider');
  var sliderValues = [0,0];


  var tooltip = $(document.getElementsByClassName('tooltip')); //Hide the Tooltip at first tooltip.hide();
  tooltip.hide();


  slider[0].volumeChange = function(intVal) {
    bgloop.volume = intVal * 0.01; // BGMの音量の設定(0.0 〜 1.0)
  };
  slider[1].volumeChange = function(intVal) {
    seVolume = intVal * 0.01; // BGMの音量の設定(0.0 〜 1.0)
  };
  
  //Call the Slider
  slider.each(function(index) {
    var maxValue = 100;
        
    $(this).slider({
      //Config
      range: 'min',
      min: 0,
      max: 100,
      value: maxValue,

      start: function(event, ui) {
        //tooltip.fadeIn('fast');
      },

      //Slider Event
      slide: function(event, ui){ // When the slider is sliding
        sliderValues[index] = ui.value; // $(this).slider('value') とは値が微妙に異なることに注意
        this.volumeChange(sliderValues[index]); //音量設定
      
        /*
        tooltip
        .css({
          'left': value
        })
        .text(ui.value);
        */
        
        var volumeStyle = document.getElementsByClassName('icon_volume')[index].style;

        if (sliderValues[index] <= maxValue * 0.05) {
          volumeStyle.backgroundPositionY = '0';
        } else if (sliderValues[index] <= maxValue * 0.25) {
          volumeStyle.backgroundPositionY = '-25px';
        } else if (sliderValues[index] <= maxValue * 0.75) {
          volumeStyle.backgroundPositionY = '-50px';
        } else {
          volumeStyle.backgroundPositionY = '-75px';
        }
      },

      stop: function(event, ui) {
        this.volumeChange($(this).slider('value')); //音量設定
        //tooltip.fadeOut('fast');
      }
    });
  }); // 'each' method END
  
  var timeSlider = $('#time-control .slider');
  var timeSliderMax = 500;

  var playbackTimeoutID = null;

  function finishSlide() {
    if (playbackTimeoutID !== null) {
      clearTimeout(playbackTimeoutID);
    }
    playbackTimeoutID = setTimeout(function() { updateTime(); }, 40);
  }
  
  function updateTime() {
    bgloop.currentTime = timeSlider.slider('value') / timeSliderMax * bgloop.duration;
  }
  
  timeSlider.slider({
    //Config
    range: 'min',
    min: 0,
    max: timeSliderMax,
    value: 0,

    start: function(event, ui) {
      //tooltip.fadeIn('fast');
    },
    
    //When the slider is sliding
    slide: function(event, ui) {
      bgloop.removeEventListener('timeupdate', bgTimeUpdate, false);
      finishSlide();
    },
    
    stop: function() {
      bgloop.addEventListener('timeupdate', bgTimeUpdate, false);
    }
  });
  
  var counterNodes = document.getElementById('time-counter').children;
  
  var durationMMSS;
  
  // Get Duration
  bgloop.addEventListener('loadeddata', function() {
    var remainingMMSS = toHHMMSS(Math.floor(bgloop.duration - bgloop.currentTime), 1);
    counterNodes[1].innerText = remainingMMSS;
  }, false);

  bgloop.addEventListener('timeupdate', bgTimeUpdate, false);

  function bgTimeUpdate() {
    timeSlider.slider(
      'value',
      bgloop.currentTime / bgloop.duration * timeSliderMax
    );
    
    var currentMMSS = toHHMMSS(Math.floor(bgloop.currentTime), 1);
    if (counterNodes[0].innerText !== currentMMSS) {
      counterNodes[0].innerText = currentMMSS;
      
      if (typeof bgloop.duration === 'number') {
        var remainingMMSS = toHHMMSS(
          Math.floor(bgloop.duration - bgloop.currentTime),
          1
        );
        counterNodes[1].innerText = '- ' + remainingMMSS;
      }
    }
  }
  
  // http://stackoverflow.com/questions/6312993/
  function toHHMMSS(sec, divisionNumber) {
    var sec_numb    = parseInt(sec, 10);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);
    
    if (hours   < 10) {hours   = '0'+hours;}
    if (minutes < 10) {minutes = '0'+minutes;}
    if (seconds < 10) {seconds = '0'+seconds;}

    var resultString = '';
    if (divisionNumber === 2) {
      resultString = hours+':'+minutes+':'+seconds;
    } else if(divisionNumber === 1) {
      resultString = minutes+':'+seconds;
    } else {
      resultString = seconds;
    }
    
    return resultString;
  }
});
