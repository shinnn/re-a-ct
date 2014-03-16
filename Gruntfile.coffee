module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)
  
  BIN = "#{ process.cwd() }/node_modules/.bin/"
  
  DEST = 'site/'
  
  rawAudioCwd = 'audio/raw/'
  
  # alias
  cfg = grunt.config
  
  # トラック解析結果を格納するオブジェクト
  analysis =
    cwd: 'audio/raw/tracks'
    tracks: {}
  
  _aubiotrackCallback = (err, stdout, stderr, cb) ->
    beatArray = stdout.split '\n'
    beatArray.pop()
    
    for beat, i in beatArray
      beatArray[i] = parseFloat beat, 10
    
    # aubio が最初の方のビートを検知しない不具合への対処
    preBeat = beatArray[1] - beatArray[0]
    beatPoint = beatArray[1]
    
    while beatPoint >= 0
      beatArray.unshift beatPoint
      beatPoint -= preBeat
    
    analysis.tracks[cfg 'trackPath'] = { beat_times: beatArray }
    cb()

  grunt.registerTask '_writeAnalysis', ->
    json = JSON.stringify analysis, null, 2
    grunt.file.write 'audio/data-json/_analysis.json', json
    grunt.task.run 'copy:data'
    console.log "All Tracks Analysed."
    
  grunt.registerTask 'analysis', 'Analysing audio', ->
    opt = { cwd: analysis.cwd }
    tracks = grunt.file.expand opt, '**/*.wav'
    
    for track in tracks
      grunt.task.run 'aubiotrack:' + track
    grunt.task.run '_writeAnalysis'
  
  grunt.registerTask 'aubiotrack', (path) ->
    cfg 'trackPath', path.replace '.wav', ''
    console.log "Analysing #{ cfg('trackPath') }.wav..."
    grunt.task.run 'shell:aubiotrack'
  
  grunt.registerTask 'playlist', ->
    #tmp
  
  grunt.registerTask 'encode', ->
    grunt.task.run 'copy:audio'
    opt = { cwd: 'audio/raw/' }
    tracks = grunt.file.expand opt, '**/*.wav'
    for track in tracks
      grunt.task.run '_ffmpeg:' + track

  grunt.registerTask '_ffmpeg', (path) ->
    cfg 'ffmpegPath', path.replace '.wav', ''
    console.log "Encoding #{ cfg('ffmpegPath') }.wav..."
    grunt.task.run 'shell:ffmpeg'
  
  # grut-vendor-copy の際のオプション
  # destType 引数はオーディオファイルフォーマット
  copyOpt = (destType) ->
    expand: true
    cwd: 'audio/raw/'
    src: ['**']
    dest: "#{ DEST }audio/compressed/#{ destType }/"
    filter: 'isDirectory'
  
  grunt.initConfig
    # オーディオ解析のためのファイルパスの設定
    trackPath: ''
    ffmpegPath: ''
    
    # オーディオ関連の処理
    shell:
      aubiotrack:
        command: "aubiotrack -i
                   #{ rawAudioCwd }tracks/<%= trackPath %>.wav -O complexdomain"
        options:
          callback: _aubiotrackCallback
      ffmpeg:
        # -y: Overwrite output files.
        command: [
          # M4A
          "afconvert #{ rawAudioCwd }<%= ffmpegPath %>.wav
            -d aac -f m4af -u pgcm 2 -b 256000 -q 127 -s 2
            #{ DEST }audio/compressed/m4a/<%= ffmpegPath %>.m4a"
          # WebM
          "ffmpeg -y -i #{ rawAudioCwd }<%= ffmpegPath %>.wav
            -vn -codec:a libvorbis -aq 1M
            #{ DEST }audio/compressed/webm/<%= ffmpegPath %>.webm"
          # Ogg
          "ffmpeg -y -i #{ rawAudioCwd }<%= ffmpegPath %>.wav
            -vn -codec:a libvorbis -qscale:a 10
            #{ DEST }audio/compressed/ogg/<%= ffmpegPath %>.ogg"
        ].join '&&'
        options:
          callback: (err, stdout, stderr, cb) ->
            console.warn stderr if stderr
            console.log stdout if stdout
            cb()
      
      coffeelint:
        command:
          "#{ BIN }coffeelint Gruntfile.coffee"
        options:
          stdout: true
    
    bower:
      options:
        targetDir: "#{ DEST }.tmp/bower_exports/"
        cleanTargetDir: true
      install:
        options:
          bowerOptions:
            production: true
    
    lodash:
      options:
        modifier: 'legacy'
        #include: []
        flags: ['--minify']
      custom:
        dest: 'js/vendor/lodash.gruntbuild.js'
    
    copy:
      audio:
        files: [
          copyOpt 'webm'
          copyOpt 'm4a'
          copyOpt 'ogg'
          {
            expand: true
            cwd: 'audio/raw/'
            src: ['**']
            dest: "#{ DEST }audio/raw/"
          }
        ]
      data:
        files: [
          expand: true
          cwd: 'audio/data-json/'
          src: ['**']
          dest: "#{ DEST }audio/data-json/"
        ]
      public:
        files: [
          expand: true
          cwd: 'public/'
          src: ['**', '!**/{.DS_Store,Thumbs.db}']
          dest: DEST
          dot: true
        ]
      bower:
        files: [
          expand: true
          cwd: '<%= bower.options.targetDir %>/public'
          src: ['**', '!**/{.DS_Store,Thumbs.db}']
          dest: "#{ DEST }bower_components"
          dot: true
        ]
      bower_debug:
        files: [
          expand: true
          cwd: '<%= bower.options.targetDir %>/debug'
          src: ['**', '!**/{.DS_Store,Thumbs.db}']
          dest: "#{ DEST }/debug/bower_components"
          dot: true
        ]
    
    uglify:
      options:
        preserveComments: require 'uglify-save-license'
      main:
        options:
          banner: "/*! Copyright (c) 2013 -2014 Shinnosuke Watanabe | MIT License */\n"
          compress:
            global_defs:
              DEBUG: false
            dead_code: true
        src: '<%= coffee.dist.dest %>'
        dest: '<%= uglify.main.src %>'
      bower:
        options:
          compress:
            # For /*cc_on!*/ comments
            dead_code: false
        files: [
          expand: true
          cwd: '<%= bower.options.targetDir %>'
          src: [
            '{,*/,*/*/}*.js',
            '!{,*/,*/*/}*{.min,-min}.js', '!debug/{,*/}*.js'
          ]
          dest: '<%= bower.options.targetDir %>'
        ]
    
    compass:
      options:
        sassDir: 'scss'
        cssDir: "#{ DEST }css"
        environment: 'development'
        outputStyle: 'expand'
      dist: {}
    
    autoprefixer:
      dist:
        src: '<%= compass.options.cssDir%>{,*/}*.css'
    
    cssmin:
      options:
        report: 'min'
      dist:
        files: [
          expand: true
          cwd: '<%= compass.options.cssDir%>'
          src: ['{,*/}*.css']
          dest: "#{ DEST }css/"
        ]
    
    concat:
      main:
        src: ['js/main/*.js']
        dest: "#{ DEST }js/re-a-ct.js"
      vendor:
        src: [
          "js/vendor/{,*/}*.js"
          '<%= bower.options.targetDir %>{,*/,*/*/}*.js'
          '!<%= bower.options.targetDir %>{public,ie,debug}{,*/,*/*/}*.js'
        ]
        dest: "#{ DEST }js/vendor.js"
    
    jade:
      dist:
        src: ['jade/index.jade']
        dest: "#{ DEST }index.html"
    
    connect:
      options:
        livereload: 35729
        port: 8000
      site:
        options:
          base: DEST

    watch:
      options:
        livereload: '<%= connect.options.livereload %>'

      compass:
        files: ['scss/*.scss']
        tasks: ['compass', 'autoprefixer', 'cssmin']
      js_main:
        files: ['js/main/*.js']
        tasks: ['concat:main']
      js_vendor:
        files: ['js/vendor/*.js']
        tasks: ['concat:vendor']
      coffeelint:
        files: ['Gruntfile.coffee']
        tasks: ['shell:coffeelint']
      jade:
        files: ['jade/**/*.jade']
        tasks: ['jade']
      html:
        files: ["#{ DEST }*.html"]
    
    'gh-pages':
      site:
        options:
          base: DEST
          branch: 'gh-pages'
          message: 'auto commit by grunt-gh-pages'
          user:
            name: 'shinnn'
        src: '**/*'
  
  grunt.registerTask 'default', [
    'bower'
    'analysis'
    'encode'
    'compass', 'autoprefixer', 'cssmin'
    'concat', 'shell:coffeelint'
    'jade'
    'copy:public'
    'connect', 'watch'
  ]
