package jp.or.nhk.rd.hyconet.android.sample;

import android.app.Activity;
import android.os.Message;
import android.webkit.JavascriptInterface;

import org.json.JSONException;
import org.json.JSONObject;

import jp.or.nhk.rd.hyconet4j.HCListener;
import jp.or.nhk.rd.hyconet4j.TVRC;
import jp.or.nhk.rd.hyconet4j.TVRCDevinfo;
import jp.or.nhk.rd.hyconet4j.TVRCMan;
import jp.or.nhk.rd.hyconet4j.TVRCSetURL;
import jp.or.nhk.rd.hyconet4j.TVRCStatus;

import java.lang.Exception;
import java.util.Timer;
import java.util.TimerTask;

/**
 * JavaScriptから利用できるオブジェクトのクラス
 */
class HyconetWebViewJSBinding {
	private HASampleActivity wvactivity = null;
	private TVRCMan tvrcman = null;
	private TVRCDevinfo tvdev = null;
	private String baseURL = "./";

	/**
	 *
	 * @param activity
	 */
	HyconetWebViewJSBinding(Activity activity) {
		wvactivity = (HASampleActivity)activity;
	}

	/**
	 *
	 * @param log
	 */
	private void setWVlog(String log) {
		wvactivity.setlog(log);
	}

	/**
	 *
	 * @param type
	 * @param obj
	 */
	private void activity_sendmsg( HASampleActivity.MessageType type, Object obj) {
		Message msg = new Message();
		msg.arg1 = type.getId();
		msg.obj = obj;
		wvactivity.sendmsg(msg);
	}

	/**
	 *
	 * @throws Throwable
	 */
	@Override
	protected void finalize() throws Throwable {
		super.finalize();
	}

	/**
	 *
	 * @param params
	 */
	@JavascriptInterface
	public void setBaseURL( String params ) {
		setWVlog( "setBaseURL( " +  params + " )" );
		baseURL = params;
	}

	/**
	 *
	 */
	public void setHandler() {
		tvdev.setHCListener(
			new HCListener() {
			    @Override
			    public void setUrlReceived(TVRCSetURL seturl) {
				    setWVlog( "setUrlReceived( " +  seturl.toString() + " )" );

				    if (seturl.eventName.equals("open")) {
					    String url = seturl.url;
					    activity_sendmsg( HASampleActivity.MessageType.URL, url );

					    try{
						    Thread.sleep(3000);
					    }
					    catch(InterruptedException e){
					    	//TODO:forOSS
					    }

					    TimerTask task = new TimerTask() {
						    public void run() {
							    String script = "javascript:onCompanionDeviceInitFinishedWrapper();";
							    activity_sendmsg( HASampleActivity.MessageType.JS, script );
						    }
					    };
					    Timer timer = new Timer();
					    timer.schedule(task, 1000L);
				    }
				    else if (seturl.eventName.equals("close")) {
				    }
			    }

				/**
				 * sendTextReceived
				 * @param str
				 */
			    @Override
			    public void sendTextReceived(String str) {
				    String script = "window.companionDevice.notifyMessage( '%s' );";

				    setWVlog( "sendTextReceived( " +  str + " )" );
				    activity_sendmsg( HASampleActivity.MessageType.JS, String.format(script, str) );
			    }

				/**
				 * wsDataReceived()
				 * @param str
				 */
				@Override
				public void wsDataReceived(String str) {
					String script = "window.appLauncher.notifyMessage( '%s' );";

					setWVlog( "wsDataReceived( " +  str + " )" );
					activity_sendmsg( HASampleActivity.MessageType.JS, String.format(script, str) );
				}
		    }
		);
	}

	/**
	 * searchDevices
	 * @return
	 */
	@JavascriptInterface
	public String searchDevices() {
		setWVlog( "searchDevices()" );
		TVRCStatus status = new TVRCStatus();
		status = wvactivity.getHyconetClientIFImpl().searchDevices();
		return status.toJSONString();
	}


	/**
	 *
	 * @param ipaddr
	 * @return
	 */
	@JavascriptInterface
	public String setDevice( String ipaddr ) {
		setWVlog( "setDevice( " +  ipaddr + " )" );
		TVRCStatus status = new TVRCStatus();
		status = wvactivity.getHyconetClientIFImpl().setDevice(ipaddr);
		return status.toJSONString();
	}

	/**
	 *
	 * @param jsonstr
	 * @return
	 */
	@JavascriptInterface
	public String setDirectDevice(String jsonstr) {
		setWVlog( "setDirectDevice( " +  jsonstr + " )" );
		TVRCStatus status = new TVRCStatus();
		try {
			JSONObject jsobj = new JSONObject(jsonstr);
			TVRCDevinfo tdevinfo = new TVRCDevinfo("HCXPGenericTVRC", jsobj.getString("ipaddr"), "", "", jsobj.getString("applicationUrl"));
			status = wvactivity.getHyconetClientIFImpl().setDevice(tdevinfo);
		}
		catch(JSONException e){
			setWVlog( "setDirectDevice json error" + e );
		}

		return status.toJSONString();
	}

	/**
	 *
	 * @param urlorg
	 */
	@JavascriptInterface
	public void replaceApplication( String urlorg ) {
		setWVlog( "replaceApplication( " + urlorg + " )" );
		try {
			String url = urlorg;
			activity_sendmsg( HASampleActivity.MessageType.URL, url );
		}
		catch(Exception e) {
			//TODO;forOSS
		}
	}

	/**
	 * getDialAppResourceURL()
	 */
	@JavascriptInterface
	public String getDialAppResourceURL() {
		setWVlog( "getDialAppResourceURL()" );
		return (wvactivity.getHyconetClientIFImpl().getDialAppResourceURL()).toJSONString();
	}

	/**
	 * getDialAppInfo()
	 */
	@JavascriptInterface
	public String getDialAppInfo() {
		setWVlog( "getDialAppInfo()" );
		return (wvactivity.getHyconetClientIFImpl().getDialAppInfo()).toJSONString();
	}

	/**
	 * getAvailableMediaFromHostDevice()
	 */
	@JavascriptInterface
	public String getAvailableMediaFromHostDevice( Boolean cache ) {
		setWVlog( "getAvailableMediaFromHostDevice()" );
		return (wvactivity.getHyconetClientIFImpl().getAvailableMediaFromHostDevice()).body.toString();
	}

	/**
	 * getChannelInfoFromHostDevice()
	 */
	@JavascriptInterface
	public String getChannelInfoFromHostDevice( String media, Boolean cache ) {
		setWVlog( String.format("getChannelInfoFromHostDevice( '%s' )", media) );
		return  (wvactivity.getHyconetClientIFImpl().getChannelInfoFromHostDevice(media)).body.toString();
	}

	/**
	 * startAITControlledAppToHostDevice()
	 */
	@JavascriptInterface
	public String startAITControlledAppToHostDevice( String mode, String app ) {
		setWVlog( String.format("startAITControlledAppToHostDevice( '%s' )", mode) );
		return (wvactivity.getHyconetClientIFImpl().startAITControlledAppToHostDevice(mode,app)).body.toString();
	}

	/**
	 * getTaskStatusFromHostDevice()
	 */
	@JavascriptInterface
	public String getTaskStatusFromHostDevice() {
		setWVlog( String.format("getTaskStatusFromHostDevice()") );
		return (wvactivity.getHyconetClientIFImpl().getTaskStatusFromHostDevice()).body.toString();
	}

	/**
	 * getStatusFromHostDevice()
	 */
	@JavascriptInterface
	public String getReceiverStatusFromHostDevice() {
		setWVlog( String.format("getReceiverStatusFromHostDevice()") );
		return (wvactivity.getHyconetClientIFImpl().getReceiverStatusFromHostDevice()).body.toString();
	}

	/**
	 * connWebsocket
	 */
	@JavascriptInterface
	public String connWebsocket() {
		setWVlog( "connWebsocket()" );
		return (wvactivity.getHyconetClientIFImpl().connWebsocket()).body.toString();
	}

	/**
	 * sendTextToHostDevice
	 */
	@JavascriptInterface
	public String disconnWebsocket() {
		setWVlog( "disconnWebsocket()" );
		return (wvactivity.getHyconetClientIFImpl().disconnWebsocket()).body.toString();
	}

	/**
	 * sendTextToHostDevice
	 * @param text
	 */
	@JavascriptInterface
	public void sendTextToHostDevice( String text ) {
		setWVlog( "sendTextToHostDevice( " +  text + " )" );
		wvactivity.getHyconetClientIFImpl().sendTextToHostDevice(text);
	}


/*****
	@JavascriptInterface
	public void launchApp( String params ) {
		Log.i("launchApp: ", params);
		try {
			JSONObject pobj = new JSONObject(params);
			if( pobj.has("action") ) {
				Intent intent = new Intent(Intent.ACTION_MAIN);
				String action =  (String)pobj.get("action") ;
				intent.setAction( action ) ;

				if( pobj.has("packagename") && pobj.has("classname") ) {
					String packagename =  (String)pobj.get("packagename") ;
					String classname =  (String)pobj.get("classname") ;
					intent.setClassName(packagename, classname);
				}

				if( pobj.has("data") ) {
					String data =  (String)pobj.get("data") ;
					intent.setData( Uri.parse( data ) );
				}

				if( pobj.has("flags") ) {
					int flags =  (int)pobj.get("flags") ;
					intent.setFlags(flags);
				}
				//HASampleActivity.getContext().startActivity(intent);
				wvactivity.getContext().startActivity(intent);
			}
		}
		catch(JSONException e) {
		}
	}
*****/
}
