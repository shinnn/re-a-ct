requirejs.config({
  enforceDefine: true,
  paths: {
    jquery: [
      '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min', // cdn
      '../bower_components/jquery/jquery.js'
    ],
    mousetrap: '../bower_components/mousetrap/mousetrap',
    screenfull: '../bower_components/screenfull/dist/screenfull.min',
    'jquery-collision': 'vendor/jquery-collision.min',
    'jquery-transform': 'vendor/jquery.transform',
    'jquery-ui-touch-punch-amd': '../bower_components/jquery-ui-touch-punch-amd/jquery.ui.touch-punch',
  }
});

require([
  'jquery',
	'mousetrap',
  'touch-punch',
  'jquery-collision',
  'jquery-transform'
], function($) {
  console.log('RequireJS');
});
