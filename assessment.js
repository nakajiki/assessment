(function() {
  'use strict';
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  /**
   * 指定した要素の子供をすべて削除する
   * @param {HTMLElement} element HTMLの要素
   */
  function removeAllChildren(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  userNameInput.onkeydown = (event) => {
    if(event.keyCode == 13) {
      assessmentButton.onclick();
    }
  }

  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if(userName.length === 0) {
      return;
    }

    // 診断結果表示エリア
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = '#あなたのいいところ をツイートする';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
  }

  const answers = [
    '{username}のいいところは声です。',
    '{username}のいいところは眼差しです。',
    '{username}のいいところは情熱です。',
    '{username}のいいところは知識です。',
    '{username}のいいところは優しさです。'
  ];

  /**
   * 名前の文字列を渡すと診断結果を返す関数
   * @param {string} userName ユーザの名前
   * @return {string} 診断結果
   */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字コード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{username\}/g, userName);

    return result;
  }

  // テストコード
  console.assert(
    assessment('taro') === assessment('taro'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
  )

})();
