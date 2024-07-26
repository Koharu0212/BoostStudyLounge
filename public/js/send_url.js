/*
ページが完全にロードされると、sendMessage と addQuery 関数が実行される
sendMessage 関数は、親ウィンドウに現在のページの情報を送信する
addQuery 関数は、ページ内のすべてのリンクとフォームのURLに containerPort=3000&languageName=nodejs クエリパラメータを追加する
*/

//ロード時に中のイベントを読み込み
window.addEventListener('load', function(){
  sendMessage()
  addQuery()
})

function sendMessage() {
  //ページ幅を取得
  var bodyWidth = document.getElementsByTagName('body')[0].scrollWidth
  //親ウィンドウにメッセージを送信
  window.parent.postMessage({ pathname: window.location.pathname, query: window.location.search, width: bodyWidth }, '*')
}

function addQuery() {
  var aTags = document.getElementsByTagName('a') //ページ内のaタグを取得
  for (var i = 0 ; i < aTags.length ; i++) { //全てのaタグに対してループを実行
    var aTag = aTags[i]
    //各リンクのhrefを取得し、getUrlWithQuery関数を使ってクエリパラメータを追加
    //変更されたURLを再度hrefに設定
    url = aTag.getAttribute('href')
    aTag.setAttribute('href', getUrlWithQuery(url))
  }
  var formTags = document.getElementsByTagName('form') //ページ内のすべてのformタグを取得
  for (var i = 0 ; i < formTags.length ; i++) {
    var formTag = formTags[i]
    //各フォームのactionを取得し、getUrlWithQuery関数を使ってクエリパラメータを追加
    //変更されたURLを再度action属性に設定
    var url = formTag.getAttribute('action')
    formTag.setAttribute('action', getUrlWithQuery(url))
  }
}

function getUrlWithQuery(url) {
  var query = 'containerPort=3000&languageName=nodejs' //追加するクエリパラメータの定義

  // ブラウザバック等による多重付加対策
  var parser = document.createElement('a')  //解析のためにa要素を作成
  parser.href = url //解析するURLを設定
  //URLにすでにcontainerPort または languageNameクエリパラメータが含まれているかをチェック。含まれている場合、元のURLを返す
  if (parser.search.match(/containerPort|languageName/)) {
    return url
  }
  //URLにクエリパラメータがすでに含まれている場合は追加のクエリパラメータを & で結合し、含まれていない場合は ? で結合
  return url.match(/\?/) ? `${url}&${query}` : `${url}?${query}`
}
