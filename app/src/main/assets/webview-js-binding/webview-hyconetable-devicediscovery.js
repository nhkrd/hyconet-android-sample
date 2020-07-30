///////////////////////////////////////////////////////////////////////
// Implementation of hyconet Javascript Interface
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
// HybridcastConnect hyconet Javascript API
///////////////////////////////////////////////////////////////////////

/*****************************************************************************
 * window.hyconetjs.* : DeviceDiscovery APIs to utilize Hybridcast-Connect device control APIs recommended in IPTVFJ STD-0013.
 * hyconetjs object
 ****************************************************************************/

 window.hyconetjs = window.hyconetjs || {};
 window.hyconetjs.dd = window.hyconetjs.dd || {};

/**
 * window.hyconetjs.dd.setDevice()
 */
window.hyconetjs.dd.setDevice = function(addr) {
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
 * window.hyconetjs.dd.setDirectDevice()
 */
window.hyconetjs.dd.setDirectDevice = function(jsonstr) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.setDirectDevice(jsonstr) );
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
 * window.hyconetjs.dd.unsetDevice()
 */
window.hyconetjs.dd.unsetDevice = function() {
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
 * window.hyconetjs.dd.getDevinfo()
 */
window.hyconetjs.dd.getDevinfo = function() {
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
 * window.hyconetjs.dd.searchDevices()
 */
window.hyconetjs.dd.searchDevices = function() {
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
 * window.hyconetjs.dd.getDialAppInfo()
 */	
window.hyconetjs.dd.getDialAppInfo = function() {
	return new Promise( function(resolve, reject) {
		var retjson = hyconet.getDialAppInfo();
		console.log(retjson);
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

/**
 * window.hyconetjs.dd.setBaseURL()
 */
window.hyconetjs.dd.setBaseURL = function(url) {
	return new Promise( function(resolve, reject) {
		var ret = JSON.parse( hyconet.setBaseURL(url) );
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



