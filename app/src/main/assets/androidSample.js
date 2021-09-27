///////////////////////////////////////////////////////////////////////
// Hyconet Android Sample Application Service Implementation.
///////////////////////////////////////////////////////////////////////
/**

MIT License

Copyright (c) 2020 - NHK

All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

function call_js_search() {
	var devinfo = document.getElementById("devinfo");
	devinfo.innerHTML = "[探索中]";
	var domDevlist = document.getElementById("devlist");
	domDevlist.innerHTML = "";

	setTimeout( function() {
		window.hyconetjs.dd.searchDevices().then( function( status ) {
			var devinfo = document.getElementById("devinfo");
			devinfo.innerHTML = status.body;
			var domDevlist = document.getElementById("devlist");
			domDevlist.innerHTML = "";
			var devlist = JSON.parse(status.body);
			for( var i=0; i<devlist.length; i++ ) {
				var opt = document.createElement("option");
				opt.innerHTML = devlist[i].ipaddr + ":" + devlist[i].friendlyName ;
				opt.setAttribute("value", devlist[i].ipaddr + ":" + devlist[i].friendlyName);
				if(i==0) {
					opt.setAttribute("selected", "selected");
				}
				domDevlist.appendChild(opt);
			}
		});
	}, 200);
}

function call_js_tvsel() {
 	var num = document.devform.devlist.selectedIndex;
 	var str = document.devform.devlist.options[num].value;
 	document.getElementById("tvsel").innerHTML = str;

 	setTimeout( function() {
 		window.hyconetjs.dd.setDevice( str.split(":")[0] ).then(function(res) {
 			var openS = document.getElementById("openstatus");
 			openS.innerHTML = JSON.stringify(res);
 		});
 	}, 100);
 }

 function call_js_tvseldirect() {

    let tvdevice = {
        "ipaddr": "192.168.0.111",
        "uuid":"",
        "locationUrl":"",
        "applicationUrl": "http://192.168.0.111:8887/apps"
    }
 	setTimeout( function() {
 		window.hyconetjs.dd.setDirectDevice( JSON.stringify(tvdevice) ).then(function(res) {
 		 	document.getElementById("tvsel").innerHTML = tvdevice.ipaddr;
 			var openS = document.getElementById("openstatus");
 			openS.innerHTML = JSON.stringify(res);
 		});
 	}, 100);
 }

function call_js_getDialAppResourceURL() {
	window.hyconetjs.dd.getDialAppResourceURL(true).then(function(data) {
		document.getElementById("dialappresourceurl").innerHTML = JSON.stringify(data);
	});
}
function call_js_getDialAppInfo() {
	window.hyconetjs.dd.getDialAppInfo(true).then(function(data) {
		document.getElementById("dialappinfo").innerText = JSON.stringify(data);
	});
}


/////////////////

/**
*/
function call_js_getAvailableMediaFromHostDevice() {
	window.appLauncher.getAvailableMediaFromHostDevice(true).then(function cb(data) {
		var mediainfo = document.getElementById("mediainfo");
		mediainfo.innerHTML = JSON.stringify(data);
	});
}

/**
*/
function call_js_getChannelInfoFromHostDevice() {
	var num = document.chform.medialist.selectedIndex;
	var media = document.chform.medialist.options[num].value;
	window.appLauncher.getChannelInfoFromHostDevice(media, true).then(function(data) {

		//channel PAD
		var chpad = document.getElementById("chpad");
		var media = data["body"]["media"];

		chpad.innerHTML = "";
		for( var i=0; i<media.length ;i++ ) {
			var type  = media[i]["type"];
			var channels  = media[i]["channels"];

			for( var j=0; j<channels.length ;j++ ) {
				var chnum  = channels[j]["logical_channel_number"];
				var chname = channels[j]["broadcast_channel_name"];
				var nwid = channels[j]["resource"]["original_network_id"];
				var tsid = channels[j]["resource"]["transport_stream_id"];
				if( tsid == null ) {
				    tsid = channels[j]["resource"]["tlv_stream_id"];
				}
				var svid = channels[j]["resource"]["service_id"];
				var label = type + ":" + chnum + " " + chname;
				var btn = document.createElement('button');
				btn.type = "button";
				btn.value = type + ',' + nwid + ',' + tsid + ',' + svid;
				btn.innerText = label;
				btn.onclick = onclick_call_js_startAITControlledAppToHostDevice;
				btn.setAttribute( "data-o-grid-colspan" , "12" );
				btn.classList.add('channelPad');

				chpad.appendChild( btn );
			}
		}
	});
}
/**
*/
function onclick_call_js_startAITControlledAppToHostDevice() {
	var ids = this.value.split(",");

	call_js_startAITControlledAppToHostDevice( "tune", ids[0], parseInt(ids[1]), parseInt(ids[2]), parseInt(ids[3]), 0 );
}


/**
*/
function call_js_getReceiverStatusFromHostDevice() {
	window.appLauncher.getReceiverStatusFromHostDevice().then(function cb(data) {
		var mediainfo = document.getElementById("receiverinfo");
		mediainfo.innerHTML = JSON.stringify(data);
	});
}


/**
*/
function call_js_startAITControlledAppToHostDevice( mode, type, nwid, tsid, svid, aitidx ) {
	var ait = [
		"http://127.0.0.1:8887/ait/sample_aaa.ait" ,
		"http://127.0.0.1:8887/ait/sample_bbb.ait" ,
		"http://127.0.0.1:8887/ait/sample_ccc.ait"
	];

    var tsid_attr = "transport_stream_id";
    if( ['ABS','ACS','NCS'].includes(type) ) {
        tsid_attr = "tlv_stream_id";
    }
	var app  = {
		"resource": {
			"original_network_id": nwid,
			"service_id": svid
		},
		"hybridcast": {
			"orgid": 1,
			"appid": 1,
			"aiturl": ait[aitidx]
		}
	};
    app['resource'][tsid_attr] = tsid;

	var appmode = document.getElementById("appmode" + "_" + mode);
	appmode.innerHTML = mode;
	var appapp = document.getElementById("appapp" + "_" + mode);
	appapp.innerHTML = JSON.stringify(app);

	setTimeout( function() {
		window.appLauncher.startAITControlledAppToHostDevice(mode, app).then(function cb(data) {
			var appinfo = document.getElementById("appinfo" + "_" + mode);
			appinfo.innerHTML = JSON.stringify(data);
		});
	}, 200 );
}

/**
*/
function call_js_getTaskStatusFromHostDevice() {
	window.appLauncher.getTaskStatusFromHostDevice().then(function cb(data) {
		var mediainfo = document.getElementById("taskstatus");
		mediainfo.innerHTML = JSON.stringify(data);
	});
}
