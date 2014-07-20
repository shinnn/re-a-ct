module.exports = (grunt) ->
  'use strict'

  require('jit-grunt') grunt, {
    useminPrepare: 'grunt-usemin'
    es6transpiler: 'grunt-es6-transpiler'
  }
  
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
    
    analysis.tracks[cfg 'trackPath'] = {beat_times: beatArray}
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
                  #{ rawAudioCwd }tracks/<%= trackPath %>.wav"
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
      
      coffeelint:
        command:
          "#{ BIN }coffeelint Gruntfile.coffee"
    
    clean:
      site: DEST
    
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
          {
            expand: true
            cwd: 'public/'
            src: ['**', '!**/{.DS_Store,Thumbs.db}']
            dest: DEST
            dot: true
          }
          {
            src: 'bower_components/jquery/dist/jquery.js'
            dest: "#{ DEST }/js/jquery.js"
          }
        ]
        
    wiredep:
      dev:
        src: ['<%= jade.dev.dest %>']
        devDependencies: true
        exclude: ['/jquery\/dist/']
      dist:
        src: ['<%= jade.dist.dest %>']
        exclude: ['/jquery\/dist/']
    
    useminPrepare:
      options:
        dest: DEST
      html: ['<%= jade.dist.dest %>']

    usemin:
      html: '<%= jade.dist.dest %>'
    
    jshint:
      options:
        jshintrc: '.jshintrc'
      all: ['js/main/*.js']
    
    es6transpiler:
      options:
        environment: ['browser', 'jquery']
        disallowUnknownReferences: false
      main:
        files: [
          expand: true
          cwd: 'js/main/'
          src: ['*.js']
          dest: "#{ DEST }debug/js/"
          dot: true
        ]
    
    uglify:
      options:
        preserveComments: require 'uglify-save-license'
        compress:
          global_defs:
            DEBUG: false
          dead_code: true
    
    compass:
      options:
        sassDir: 'scss'
        cssDir: "#{ DEST }debug/css"
        environment: 'development'
        outputStyle: 'expand'
      dist: {}
    
    autoprefixer:
      dist:
        src: '<%= compass.options.cssDir%>{,*/}*.css'
    
    cssmin:
      options:
        report: 'min'
    
    jade:
      options:
        pretty: true
      dev:
        options:
          data:
            DEBUG: true
        src: ['jade/index.jade']
        dest: "#{ DEST }debug.html"
      dist:
        src: ['jade/index.jade']
        dest: "#{ DEST }index.html"
    
    connect:
      options:
        livereload: 35729
        port: 8000
        middleware: (connect) ->
          bowerFiles = connect.static './bower_components'
          [
            connect().use '/bower_components', bowerFiles
            connect.static DEST
          ]
      site:
        options:
          base: DEST

    watch:
      options:
        livereload: '<%= connect.options.livereload %>'

      compass:
        files: ['scss/*.scss']
        tasks: ['buildCSS', 'postBuildHTML']
      js_main:
        files: ['js/main/*.js']
        tasks: ['jshint', 'postBuildHTML']
      js_vendor:
        files: ['js/vendor/*.js']
        tasks: ['postBuildHTML']
      coffeelint:
        files: ['Gruntfile.coffee']
        tasks: ['shell:coffeelint']
      jade:
        files: ['jade/**/*.jade']
        tasks: ['jade', 'buildHTML', 'postBuildHTML']
      html:
        files: ["#{ DEST }*.html"]

    'gh-pages':
      site:
        options:
          base: DEST
          message: 'auto commit by grunt-gh-pages'
          user:
            name: 'shinnn'
        src: ['**/*', '.nojekyll']
    
    concurrent:
      prepare: ['jshint', 'analysis', 'encode', 'shell:coffeelint']
      compile: ['buildCSS', 'es6transpiler', 'buildHTML']

  grunt.registerTask 'buildCSS', ['compass', 'autoprefixer']

  grunt.registerTask 'buildHTML', ['jade', 'wiredep']

  grunt.registerTask 'postBuildHTML', [
    'useminPrepare'
    'concat'
    'cssmin'
    'uglify'
    'usemin'
  ]
  
  grunt.registerTask 'build', [
    'clean'
    'concurrent:prepare'
    'concurrent:compile'
    'postBuildHTML'
    'copy:public'
  ]

  grunt.registerTask 'default', ['build', 'connect', 'watch']

  grunt.registerTask 'deploy', ['build', 'gh-pages']
