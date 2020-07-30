package jp.or.nhk.rd.hyconet.android.sample;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Message;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

/**
 * FragmentWebView
 */
public class FragmentWebView extends Fragment {
    private View rootView = null;
    private WebView webview = null;

    /**
     *
     * @param type
     * @param obj
     */
    private void activity_sendmsg( HASampleActivity.MessageType type, Object obj) {
        Message msg = new Message();
        msg.arg1 = type.getId();
        msg.obj = obj;
        ((HASampleActivity)getActivity()).sendmsg(msg);
    }


    /**
     * ローカルファイル読み込み
     * @param filepath
     * @return byte[] data
     */
    public byte[] readAssetTextFile(String filepath) {
        byte[] data = null;
        byte[] buf = new byte[1024];

        AssetManager as = ((HASampleActivity)getActivity()).getContext().getResources().getAssets();
        try {
            int readlen;
            InputStream iStream = as.open(filepath);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            while ( (readlen = iStream.read(buf, 0, 1024)) > 0 ) {
//                Log.i("readAssetTextFile:", String.format("readlen: %d", readlen));
                baos.write(buf, 0, readlen );
            }
            baos.close();
            iStream.close();
            data = baos.toByteArray();
        } catch (FileNotFoundException e) {
            Log.i("readAssetTextFile:", String.format("FileNotFoundException: %s, %s", filepath, e.toString()));
        }
        catch (IOException e) {
            Log.i("readAssetTextFile:", String.format("Error: %s, %s", filepath, e.toString()));
        }

        return data;
    }


    /**
     *
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        Log.i("FragmentWebView::" , "onCreateView" );

        if( rootView == null ) {
            rootView = inflater.inflate(R.layout.activity_webview, container, false);
            webview = (WebView) rootView.findViewById(R.id.web_view_name_wv);

            String default_url = Const.TopPageHtmlUrl;

            webview.clearCache(true);
            webview.setWebViewClient(new WebViewClient() {
                public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                    handler.proceed();
                }

                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) {
//                    Log.i("FragmentWebView::", "onPageStarted IN");
                    try {
                        String hyconet_initialize = "";
                        byte[] textbytes = readAssetTextFile(Const.WebviewIFBindingInitialJS);
                        if( textbytes != null ) {
                            hyconet_initialize = new String(textbytes, "UTF-8");

//                            Log.i("FragmentWebView::", String.format("%s", hyconet_initialize));
//                          String hyconet_initialize = "var callBackFuncList = new Array();"
//                                        + "var callBackSearchFuncList = new Array();"
//                                        + "var callBackWSDataReceivedFuncList = new Array();"
//                                        + "if( !window.hyconetjs ) { window.hyconetjs = {}; window.hyconetjs.dd ={}; window.hyconetjs.ex = {}; }"
//                                        + "if( !window.companionDevice ) { window.companionDevice = {}; }"
//                                        + "if( !window.appLauncher ) { window.appLauncher = {}; }" ;

                            webview.evaluateJavascript(hyconet_initialize, null);
                        }
                        else {
                            Log.i("FragmentWebView:", "readAssetTextFile Error");
                        }
                    }
                    catch(UnsupportedEncodingException e) {
                        Log.i("FragmentWebView:", String.format("%s", e.toString()));
                    }
//                    Log.i("FragmentWebView::", "onPageStarted OUT");
                };
                @Override
                public void onPageFinished(WebView view, String url) {
//                    Log.i("FragmentWebView::" , "onPageFinished IN" );
                    String hyconet_webviewIFBinding = "";
                    try {
                        Log.i("FragmentWebView::" , String.format("readAssetTextFile" ));

                        byte[] textbytesExtrajs = readAssetTextFile(Const.WebviewIFBindingExtraJS );
                        byte[] textbytesDiscoveryJS = readAssetTextFile(Const.WebviewIFBindingDiscoveryJS );
                        byte[] textbytesAppLauncherJS = readAssetTextFile(Const.WebviewIFBindingAppLauncherJS );
                        byte[] textbytesCompanionDeviceJS = readAssetTextFile(Const.WebviewIFBindingCompanionDeviceJS );
                        if( (textbytesExtrajs != null)
                            && (textbytesDiscoveryJS != null)
                            && (textbytesAppLauncherJS != null)
                            && (textbytesCompanionDeviceJS != null) ) {
                            String WebviewIFBindingExtraJS = new String(textbytesExtrajs, "UTF-8");
                            String WebviewIFBindingDiscoveryJS = new String(textbytesDiscoveryJS, "UTF-8");
                            String WebviewIFBindingAppLauncherJS = new String(textbytesAppLauncherJS, "UTF-8");
                            String WebviewIFBindingCompanionDeviceJS = new String(textbytesCompanionDeviceJS, "UTF-8");
                            hyconet_webviewIFBinding = WebviewIFBindingExtraJS + WebviewIFBindingDiscoveryJS + WebviewIFBindingAppLauncherJS + WebviewIFBindingCompanionDeviceJS;

//                            Log.i("FragmentWebView::", String.format("%s", WebviewIFBindingExtraJS));
//                            Log.i("FragmentWebView::", String.format("%s", WebviewIFBindingDiscoveryJS));
//                            Log.i("FragmentWebView::", String.format("%s", WebviewIFBindingAppLauncherJS));
//                            Log.i("FragmentWebView::", String.format("%s", WebviewIFBindingCompanionDeviceJS));

//                          webview.evaluateJavascript("var script=document.createElement('script');script.src='" + Const.WebviewIFBindingExtraJS + "';document.body.appendChild(script);", null);
//                          webview.evaluateJavascript("var script=document.createElement('script');script.src='" + Const.WebviewIFBindingDiscoveryJS + "';document.body.appendChild(script);", null);
//                          webview.evaluateJavascript("var script=document.createElement('script');script.src='" + Const.WebviewIFBindingAppLauncherJS + "';document.body.appendChild(script);", null);
//                          webview.evaluateJavascript("var script=document.createElement('script');script.src='" + Const.WebviewIFBindingCompanionDeviceJS + "';document.body.appendChild(script);", null);

                            webview.evaluateJavascript(hyconet_webviewIFBinding, null);
                        }
                        else {
                            Log.i("FragmentWebView:", "readAssetTextFile Error");
                        }
                    }
                    catch(UnsupportedEncodingException e) {
                        Log.i("FragmentWebView:", String.format("%s", e.toString()));
                    }
//                    Log.i("FragmentWebView::", "onPageFinished OUT");
                };
            });

            webview.setInitialScale(1);
            webview.getSettings().setJavaScriptEnabled(true);
            webview.getSettings().setDomStorageEnabled(true);
            webview.getSettings().setUseWideViewPort(true);
            webview.getSettings().setLoadWithOverviewMode(true);
            webview.getSettings().setBuiltInZoomControls(true);
            webview.getSettings().setSupportZoom(true);
            webview.setWebChromeClient(new WebChromeClient());

            // JavaScript側へオブジェクトを追加する
            webview.addJavascriptInterface(new HyconetWebViewJSBinding(getActivity()), Const.WebviewHyconetObjectName);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                webview.setWebContentsDebuggingEnabled(true);
            }

            //    webview.loadUrl(default_url);
            activity_sendmsg(HASampleActivity.MessageType.URL, default_url);
        }

        return rootView;
    }
}