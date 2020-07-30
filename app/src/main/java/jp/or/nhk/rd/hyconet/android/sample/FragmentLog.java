package jp.or.nhk.rd.hyconet.android.sample;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

/**
 * FragmentLog
 */
public class FragmentLog extends Fragment {
    private TextView mTextView = null;

    /**
     *
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        Log.i("FragmentLog::" , "onCreateView" );

        return inflater.inflate(R.layout.log, container, false);
    }

    /**
     * Viewが生成し終わった時に呼ばれるメソッド
     * @param view
     * @param savedInstanceState
     */
    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mTextView = (TextView) view.findViewById(R.id.logtext);
        mTextView.setFocusable(false);
    }

    /**
     * logtext
     * @param str
     */
    public void logtext(String str) {
        if( mTextView != null ) {
            String log = mTextView.getText().toString();
            if (!log.equals("")) {
                log = log + "\n";
            }
            log = log + str;
            mTextView.setText(log);
        }
    }
}