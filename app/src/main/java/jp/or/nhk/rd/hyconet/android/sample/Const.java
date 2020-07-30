package jp.or.nhk.rd.hyconet.android.sample ;

/**
 * Const
 */
class Const {
	static class Status {
		public int Code;
		public String Message;

		public Status(int c, String m) {
			this.Code = c;
			this.Message = m;
		}

		final static Status OK = new Status( 200, "OK");
		final static Status BadRequest = new Status( 400, "BadRequest");

		//Internal Error
		final static Status BadRequestInternalProcessing = new Status( 51400, "Bad Request InternalProcessing");
		final static Status NotFoundInternalProcessing = new Status( 51404, "Not Found InternalProcessing");
		final static Status DenyInternalProcessing = new Status( 51500, "Deny InternalProcessing");
		final static Status InternalServerError = new Status( 51500, "InternalServerError");
	}

	final static String TopPageHtmlUrl = "file:///android_asset/index.html";
	final static String WebviewIFBindingInitialJS = "webview-js-binding/webview-hyconetable-initialize.js";
	final static String WebviewIFBindingExtraJS = "webview-js-binding/webview-hyconetable-extra.js";
	final static String WebviewIFBindingDiscoveryJS = "webview-js-binding/webview-hyconetable-devicediscovery.js";
	final static String WebviewIFBindingAppLauncherJS = "webview-js-binding/webview-hyconetable-applauncher.js";
	final static String WebviewIFBindingCompanionDeviceJS = "webview-js-binding/webview-hyconetable-companiondevice.js";
	final static String WebviewHyconetObjectName = "hyconet";
}
