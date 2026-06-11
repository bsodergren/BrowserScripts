// ==UserScript==
// @name       private.com
// @match       https://members.private.com/en/scene/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.10.6
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?402925
// @description 9/15/2025, 10:25:49 AM
// ==/UserScript==

(function () {
  function ucwords (str) {
    return str.toLowerCase ().replace (/\b[a-z]/g, function (letter) {
      return letter.toUpperCase ();
    });
  }

  var strongText = document.createElement ('strong');
  strongText.innerText = 'Get Video Markers';

  var span = document.createElement ('span');
  span.className = 'glyphicons glyphicons-play-button';

  var iconLink = document.createElement ('a');
  iconLink.href = '#';
  iconLink.onclick = getVideoInfo;

  iconLink.appendChild (span);
  iconLink.appendChild (strongText);
  var newIcon = document.createElement ('li');
  newIcon.className = 'li-watch';
  newIcon.appendChild (iconLink);

  icons = document.querySelector ('.nav-icos');
  icons.appendChild (newIcon);
  function getVideoInfo () {
    let people = [];
    let markers = [];
    let genreList = [];
    let actorList = [];
    studioName = '';

    var videoPlaylist = document.querySelector ('.title-zone');
    title = videoPlaylist.firstChild.innerText;

    d = videoPlaylist.querySelectorAll ('.tag-models > a');
    for (var i = 0; i < d.length; i++) {
      var actor = d[i].innerText;
      actor = actor.toLowerCase ().replace (/\b[a-z]/g, function (letter) {
        return letter.toUpperCase ();
      });
      actorList.push (actor);
    }

    g = videoPlaylist.querySelectorAll ('.tag-tags > a');
    for (var i = 0; i < g.length; i++) {
      genre = g[i].innerText;
      genreList.push (genre);
    }

    var downloadList = document.querySelectorAll ('.full_download_link');
    fileNamePcs = downloadList[0].href.split ('/');
    idx = fileNamePcs.findIndex (str => str.includes ('.mp4'));
    pcs = fileNamePcs[idx].split ('.mp4', 1);
    ppcs = pcs[0].split ('_');
    ppcs.pop ();

    video_file = ppcs.join ('_');
    console.log (video_file);

    people = {
      VideoName: title,
      Genre: genreList,
      Actors: actorList,
      video_file: video_file,
    };
    data = {
      action: 'savePrivateJson',
      class: 'WebHelper',
      text: JSON.stringify (people),
    };
    saveToLocalServer ('process.php', data, 'Saved Markers');
  }
}) ();
