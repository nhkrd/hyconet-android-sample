///////////////////////////////////////////////////////////////////////
// "hyconetjs.ddable": Javascript Interface for Hybridcast Connect
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


// import "hyconet.js"


///////////////////////////////////////////////////////////////////////
// window.companionDevice: Javascript APIs for inter-CompanionCommunication.
///////////////////////////////////////////////////////////////////////

/**
 * window.companionDevice.sendTextToHostDevice()
 */
window.companionDevice.sendTextToHostDevice = function(msg) {
}

/**
 * window.companionDevice.isConnected()
 */
window.companionDevice.isConnected = function() {
    return true;
}

/**
 * window.companionDevice.showCAUserInterface()
 */
window.companionDevice.showCAUserInterface = function() {
}

/**
 * window.companionDevice.replaceApplication()
 */
window.companionDevice.replaceApplication = function(url) {
}

/**
 * window.companionDevice.openWindow()
 */
window.companionDevice.openWindow = function(url) {
    return true;
}


///////////////////////////////////////////////////////////////////////
// Hybridcast-Connect Javascript API recommended in IPTVFJ STD-0013
///////////////////////////////////////////////////////////////////////

/**
 * window.appLauncher.getAvailableMediaFromHostDevice()
 */
window.appLauncher.getAvailableMediaFromHostDevice = function(cache) {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.appLauncher.getChannelInfoFromHostDevice()
 */
window.appLauncher.getChannelInfoFromHostDevice = function(media, cache) {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.appLauncher.startAITControlledAppToHostDevice()
 */
window.appLauncher.startAITControlledAppToHostDevice = function(mode, app) {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.appLauncher.getTaskStatusFromHostDevice()
 */
window.appLauncher.getTaskStatusFromHostDevice = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.appLauncher.getReceiverStatusFromHostDevice()
 */
window.appLauncher.getReceiverStatusFromHostDevice = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};


///////////////////////////////////////////////////////////////////////
// HybridcastConnect hyconetjs Javascript API
///////////////////////////////////////////////////////////////////////

/*****************************************************************************
 * window.hyconetjs: Utility/Extra APIs to utilize Hybridcast-Connect device control APIs recommended in IPTVFJ STD-0013.
 ****************************************************************************/

 window.hyconetjs = window.hyconetjs || { dd:{}, ex:{} };

/**
 * window.hyconetjs.dd.setDevice()
 */
window.hyconetjs.dd.setDevice = function(addr) {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.dd.unsetDevice()
 */
window.hyconetjs.dd.unsetDevice = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.dd.getDevinfo()
 */
window.hyconetjs.dd.getDevinfo = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};


/**
 * window.hyconetjs.dd.searchDevices()
 */
window.hyconetjs.dd.searchDevices = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.dd.addSearchDeviceListener()
 */
window.hyconetjs.dd.addSearchDeviceListener = function(func) {
    // Register callback function if not registered.
    if(!isContained(callBackSearchFuncList, func)) {
        callBackSearchFuncList.push(func);
    }
};

/**
 * window.hyconetjs.dd.removeSearchDeviceListener()
 */
window.hyconetjs.dd.removeSearchDeviceListener = function(func) {
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
 * window.hyconetjs.dd.notifySearchDevice()
 */
window.hyconetjs.dd.notifySearchDevice = function(message) {
    for(i = 0; i < callBackSearchFuncList.length; i++) {
        callBackSearchFuncList[i](message);
    }
};

/**
 * window.hyconetjs.dd.getDialAppInfoURL()
 */
window.hyconetjs.dd.getDialAppResourceURL = function() {
	return new Promise( function(resolve, reject) {
		try{
            resolve({})
		}
		catch {
				reject( {} );
		}
	});
};

/**
 * window.hyconetjs.dd.getDialAppInfo()
 */
window.hyconetjs.dd.getDialAppInfo = function() {
	return new Promise( function(resolve, reject) {
        try{
			resolve( { } );
		}
		catch {
			if( !reject ) {
                reject( {} );
            }
		}
	});
};

/**
 * window.hyconetjs.ex.setURLTransition()
 * @param bool "false" or "true"
 */
window.hyconetjs.ex.setURLTransition = function( bool ) {
}

/**
 * window.hyconetjs.ex.connWebsocket()
 */
window.hyconetjs.ex.connWebsocket = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.ex.disconnWebsocket()
 */
window.hyconetjs.ex.disconnWebsocket = function() {
	return new Promise( function(resolve, reject) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};

/**
 * window.hyconetjs.ex.sendWebsocket()
 */
window.hyconetjs.ex.sendWebsocket = function(text) {
	return new Promise( function(resolve, reject) {
//		if( {}.head.code == 200 ) {
		try{
			resolve( {} );
		}
		catch {
			if( !reject ) {
				reject( {} );
			}
		}
	});
};
