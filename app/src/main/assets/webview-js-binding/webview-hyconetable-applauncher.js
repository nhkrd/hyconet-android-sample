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
// Hybridcast-Connect Javascript API recommended in IPTVFJ STD-0013
// AppLauncher Object
///////////////////////////////////////////////////////////////////////

window.appLauncher = window.appLauncher || {};


/**
 * window.appLauncher.getAvailableMediaFromHostDevice()
 */
window.appLauncher.getAvailableMediaFromHostDevice = function(cache) {
	return new Promise( function(resolve, reject) {
		var aaa = hyconet.getAvailableMediaFromHostDevice(cache);
//		console.log(aaa);
		var ret = JSON.parse( aaa );
		if( ret.head.code == 200 ) {
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
		if( ret.head.code == 200 ) {
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
		if( ret.head.code == 200 ) {
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
		if( ret.head.code == 200 ) {
			resolve( ret );
		}
		else {
			if( !reject ) {
				reject( ret );
			}
		}
	});
};


