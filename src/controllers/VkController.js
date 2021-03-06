controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true
    },
    playPauseSelector: '.top_audio_player_play',
    previousSelector: '.top_audio_player_prev',
    nextSelector: '.top_audio_player_next',
    titleSelector: '.audio_page_player_title_song',
    artistSelector: '.audio_page_player_title_performer',
    artworkImageSelector: '.audio_page_player__cover',
    playStateSelector: '#top_audio_player',
    playStateClass: 'top_audio_player_playing'
})

var artistTitleSelector = '.top_audio_player_title'
var artistTitleRegex = /(.*) – (.*)/

controller.override('getTitle', function(_super) {
    var title = _super()
    if (title) {
        var prefix = ' – '
        if (title.startsWith(prefix))
            title = title.substr(prefix.length)
    } else {
        var artistTitle = this.querySelectorText(artistTitleSelector)
        var match = artistTitleRegex.exec(artistTitle)
        if (match)
            title = match[1]
    }
    return title
})

controller.override('getArtist', function(_super) {
    var artist = _super()
    if (!artist) {
        var artistTitle = this.querySelectorText(artistTitleSelector)
        var match = artistTitleRegex.exec(artistTitle)
        if (match)
            artist = match[2]
    }
    return artist
})

controller.override('getAlbumArt', function() {
    var img = document.querySelector(this.artworkImageSelector)
    if (!img)
        return undefined
    var style = img.currentStyle || window.getComputedStyle(img, false)
    var url = style.backgroundImage.slice(5, -2)
    if (url.startsWith('data:image/svg+xml'))  // The note sign
        return undefined
    else
        return url
});
