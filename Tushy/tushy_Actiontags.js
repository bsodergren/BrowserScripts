// ==UserScript==
// @name        Yushy Actiontag script
// @match        https://members.tushy.com/videos/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.0.8
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?941794
// @description 4/28/2026, 6:34:22 AM
// ==/UserScript==
(function () {
  waitForElement ('[data-test-component="PlayButton"]', el => {
    console.log (el);
    attachButton ();
  });

  function attachButton () {
    var mBtnParent = document.querySelector (
      '[data-test-component="MoreInfoButton"]'
    );
    var MarkerGrabberBtn = document.createElement ('button');
    var spanm = document.createElement ('span');
    spanm.innerText = 'Get Video Markers';
    spanm.className = 'Button';
    spanm.style.height = '40px';
    spanm.style.fontSize = '16px';
    // spanm.onclick = getVideoInfo;
    p = mBtnParent.parentElement;

    p.appendChild (spanm);
    console.log (p);
  }
  // Ensure script runs only after DOM is ready
  function getVideoInfo () {
    // Example: Change background color
    let people = [];
    let markers = [];
    let genreList = [];
    let actorList = [];

    VideoFileEl = document.querySelector ('video');
    filename = VideoFileEl.src;
    url = filename.split ('.mp4', 1);
    file = url[0].split ('/').reverse ()[0];

    var titleElement = document.querySelector (
      '[data-test-component="VideoTitle"]'
    );
    title = titleElement.innerText;

    var artistList = document.querySelector (
      '[data-test-component="VideoModels"]'
    );
    list = artistList.childNodes;

    list.forEach (child => {
      if (child.nodeName === 'A') {
        txt = child.innerHTML;
        actorList.push (txt);
        console.log (txt);
      }
    });

    var VideoCategories = document.querySelector (
      '[data-test-component="VideoCategories"]'
    );
    genreNodeList = VideoCategories.childNodes;

    genreNodeList.forEach (child => {
      genre = child.innerHTML;
      genreList.push (genre);
    });

    people = {
      VideoName: title,
      Genre: genreList,
      Actors: actorList,
      video_file: file.replace ('_480P', ''),
    };

    data = {
      action: 'saveTushyJson',
      class: 'WebHelper',
      text: JSON.stringify (people),
    };
    saveToLocalServer ('process.php', data, 'Saved Markers');
  }
  unsafeWindow.attachButton = attachButton;

  unsafeWindow.getVideoInfo = getVideoInfo;
}) ();
