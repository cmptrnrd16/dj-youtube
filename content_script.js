function procRequest(request, sender, callback) {
	var html5Video = document.body.getElementsByTagName("video");
	var flashVideo = document.getElementById("movie_player");
	
	if (request.action == "changeVol") {
		//check to see if the youtube video is flash or html5
		if (html5Video[0] != null) {
			html5Video[0].volume = request.vol/100;
		} else if (flashVideo != null){
			flashVideo.setVolume(request.vol);
		}
	} else if (request.action == "play") {
		if (html5Video[0] != null) {
			if (html5Video[0].paused) {
				html5Video[0].play();
			} else {
				html5Video[0].pause();
			}
		} else if (flashVideo != null){
			flashVideo.pause();
		}
	}
}

chrome.extension.onRequest.addListener(procRequest);