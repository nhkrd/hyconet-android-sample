package jp.or.nhk.rd.hyconet.android.sample;

import java.util.ArrayList;
import android.app.Activity;
import android.util.Log;

import org.json.JSONjava.JSONArray;
import org.json.JSONjava.JSONObject;

import jp.or.nhk.rd.hyconet4j.TVRCDevinfo;
import jp.or.nhk.rd.hyconet4j.TVRCMan;
import jp.or.nhk.rd.hyconet4j.TVRCStatus;

/**
 * HyconetClientIFImpl
 */
public class HyconetClientIFImpl  {
    private HASampleActivity wvactivity = null;

    private TVRCMan tvrcman = null;
    private TVRCDevinfo tvdev = null;

    private static Boolean isSearch = false;

    /**
     *
     * @param activity
     */
    public HyconetClientIFImpl(Activity activity) {
        wvactivity = (HASampleActivity)activity;

        tvrcman = new TVRCMan() {
          private int devcount = 0 ;
          public void devinfo(TVRCDevinfo devinfo) {
              Log.i("HyconetClientIFImpl::" , "devinfo::" + devinfo.modelName );
              wvactivity.setlog( "devinfo::" + devinfo.get_maker() + "/" + devinfo.modelName );
          }
        };
    }


    /**
     * search (from Native Interface)
     * @param params
     * @return
     */
    public String search( String params ) {
        if( isSearch == false ) {
            isSearch = true;

            new Thread(new Runnable() {
                public void run() {
                    try {
                        while (true) {
                            tvrcman.getTVRCDevList().clear();
                            try {
                                tvrcman.searchStart();
                                Thread.sleep(7000);
                                tvrcman.searchStop();
                            }
                            catch (InterruptedException e) {
                                //TODO:forOSS
                            }

                            //探索結果の取得と表示
                            if (tvrcman.getTVRCDevList().size() >= 1) {
                                int tvnumber = 0;
                                //tvdev = tvrcman.getTVRCDevinfo(tvnumber);
                                break;
                            }
                        }
                        isSearch = false;

                        ArrayList<String> devs = new ArrayList<String>();
                        for (int i = 0; i < tvrcman.getTVRCDevList().size(); i++) {
                            TVRCDevinfo devtmp = tvrcman.getTVRCDevinfo(i);
                            devs.add( devtmp.ipaddr + ":" + devtmp.friendlyName );
                        }
                        String[] devinfo = (String[])devs.toArray(new String[devs.size()]);
                        wvactivity.dispDevInfo( devinfo );
                    }
                    catch (Exception e) {
                        //TODO:forOSS
                    }
                }
            }).start();
        }

        return "";
    }

    /**
     * searchDevices (from Webview Interface)
     * @return
     */
    public TVRCStatus searchDevices() {
//        setWVlog( "searchDevices()" );
        TVRCStatus status = new TVRCStatus();
        status.setStatus(Const.Status.OK.Code, "{}", "" );
        try{
            tvrcman.searchStart();
            Thread.sleep(7000);
            tvrcman.searchStop();

            JSONArray resarray = new JSONArray();
            for (int i = 0; i < tvrcman.getTVRCDevList().size(); i++) {
                TVRCDevinfo devtmp = tvrcman.getTVRCDevinfo(i);
                JSONObject res = new JSONObject();
                res.put("ipaddr", devtmp.ipaddr);
                res.put("maker", devtmp.get_maker());
                res.put("friendlyName", devtmp.friendlyName);
                resarray.put(res);
            }
            String devinfo = resarray.toString();
            status.setStatus(Const.Status.OK.Code, devinfo, "" );
        }
        catch(InterruptedException e){
            //TODO:forOSS
            //String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Search Error\" }";
            String body = "{}";
            status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Search Error");
        }

        return  status;
    }

    /**
     * setDevice (by IP Address)
     * @param ipaddr
     * @return
     */
    public TVRCStatus setDevice( String ipaddr ) {
//        setWVlog( "setDevice( " +  ipaddr + " )" );
        TVRCStatus status = new TVRCStatus();
        status.setStatus(Const.Status.NotFoundInternalProcessing.Code, "", "Device not found" );

        for( int i=0; i < tvrcman.getTVRCDevList().size(); i++ ) {
            Log.i( "setDevice", "DevIpaddr: " + tvrcman.getTVRCDevinfo(i).ipaddr) ;
            if(tvrcman.getTVRCDevinfo(i).ipaddr.equals( ipaddr )){
                Log.i( "setDevice", "DevIpaddr: " + ipaddr) ;

                tvdev = tvrcman.getTVRCDevinfo(i);
                status.setStatus(Const.Status.OK.Code, "", "" );
                break;
            }
        }

        return status;
    }

    /**
     * setDevice (Direct)
     * @param _tvdev
     * @return
     */
    public TVRCStatus setDevice( TVRCDevinfo _tvdev ) {
        TVRCStatus status = new TVRCStatus();
        status.setStatus(Const.Status.OK.Code, "", "" );

        tvdev = _tvdev;

        return status;
    }

    /**
     * getDialAppResourceURL()
     */
    public TVRCStatus getDialAppResourceURL() {
//        setWVlog( "getReceiverStatusURL()" );
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getDialAppResourceURL();
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * getDialAppInfo()
     */
    public TVRCStatus getDialAppInfo() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getDialAppInfo();
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }


    /**
     * getAvailableMediaFromHostDevice()
     */
    public TVRCStatus getAvailableMediaFromHostDevice() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getAvailableMedia();
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * getChannelInfoFromHostDevice()
     */
    public TVRCStatus getChannelInfoFromHostDevice( String media ) {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getChannelInfo(media);
            } catch (Exception e) {
//            setWVlog( String.format("getChannelInfoFromHostDevice() Error") );
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * startAITControlledAppToHostDevice()
     */
    public TVRCStatus startAITControlledAppToHostDevice( String mode, String app ) {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.startAITControlledApp(mode, app);
            } catch (Exception e) {
//            setWVlog( String.format("startAITControlledAppToHostDevice() Error") );
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * getTaskStatusFromHostDevice()
     */
    public TVRCStatus getTaskStatusFromHostDevice() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getTaskStatus();
            } catch (Exception e) {
//            setWVlog( String.format("getTaskStatusFromHostDevice() Error") );
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * getStatusFromHostDevice()
     */
    public TVRCStatus getReceiverStatusFromHostDevice() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.getReceiverStatus();
            } catch (Exception e) {
//            setWVlog( String.format("getStatusFromHostDevice() Error") );
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * connWebsocket()
     */
    public TVRCStatus connWebsocket() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.connWebsocket();
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * disconnWebsocket()
     */
    public TVRCStatus disconnWebsocket() {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.disconnWebsocket();
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }

    /**
     * sendTextToHostDevice()
     */
    public TVRCStatus sendTextToHostDevice(String text) {
        TVRCStatus status = new TVRCStatus();
        if( tvdev != null ) {
            try {
                status = tvdev.sendTextToHostDeviceOverWS(text);
            } catch (Exception e) {
                //TODO:forOSS
                String body = "{\"head\":" + Const.Status.DenyInternalProcessing.Code + ", \"message\":\"Exception Occurred\" }";
                status.setStatus(Const.Status.DenyInternalProcessing.Code, body, "Exception Occurred");
            }
        }
        else {
            //TODO:forOSS
            String body = "{\"head\":" + Const.Status.BadRequestInternalProcessing.Code + ", \"message\":\"Device is NULL\" }";
            status.setStatus(Const.Status.BadRequestInternalProcessing.Code, body, "Device is NULL");
        }

        return status;
    }
}