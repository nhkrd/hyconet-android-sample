package jp.or.nhk.rd.hyconet.android.sample;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

/**
 *
 */
public class HASampleReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if( intent.getAction().equals("jp.or.nhk.rd.hyconet.android.sample.intent.action.LAUNCH_WS") ) {
            Log.i("hyconet.android", "Receive LAUNCH_WS intent");

            Bundle extras = intent.getExtras();
            int antWappMobile = Log.i("hyconet.android", "setClassName[HASampleActivity]");
            intent.setClassName("jp.or.nhk.rd.hyconet.android.sample", "jp.or.nhk.rd.hyconet.android.sample.HASampleActivity");

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
            context.startActivity(intent);
        }
    }
}
