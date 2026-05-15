// ==UserScript==
// @name        New script newsensations.com
// @namespace   Violentmonkey Scripts
// @match       https://newsensations.com/members/gallery.php*
// @grant        GM_xmlhttpRequest
// @version     1.0
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==



;(function () {

   function searchNodeListForText(nodes, searchText) {
      if (!(nodes instanceof NodeList)) {
        throw new TypeError("First argument must be a NodeList");
      }
      if (typeof searchText !== "string") {
        throw new TypeError("Search text must be a string");
      }

      const matches = [];
      const lowerSearch = searchText.toLowerCase();

      nodes.forEach(node => {
        if (node.textContent.toLowerCase().includes(lowerSearch)) {
          matches.push(node);
        }
      });

      return matches;
    }

    // Example usage:








  var ButtonRow = document.querySelectorAll('.ex-grid-item.ex-actions-row')
   var linkGrabberBtn = document.createElement('button');
    linkGrabberBtn.onclick = getVideoLinks;
//     // linkGrabberBtn.classList.add('Button'); //playlistButtons tooltipTrig js-pop
    var span = document.createElement('span');
    span.innerText = 'Get Video Json';
    span.className = 'text';
    linkGrabberBtn.appendChild(span);
    ButtonRow[0].appendChild(linkGrabberBtn);

    function getVideoLinks () {
        // Example: Change background color
        let videoJson = []
        let names = []
        let VideoSeries =  "New Sensations"


          const listItems = document.querySelectorAll("div >.ex-grid-item > span");
    const found = searchNodeListForText(listItems, "Series: ");

    console.log("Found elements:", found);


    // Highlight matches
    found.forEach(el =>
                  {
    next = el.nextElementSibling;
      VideoSeries = next.innerText
      console.log(next.innerText)
  }
                 );




      e = document.querySelector(".ex-player.is-paused")
s = e.getAttribute("data-sources")
array = JSON.parse(s)
url  = array[0].src
      path = url.split("?",1)
pcs = path[0].split("/")
filename = pcs[pcs.length-1]

   videoTitleEl =   document.querySelectorAll("div>.ex-grid-item > h4")
      videoTitle = videoTitleEl[0].innerText;



      link = document.querySelectorAll("div> .ex-grid-item > a")
 for (var i = 0; i < link.length; i++) {
   name = link[i].innerText;
   if(name !== "" )
   {
     if(name !== VideoSeries ){
    names.push(name);
     }
   }
 }

      videoJson = {
        Network: "New Sensations",
        Title: videoTitle,
        Studio: VideoSeries,
        Actors: names,
        video_file: filename
      }




        saveToText(videoJson,'saveNewSensationsJson')

        // Your DOM manipulation code here
    }

   function saveToText (Formdata, action) {
        var jsonstr = JSON.stringify(Formdata)


        console.log(jsonstr);

        jsonstr = encodeURIComponent(jsonstr)

        GM_xmlhttpRequest({
            method: 'POST',

               url: "http://media.lan/plex/process.php",
            data: encodeURI("class=Forms&action=" + action + "&text=" + jsonstr),



            // url: 'http://media.lan/plex/process.php?class=Forms&action=saveAdulttimeJson',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                // 'Content-Type': 'application/json' // Tell server we're sending JSON
            }
          // dataType: "json",
            // data: {string: jsonstr}

            // data: {
            //     // class: 'Forms',
            //     // action: 'saveAdulttimeJson',
            //     text: jsonstr
            // }
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded"
            // }
        })
    }

  })()
