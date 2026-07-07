// ==UserScript==
// @name        Bsodergren Meta Library
// @version     1.0.7
// @grant       GM_xmlhttpRequest
// @grant       nsafeWindow
// @grant        GM_addStyle
// @run-at       document-end
// @license     MIT
// @namespace   https://greasyfork.org/users/984905
// ==/UserScript==

class VideoMetaData
{
    constructor()
    {
        this.people = []
        this.markers = []
        this.genreList = []
        this.actorList = []
        this.studioName = ''
        this.title = ''
        this.video_file = ''
    }

    getVideoTitle() { }
    getVideoActors() { }
    getVideoFile() { }
    getVideoGenreList() { }

    getVideoDetails()
    {
        this.getVideoActors()
        this.getVideoFile()
        this.getVideoTitle()
        this.getVideoGenreList()


        this.people = {
            VideoName: this.title,
            Genre: this.genreList,
            Actors: this.actorList,
            video_file: this.video_file
        }
    }

    getJsonData()
    {
        return JSON.stringify( this.people)
    }

     getBefore(str, delimiter) {
    if (typeof str !== 'string' || typeof delimiter !== 'string' || delimiter.length === 0) {
        throw new Error("Invalid input: both arguments must be non-empty strings.");
    }

    const index = str.indexOf(delimiter);
    return index === -1 ? str : str.substring(0, index);
}


}
