// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _tabArray = new Array();
var s1;
var s2;
var s3;

function updateSlider() {


    s2.value = s1.value;
    s3.value = 100 - s1.value;

    document.getElementById("slider2val").innerHTML=s2.value;
    document.getElementById("slider3val").innerHTML=s3.value;

    chrome.tabs.sendRequest(_tabArray[0].id,
        { action: "changeVol", vol: s3.value});
    chrome.tabs.sendRequest(_tabArray[1].id,
        { action: "changeVol", vol: s2.value});
}

function volumeCallback(data) {
    //determine which slider should be updated

    //set the slider to match the initial youtube volume
}

function play(index) {
	chrome.tabs.sendRequest(_tabArray[index].id, { action: "play" });
}

function test()
{
    var message = "";
    for (i = 0; i < _tabArray.length; i++) {
        message = message.concat(_tabArray[i].title, "\n");
    }
    alert(message);
}

function updateTabs(tabs) {
    var message = "";
    for (i = 0; i < tabs.length; i++) {
        _tabArray.push(tabs[i]);
    }
}

window.onload = function(){
    //set global slider vars
    s1 = document.getElementById('slider1');
    s2 = document.getElementById('slider2');
    s3 = document.getElementById('slider3');

    //init the list of tabs
    chrome.tabs.query({url: "http://*.youtube.com/*"}, function(tabs) {
        updateTabs(tabs);
    });

    //setup event listeners
    document.getElementById('button1').addEventListener("click", test, true);
	document.getElementById('play1').addEventListener("click", function() { play(0); }, true);
	document.getElementById('play2').addEventListener("click", function() { play(1); }, true);
    s1.addEventListener("change", updateSlider, true );

    //init the volumes to match the default slider positions
    //this prevents a weird change when the slider is first moved
    //updateSlider();
};
