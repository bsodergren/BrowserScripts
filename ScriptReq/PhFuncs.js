// ==UserScript==
// @name        Bsodergren PH Library
// @version     1.3.9
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// ==/UserScript==

function SaveToPlaylist () {
  var text = '';

  var PlaylistName = 'Favorites';
  var PlaylistNameEl = document.getElementsByClassName ('playlistTitle');
  if (PlaylistNameEl.length == 0) {
    var WatchEl = document.querySelector ('h1 #watchPlaylist');
    if (WatchEl != null) {
      var PlaylistName = WatchEl.innerText;
    } else {
      WatchE2 = document.getElementsByClassName ('playlist-title');
      if (WatchE2 != null) {
        var PlaylistName = WatchE2[0].innerText.split("'",1)[0];
      }
    }
  } else {
    var PlaylistName = PlaylistNameEl[0].innerHTML;
  }

  console.log (PlaylistName);

  var videoPlaylist = document.getElementById ('linkListDivID');
  var linkList = videoPlaylist.querySelectorAll ('li > a');
  for (var i = 0; i < linkList.length; i++) {
    // innerHTML = linkList[i].href;
    // console.log(linkList[i].href,linkList[i].href.match(/view_video/) )
    if (linkList[i].href.match (/view_video/) !== null) {
      text = text + '\n' + linkList[i].href;
    }
  }

  filename = PlaylistName + '_playlist.txt';
  let playlistFile = filename.split (' ').join ('_');
  data = {
    file: playlistFile,
    action: 'addToPlaylist',
    text: text,
  };
  console.log (data);
  saveToLocalServer (
    'pledit.php',
    data,
    'Saved to playlist ' + filename,
    RemoveOuterModalPanel
  );
}

function showLinks (linkList) {
  console.log (linkList);

  var outerModalDiv = document.createElement ('div');
  var innerModalDiv = document.createElement ('div');
  outerModalDiv.id = 'playlist213VidsLinkContainingModalPanel'; //use a long id to avoid name conflicts
  outerModalDiv.style.display = 'block';
  outerModalDiv.style.position = 'fixed';
  outerModalDiv.style.zIndex = '100';
  outerModalDiv.style.paddingTop = '100px';
  outerModalDiv.style.left = '0';
  outerModalDiv.style.top = '0';
  outerModalDiv.style.width = '100%';
  outerModalDiv.style.height = '100%';
  outerModalDiv.style.backgroundColor = 'rgb(0,0,0)';
  outerModalDiv.style.backgroundColor = 'rgb(0,0,0,0.4)';

  var PlaylistButtonContainer = document.createElement ('div');
  PlaylistButtonContainer.className = 'userButtons';
  var PlaylistButton = CreateButton (
    'Download as Playlist File',
    null,
    SaveToPlaylist
  );
  PlaylistButton.style.cssFloat = 'right';
  PlaylistButtonContainer.appendChild (PlaylistButton);
  innerModalDiv.appendChild (PlaylistButtonContainer);

  //add close btn
  var closeButtonContainer = document.createElement ('div');
  closeButtonContainer.className = 'userButtons';
  var closeButton = CreateButton ('X', null, RemoveOuterModalPanel);
  closeButton.style.cssFloat = 'right';
  closeButtonContainer.appendChild (closeButton);
  innerModalDiv.appendChild (closeButtonContainer);

  innerModalDiv.style.backgroundColor = '#1b1b1b';
  innerModalDiv.style.margin = 'auto';
  innerModalDiv.style.padding = '20px';
  innerModalDiv.style.border = '1px solid #888';
  innerModalDiv.style.width = '80%';
  innerModalDiv.style.color = '#ababab';
  innerModalDiv.style.overflowY = 'auto';
  innerModalDiv.style.height = '80%';

  var instructions1 = document.createElement ('p');
  var instructions2 = document.createElement ('p');
  var instructions3 = document.createElement ('p');

  instructions1.innerHTML =
    'Save the links to a local textfile (e.g. &quotC:\\Temp\\dl\\linklist.txt)&quot and run youtube-dl whith the -a argument and the path to the linklist.';
  instructions2.innerHTML =
    'youtube-dl -a &quotC:\\Temp\\dl\\linklist.txt&quot';
  instructions3.innerHTML = 'Or just use jDownloader with the linklist';

  innerModalDiv.appendChild (instructions1);
  innerModalDiv.appendChild (instructions2);
  innerModalDiv.appendChild (instructions3);
  var linkListDiv = document.createElement ('div');
  var linkListLi = document.createElement ('ol');
  linkListDiv.id = 'linkListDivID';
  for (var i = 0; i < linkList.length; i++) {
    // innerHTML = linkList[i].href;
    // console.log(linkList[i].href,linkList[i].href.match(/view_video/) )
    if (linkList[i].href.match (/view_video/) !== null) {
      var OrderedList = document.createElement ('li');
      var a = document.createElement ('a');
      a.innerHTML = linkList[i].href;
      a.href = linkList[i].href;
      OrderedList.appendChild (a);
      linkListLi.appendChild (OrderedList);
    }
  }
  linkListDiv.appendChild (linkListLi);
  innerModalDiv.appendChild (linkListDiv);

  //     var linkListDiv;

  //     linkListDiv = document.createElement('div');

  // for (var i = 0; i < linkList.length; i++) {
  //     var a = document.createElement('a')
  //     a.innerHTML = linkList[i].href
  //     a.href = linkList[i].href
  //     innerModalDiv.appendChild(a)
  //     innerModalDiv.appendChild(document.createElement('br'))
  // }
  outerModalDiv.appendChild (innerModalDiv);
  document.body.appendChild (outerModalDiv);
}

function CreateButton (text, id, onClickEvent) {
  var innerbutton = document.createElement ('button');
  innerbutton.innerText = text;
  innerbutton.className = 'buttonBase';
  innerbutton.style.backgroundColor = '#f90';
  innerbutton.style.color = '#000';
  innerbutton.style.fontWeight = '700';
  innerbutton.display = 'inline-block';

  var button = document.createElement ('div');
  if (id) button.id = id;

  button.style.padding = '5px 10px';
  button.style.lineHeight = '1.2em';
  button.style.borderRadius = '4px';
  button.onclick = onClickEvent;
  button.appendChild (innerbutton);
  return button;
}

function RemoveOuterModalPanel () {
  var toRemove = document.getElementById (
    'playlist213VidsLinkContainingModalPanel'
  );
  toRemove.parentNode.removeChild (toRemove);
}

showToast ('Ph file loaded', 3000);
