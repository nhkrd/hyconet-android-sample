package jp.or.nhk.rd.hyconet.android.sample;

import android.os.Bundle;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

/**
 * FragmentSetting
 */
public class FragmentSetting extends Fragment {
    private static Boolean viewCreated = false;

    private static Button  btnDevsearch = null;
    private static Button  btnDevsel = null;
    private static Spinner spinnerDev = null;

    private static String[] spinnerItems = null;

    /**
     *
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        Log.i("FragmentSetting::" , "onCreateView" );

        return inflater.inflate(R.layout.setting, container, false);
    }

    /**
     *
     * @param outState
     */
    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        Log.i("FragmentSetting::" , "onSaveInstanceState" );
    }

    /**
     * Viewが生成し終わった時に呼ばれるメソッド
     * @param view
     * @param savedInstanceState
     */
    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Button search
        btnDevsearch = view.findViewById(R.id.devsearch);
        btnDevsearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ((HASampleActivity) getActivity()).setlog("Search Start");

                btnDevsel.setEnabled(false);
                // ArrayAdapter
                String[] vacantItems = {};
                ArrayAdapter<String> adapter = new ArrayAdapter<String>(((HASampleActivity)getActivity()).getContext(), android.R.layout.simple_spinner_item, vacantItems);
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // spinner に adapter をセット
                spinnerDev.setAdapter(adapter);

                ((HASampleActivity)getActivity()).getHyconetClientIFImpl().search("");
            }
        });

        // Button device select
        btnDevsel = view.findViewById(R.id.devselect);
        btnDevsel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String item = ((String) spinnerDev.getSelectedItem()).split(":")[0];  //ipaddr

                ((HASampleActivity) getActivity()).setlog("Device Selected:" + item);
                ((HASampleActivity)getActivity()).getHyconetClientIFImpl().setDevice(item);

                ((HASampleActivity)getActivity()).getHyconetClientIFImpl().getDialAppResourceURL();
                ((HASampleActivity)getActivity()).getHyconetClientIFImpl().getDialAppInfo();
            }
        });
        btnDevsel.setEnabled(false);

        spinnerDev = view.findViewById(R.id.devlist);

        if( spinnerItems != null ) {
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(((HASampleActivity)getActivity()).getContext(), android.R.layout.simple_spinner_item, spinnerItems);
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
            // spinner に adapter をセット
            spinnerDev.setAdapter(adapter);

            btnDevsel.setEnabled(true);
        }

        viewCreated = true ;
    }

    /**
     *
     * @param msg
     */
    public void dispDevInfo(Message msg) {
        spinnerItems = (String[])msg.obj;

        Log.i("FragmentSetting::" , "dispDevInfo" );

        // ArrayAdapter
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(((HASampleActivity)getActivity()).getContext(), android.R.layout.simple_spinner_item, spinnerItems);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // spinner に adapter をセット
        spinnerDev.setAdapter(adapter);

        btnDevsel.setEnabled(true);
    }
}