///////////////////////////////////////////////////////////////////////
// Implementation of hyconet Javascript Interface Loader
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


// Load Javascript Interfaces for hybridcast connect 
//
// TODO: use "import" to implement JS-interface

// import ex from 'hyconetable-extra.js'
// import dd from 'hyconetable-devicediscovery.js'
// import launcher from 'hyconetable-applauhcher.js'
// import comdev from 'hyconetable-companiondevice.js'

///////////////////////////////////////////////////////////////////////
// window.companionDevice: Javascript APIs for inter-CompanionCommunication.
// CompanionDevice Object
///////////////////////////////////////////////////////////////////////

/**
 * window.companionDevice.sendTextToHostDevice()
 */
window.companionDevice.sendTextToHostDevice = function(msg) {
    hyconet.sendTextToHostDevice(msg);
}

/**
 * window.companionDevice.isConnected()
 */
window.companionDevice.isConnected = function() {
    var result = hyconet.isConnected();
    return !!result;
}

/**
 * window.companionDevice.showCAUserInterface()
 */
window.companionDevice.showCAUserInterface = function() {
    hyconet.showCAUserInterface();
}

/**
 * window.companionDevice.replaceApplication()
 */
window.companionDevice.replaceApplication = function(url) {
    hyconet.replaceApplication(url);
}

/**
 * window.companionDevice.openWindow()
 */
window.companionDevice.openWindow = function(url) {
    var result = hyconet.openWindow(url)
    return !!result;
}


///////////////////////////////////////////////////////////////////////
// HybridcastConnect hyconet Javascript API
///////////////////////////////////////////////////////////////////////

/*****************************************************************************
 * window.hyconet: Utility APIs to utilize Hybridcast-Connect device control APIs recommended in IPTVFJ STD-0013.
 * hyconet object
 ****************************************************************************/

/**
 * window.hyconetjs.setDevice()
 */
window.hyconetjs.setDevice = function(addr) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.setDevice(addr) );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.unsetDevice()
 */
window.hyconetjs.unsetDevice = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.unsetDevice() );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.getDevinfo()
 */
window.hyconetjs.getDevinfo = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.getDevinfo() );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.setURLTransition()
 * @param bool "false" or "true"
 */
window.hyconetjs.setURLTransition = function( bool ) {
	hyconet.setURLTransition( bool );
}

/**
 * window.hyconetjs.searchDevices()
 */
window.hyconetjs.searchDevices = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.searchDevices() );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.addSearchDeviceListener()
 */
window.hyconetjs.addSearchDeviceListener = function(func) {
    // Register callback function if not registered.
    if(!isContained(callBackSearchFuncList, func)) {
        callBackSearchFuncList.push(func);
    }
};

/**
 * window.hyconetjs.removeSearchDeviceListener()
 */
window.hyconetjs.removeSearchDeviceListener = function(func) {
    // Remove all registered callback function.
    if(func == null) {
        //callBackSearchFuncList.clear();
        callBackSearchFuncList.length = 0;
    } else {
        // Remove indicated registered callback function.
        if(isContained(callBackSearchFuncList, func)) {
            callBackSearchFuncList.pop(func);
        }
    }
};

/**
 * window.hyconetjs.notifySearchDevice()
 */
window.hyconetjs.notifySearchDevice = function(message) {
    for(i = 0; i < callBackSearchFuncList.length; i++) {
        callBackSearchFuncList[i](message);
    }
};

/**
 * window.hyconetjs.connWebsocket()
 */
window.hyconetjs.connWebsocket = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.connWebsocket() );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.disconnWebsocket()
 */
window.hyconetjs.disconnWebsocket = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.disconnWebsocket() );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.hyconetjs.sendWebsocket()
 */
window.hyconetjs.sendWebsocket = function(text) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.sendWebsocket(text) );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};



/**
 * window.hyconetjs.getDialAppInfoURL()
 */
window.hyconetjs.getDialAppResourceURL = function() {
	return new Promise( function(resolve, reject) {
		var retstr = hyconet.getDialAppResourceURL() ;
		console.log(retstr);

		var ret = JSON.parse( retstr );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.getDialAppInfo()
 */
window.hyconetjs.getDialAppInfo = function() {
	return new Promise( function(resolve, reject) {
		var retjson = hyconet.getDialAppInfo();
		var ret = JSON.parse( retjson );
		if( ret.status == 200 || ret.status == 50200) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};


///////////////////////////////////////////////////////////////////////
// Hybridcast-Connect Javascript API recommended in IPTVFJ STD-0013
// AppLauncher Object
///////////////////////////////////////////////////////////////////////

/**
 * window.appLauncher.getAvailableMediaFromHostDevice()
 */
window.appLauncher.getAvailableMediaFromHostDevice = function(cache) {
	return new Promise( function(resolve, reject) {
		var aaa = hyconet.getAvailableMediaFromHostDevice(cache);
//		console.log(aaa);
		var ret = JSON.parse( aaa );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.appLauncher.getChannelInfoFromHostDevice()
 */
window.appLauncher.getChannelInfoFromHostDevice = function(media, cache) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.getChannelInfoFromHostDevice(media, cache) );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.appLauncher.startAITControlledAppToHostDevice()
 */
window.appLauncher.startAITControlledAppToHostDevice = function(mode, app) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.startAITControlledAppToHostDevice(mode, JSON.stringify(app)) );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.appLauncher.getTaskStatusFromHostDevice()
 */
window.appLauncher.getTaskStatusFromHostDevice = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.getTaskStatusFromHostDevice() );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

/**
 * window.appLauncher.getReceiverStatusFromHostDevice()
 */
window.appLauncher.getReceiverStatusFromHostDevice = function() {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.getReceiverStatusFromHostDevice() );
//		if( ret.head.code == 200 ) {
		if( true ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};

//
// call window.companionDevice.onCompanionDeviceInitFinished()
//
onCompanionDeviceInitFinishedWrapper();

