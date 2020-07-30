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
// window.companionDevice: Javascript APIs for inter-CompanionCommunication recommended in IPTVFJ STD-0013
// CompanionDevice Object
///////////////////////////////////////////////////////////////////////

window.companionDevice = window.companionDevice || {};
// import hyconet.js
window.hyconetjs = window.hyconetjs || {
     ex: {
         sendWebsocket: function(txt){}
    }
};

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


/**
 * window.companionDevice.sendTextToHostDevice()
 */
window.companionDevice.sendTextToHostDevice = function(msg) {
    hyconetjs.ex.sendWebsocket(msg);
}


/**
 * window.companionDevice.addHostDeviceTextMessageListener()
 */
window.companionDevice.addHostDeviceTextMessageListener = function(func) {
    // Register callback function if not registered.
    if(!isContained(callBackFuncList, func)) {
        callBackFuncList.push(func);
    }
}
/**
 * window.companionDevice.removeHostDeviceTextMessageListener()
 */
window.companionDevice.removeHostDeviceTextMessageListener = function(func) {
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
 * window.companionDevice.notifyMessage()
 */
window.companionDevice.notifyMessage = function(message) {
    for(i = 0; i < callBackFuncList.length; i++) {
        callBackFuncList[i](message);
    }
}
	//
	// call window.companionDevice.onCompanionDeviceInitFinished()
	//
	window.hyconetjs.ex.onCompanionDeviceInitFinishedWrapper();