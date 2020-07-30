///////////////////////////////////////////////////////////////////////
// Hybridcast-Connect Extensible Polyfill for Javascript Interface
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



// TODO: use "import" to implement JS-interface

// import ex from 'hyconetable-extra.js'
// import dd from 'hyconetable-devicediscovery.js'
// import launcher from 'hyconetable-applauhcher.js'
// import comdev from 'hyconetable-companiondevice.js'

//
// Common for polyfill
//
var callBackFuncList = new Array();
var callBackSearchFuncList = new Array();
var callBackWSDataReceivedFuncList = new Array();

if( !window.companionDevice ) {
    window.companionDevice = {};
    // window.companionDevice = comdev;
}
if( !window.appLauncher ) {
    window.appLauncher = {};
    // window.appLauncher = launcher;
}

/**
 * isContained()
 */
function isContained(array, elem) {
    var index = array.indexOf(elem);
    if(index > 0) {
        return true;
    } else {
        return false;
    }
}

///////////////////////////////////////////////////////////////////////
// window.companionDevice: Javascript APIs for inter-CompanionCommunication recommended in IPTVFJ STD-0013
// CompanionDevice Object
///////////////////////////////////////////////////////////////////////

/**
 * window.companionDevice.addHostDeviceTextMessageListener()
 */
window.companionDevice.addHostDeviceTextMessageListener = window.companionDevice.addHostDeviceTextMessageListener || function(func) {
    // Register callback function if not registered.
    if(!isContained(callBackFuncList, func)) {
        callBackFuncList.push(func);
    }
}
/**
 * window.companionDevice.removeHostDeviceTextMessageListener()
 */
window.companionDevice.removeHostDeviceTextMessageListener = window.companionDevice.removeHostDeviceTextMessageListener || function(func) {
    // Remove all registered callback function.
    if(func == null) {
        //callBackFuncList.clear();
        callBackFuncList.length = 0;
    } else {
        // Remove indicated registered callback function.
        if(isContained(callBackFuncList, func)) {
            callBackFuncList.pop(func);
        }
    }
}

/**
 * window.companionDevice.addHostDeviceTextMessageListener()
 */
window.companionDevice.addHostDeviceTextMessageListener = window.companionDevice.addHostDeviceTextMessageListener || function(func) {
    // Register callback function if not registered.
    if(!isContained(callBackFuncList, func)) {
        callBackFuncList.push(func);
    }
}
/**
 * window.companionDevice.removeHostDeviceTextMessageListener()
 */
window.companionDevice.removeHostDeviceTextMessageListener = window.companionDevice.removeHostDeviceTextMessageListener || function(func) {
    // Remove all registered callback function.
    if(func == null) {
        //callBackFuncList.clear();
        callBackFuncList.length = 0;
    } else {
        // Remove indicated registered callback function.
        if(isContained(callBackFuncList, func)) {
            callBackFuncList.pop(func);
        }
    }
}


///////////////////////////////////////////////////////////////////////
// Hybridcast-Connect Javascript API recommended in IPTVFJ STD-0013
///////////////////////////////////////////////////////////////////////

/**
 * window.appLauncher.getAvailableMediaFromHostDevice()
 */
window.appLauncher.getAvailableMediaFromHostDevice = window.appLauncher.getAvailableMediaFromHostDevice || function(cache) {
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
window.appLauncher.getChannelInfoFromHostDevice = window.appLauncher.getChannelInfoFromHostDevice || function(media, cache) {
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
window.appLauncher.startAITControlledAppToHostDevice = window.appLauncher.startAITControlledAppToHostDevice || function(mode, app) {
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
window.appLauncher.getTaskStatusFromHostDevice = window.appLauncher.getTaskStatusFromHostDevice || function() {
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
window.appLauncher.getReceiverStatusFromHostDevice = window.appLauncher.getReceiverStatusFromHostDevice || function() {
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


/*****************************************************************************
 * window.hyconetjs.* : Utility/Extra APIs to utilize Hybridcast-Connect device control APIs recommended in IPTVFJ STD-0013.
 * hyconetjs object
 ****************************************************************************/

window.hyconetjs = window.hyconetjs || {};
window.hyconetjs.ex = window.hyconetjs.ex || {};
//window.hyconetjs.ex = window.hyconetjs.ex || ex;


/**
* window.hyconetjs.ex.setURLTransition()
* @param bool "false" or "true"
*/
window.hyconetjs.ex.setURLTransition = function( bool ) {
   hyconet.setURLTransition( bool );
}


/**
* window.hyconetjs.ex.connWebsocket()
*/
window.hyconetjs.ex.connWebsocket = function() {
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
* window.hyconetjs.ex.disconnWebsocket()
*/
window.hyconetjs.ex.disconnWebsocket = function() {
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
* window.hyconetjs.ex.sendWebsocket()
*/
window.hyconetjs.ex.sendWebsocket = function(text) {
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
* window.hyconetjs.ex.addWSDataReceivedListener()
*/
window.hyconetjs.ex.addWSDataReceivedListener = function(func) {
   // Register callback function if not registered.
   if(!isContained(callBackWSDataReceivedFuncList, func)) {
       callBackWSDataReceivedFuncList.push(func);
   }
}

/**
* window.hyconetjs.ex.removeWSDataReceivedListener()
*/
window.hyconetjs.ex.removeWSDataReceivedListener = function(func) {
   // Remove all registered callback function.
   if(func == null) {
       //callBackWSDataReceivedFuncList.clear();
       callBackWSDataReceivedFuncList.length = 0;
   } else {
       // Remove indicated registered callback function.
       if(isContained(callBackWSDataReceivedFuncList, func)) {
           callBackWSDataReceivedFuncList.pop(func);
       }
   }
}
/**
* window.hyconetjs.ex.notifyMessage()
*/
window.hyconetjs.ex.notifyMessage = function(message) {
   for(i = 0; i < callBackWSDataReceivedFuncList.length; i++) {
       callBackWSDataReceivedFuncList[i](message);
   }
}

/**
* window.companionDevice.onCompanionDeviceInitFinishedWrapper()
*/
window.hyconetjs.ex.onCompanionDeviceInitFinishedWrapper = function() {
   //console.log("call window.companionDevice.onCompanionDeviceInitFinished()");
       if(!!window.companionDevice.onCompanionDeviceInitFinished) {
           window.companionDevice.onCompanionDeviceInitFinished();
       }
   }


