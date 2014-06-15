# `<div>o　o</div>` <Hello!

# [re(a)ct](http://shinnn.github.io/re-a-ct/)

A sound interaction expreriment with HTML5 Web Audio API

[![devDependency Status](https://david-dm.org/shinnn/re-a-ct/dev-status.svg)](https://david-dm.org/shinnn/re-a-ct#info=devDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

キャラクターとともに生成される音を楽しむWebアプリケーションです。

## 動作環境

Web Audio APIに対応しているブラウザでのみ正常に動作します（[Can I use Web Audio API?](http://caniuse.com/audio-api)）。
Google ChromeとSafariを推奨しています。最新版のChromeは[こちら](https://www.google.com/intl/ja/chrome/)からダウンロードできます。

## 遊び方

* **クリックするごとに、クリックした位置にキャラクターが登場します。**キャラクターはBGMのリズムに合わせて動き回ります。
* **キャラクター同士がぶつかるとき、音が鳴ります**。ぶつからない間は色が次第に薄くなってゆき、そのうち消えて行きます。
* **キャラクターはぶつかった際に成長**し、大きさと色が変わります。成長段階に応じて、ぶつかったときに鳴る音も変化します。

## License

Copyright (c) 2013 - 2014 [Shinnosuke Watanabe](https://github.com/shinnn).
Licensed under [the MIT license](./LICENSE).
