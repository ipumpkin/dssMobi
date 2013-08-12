package com.tydic.gs.plugin;

import java.util.List;

import android.content.Context;
import android.telephony.CellLocation;
import android.telephony.NeighboringCellInfo;
import android.telephony.TelephonyManager;

/**
 * class name��SIMCardInfo<BR>
 * class description����ȡSim����Ϣ<BR>
 * PS�� �����ڼ������Ȩ�� <BR>
 * Date:2012-3-12<BR>
 * 
 * @version 1.00
 * @author CODYY)peijiangping
 */
public class SIMCardInfo {
	/**
	 * TelephonyManager�ṩ�豸�ϻ�ȡͨѶ������Ϣ����ڡ� Ӧ�ó������ʹ������෽��ȷ���ĵ��ŷ����̺͹�� �Լ�ĳЩ���͵��û�������Ϣ��
	 * Ӧ�ó���Ҳ����ע��һ�����������绰��״̬�ı仯������Ҫֱ��ʵ�������
	 * ʹ��Context.getSystemService(Context.TELEPHONY_SERVICE)����ȡ������ʵ��
	 */
	private TelephonyManager telephonyManager;
	/**
	 * ����ƶ��û�ʶ����
	 */
	private String IMSI;

	public String getIMSI() {
		IMSI = telephonyManager.getSubscriberId();
		return IMSI;
	}

	public SIMCardInfo(Context context) {
		telephonyManager = (TelephonyManager) context
				.getSystemService(Context.TELEPHONY_SERVICE);
	}

	/**
	 * Role:��ȡ��ǰ���õĵ绰���� <BR>
	 * Date:2012-3-12 <BR>
	 * @author CODYY)peijiangping
	 */
	public String getNativePhoneNumber() {
		String NativePhoneNumber = null;
		NativePhoneNumber = telephonyManager.getLine1Number();
		return NativePhoneNumber;
	}

	/**
	 * Role:Telecom service providers��ȡ�ֻ��������Ϣ <BR>
	 * ��Ҫ����Ȩ��<uses-permission
	 * android:name="android.permission.READ_PHONE_STATE"/> <BR>
	 * Date:2012-3-12 <BR>
	 * 
	 * @author CODYY)peijiangping
	 */
	public String getProvidersName() {
		String ProvidersName = null;
		// ����Ψһ���û�ID;�������ſ��ı�������
		IMSI = telephonyManager.getSubscriberId();
		// IMSI��ǰ��3λ460�ǹ�ң������ź���2λ00 02���й��ƶ���01���й���ͨ��03���й���š�
		// System.out.println(IMSI);
		if (IMSI.startsWith("46000") || IMSI.startsWith("46002")) {
			ProvidersName = "�й��ƶ�";
		} else if (IMSI.startsWith("46001")) {
			ProvidersName = "�й���ͨ";
		} else if (IMSI.startsWith("46003")) {
			ProvidersName = "�й����";
		}
		return ProvidersName;
	}

	/**
	 * �绰״̬��<br/>
	 * CALL_STATE_IDLE ���κ�״̬ʱ<br/>
	 * CALL_STATE_OFFHOOK ����绰ʱ<br/>
	 * CALL_STATE_RINGING �绰����ʱ
	 * 
	 * @return
	 */
	public int getCallState() {
		return telephonyManager.getCallState();
	}

	/**
	 * ���ص�ǰ�ƶ��ն˵�λ�� <br/>
	 * 
	 * @return
	 */
	public CellLocation getCellLocation() {
		CellLocation location = telephonyManager.getCellLocation();

		// ����λ�ø��£������½�����㲥�����ն���Ϊע��LISTEN_CELL_LOCATION�Ķ�����Ҫ��permission���ΪACCESS_COARSE_LOCATION��
		// location.requestLocationUpdate();

		return location;
	}

	/**
	 * Ψһ���豸ID��<br/>
	 * �����GSM���磬����IMEI�������CDMA���磬����MEID<br/>
	 * ��ҪȨ�ޣ�android.permission.READ_PHONE_STATE
	 * 
	 * @return null if device ID is not available.
	 */
	public String getDeviceId() {
		return telephonyManager.getDeviceId();
	}

	/**
	 * �����ƶ��ն˵�����汾��<br/>
	 * ���磺GSM�ֻ��IMEI/SV�롣<br/>
	 * 
	 * @return null if the software version is not available.
	 */
	public String getDeviceSoftwareVersion() {
		return telephonyManager.getDeviceSoftwareVersion();
	}

	/**
	 * �ֻ�ţ�<br/>
	 * ����GSM������˵��MSISDN
	 * 
	 * @return null if it is unavailable.
	 */
	public String getLine1Number() {
		return telephonyManager.getLine1Number();
	}

	/**
	 * ���ص�ǰ�ƶ��ն˸����ƶ��ն˵���Ϣ:<br/>
	 * ���ͣ�List<NeighboringCellInfo><br/>
	 * ��ҪȨ�ޣ�android.Manifest.permission#ACCESS_COARSE_UPDATES
	 * 
	 * @return
	 */
	public List<NeighboringCellInfo> getNeighboringCellInfo() {
		// List<NeighboringCellInfo> infos =
		// telephonyManager.getNeighboringCellInfo();
		// for (NeighboringCellInfo info : infos) {
		// // ��ȡ�ھ�С���
		// int cid = info.getCid();
		//
		// // ��ȡ�ھ�С��LAC��LAC:
		// // λ�������롣Ϊ��ȷ���ƶ�̨��λ�ã�ÿ��GSM/PLMN�ĸ��������ֳ����λ����LAC�����ڱ�ʶ��ͬ��λ����
		// info.getLac();
		// info.getNetworkType();
		// info.getPsc();
		//
		// // ��ȡ�ھ�С���ź�ǿ��
		// info.getRssi();
		// }

		return telephonyManager.getNeighboringCellInfo();
	}

	/**
	 * ��ȡISO��׼�Ĺ���룬����ʳ�;��š�<br/>
	 * ע�⣺�����û���������ע�����Ч��<br/>
	 * ��CDMA�����н��Ҳ�?�ɿ���<br/>
	 * 
	 * @return
	 */
	public String getNetworkCountryIso() {
		return telephonyManager.getNetworkCountryIso();
	}

	/**
	 * MCC+MNC(mobile country code + mobile network code)<br/>
	 * ע�⣺�����û���������ע��ʱ��Ч��<br/>
	 * ��CDMA�����н��Ҳ�?�ɿ���<br/>
	 * 
	 * @return
	 */
	public String getNetworkOperator() {
		return telephonyManager.getNetworkOperator();
	}

	/**
	 * ������ĸ�����current registered operator(��ǰ��ע����û�)������<br/>
	 * ע�⣺�����û���������ע��ʱ��Ч��<br/>
	 * ��CDMA�����н��Ҳ�?�ɿ���
	 * 
	 * @return
	 */
	public String getNetworkOperatorName() {
		return telephonyManager.getNetworkOperatorName();
	}

	/**
	 * ��ǰʹ�õ��������ͣ�<br/>
	 * NETWORK_TYPE_UNKNOWN ��������δ֪ 0<br/>
	 * NETWORK_TYPE_GPRS GPRS���� 1<br/>
	 * NETWORK_TYPE_EDGE EDGE���� 2<br/>
	 * NETWORK_TYPE_UMTS UMTS���� 3<br/>
	 * NETWORK_TYPE_HSDPA HSDPA���� 8<br/>
	 * NETWORK_TYPE_HSUPA HSUPA���� 9<br/>
	 * NETWORK_TYPE_HSPA HSPA���� 10<br/>
	 * NETWORK_TYPE_CDMA CDMA����,IS95A �� IS95B. 4<br/>
	 * NETWORK_TYPE_EVDO_0 EVDO����, revision 0. 5<br/>
	 * NETWORK_TYPE_EVDO_A EVDO����, revision A. 6<br/>
	 * NETWORK_TYPE_1xRTT 1xRTT���� 7<br/>
	 * ���й���ͨ��3GΪUMTS��HSDPA���ƶ�����ͨ��2GΪGPRS��EGDE�����ŵ�2GΪCDMA�����ŵ�3GΪEVDO<br/>
	 * 
	 * @return
	 */
	public int getNetworkType() {
		return telephonyManager.getNetworkType();
	}

	/**
	 * �����ƶ��ն˵����ͣ�<br/>
	 * PHONE_TYPE_CDMA �ֻ���ʽΪCDMA������<br/>
	 * PHONE_TYPE_GSM �ֻ���ʽΪGSM���ƶ�����ͨ<br/>
	 * PHONE_TYPE_NONE �ֻ���ʽδ֪<br/>
	 * 
	 * @return
	 */
	public int getPhoneType() {
		return telephonyManager.getPhoneType();
	}

	/**
	 * ��ȡISO����룬�൱���ṩSIM���Ĺ���롣
	 * 
	 * @return Returns the ISO country code equivalent for the SIM provider's
	 *         country code.
	 */
	public String getSimCountryIso() {
		return telephonyManager.getSimCountryIso();
	}

	/**
	 * ��ȡSIM���ṩ���ƶ��������ƶ�������.5��6λ��ʮ��������.<br/>
	 * SIM����״̬������ SIM_STATE_READY(ʹ��getSimState()�ж�).
	 * 
	 * @return Returns the MCC+MNC (mobile country code + mobile network code)
	 *         of the provider of the SIM. 5 or 6 decimal digits.
	 */
	public String getSimOperator() {
		return telephonyManager.getSimOperator();
	}

	/**
	 * ��������ƣ�<br/>
	 * ���磺�й��ƶ�����ͨ<br/>
	 * SIM����״̬������ SIM_STATE_READY(ʹ��getSimState()�ж�).
	 * 
	 * @return
	 */
	public String getSimOperatorName() {
		return telephonyManager.getSimOperatorName();
	}

	/**
	 * SIM�������кţ�<br/>
	 * ��ҪȨ�ޣ�READ_PHONE_STATE
	 * 
	 * @return
	 */
	public String getSimSerialNumber() {
		return telephonyManager.getSimSerialNumber();
	}

	/**
	 * SIM��״̬��Ϣ��<br/>
	 * SIM_STATE_UNKNOWN δ֪״̬ 0<br/>
	 * SIM_STATE_ABSENT û�忨 1<br/>
	 * SIM_STATE_PIN_REQUIRED ��״̬����Ҫ�û���PIN����� 2<br/>
	 * SIM_STATE_PUK_REQUIRED ��״̬����Ҫ�û���PUK����� 3<br/>
	 * SIM_STATE_NETWORK_LOCKED ��״̬����Ҫ�����PIN����� 4<br/>
	 * SIM_STATE_READY ����״̬ 5
	 * 
	 * @return
	 */
	public int getSimState() {
		return telephonyManager.getSimState();
	}

	/**
	 * Ψһ���û�ID��<br/>
	 * ���磺IMSI(����ƶ��û�ʶ����) for a GSM phone.<br/>
	 * ��ҪȨ�ޣ�READ_PHONE_STATE
	 * 
	 * @return
	 */
	public String getSubscriberId() {
		return telephonyManager.getSubscriberId();
	}

	/**
	 * ȡ�ú������ʼ���صı�ǩ����Ϊʶ���<br/>
	 * ��ҪȨ�ޣ�READ_PHONE_STATE
	 * 
	 * @return
	 */
	public String getVoiceMailAlphaTag() {
		return telephonyManager.getVoiceMailAlphaTag();
	}

	/**
	 * ��ȡ�����ʼ����룺<br/>
	 * ��ҪȨ�ޣ�READ_PHONE_STATE
	 * 
	 * @return
	 */
	public String getVoiceMailNumber() {
		return telephonyManager.getVoiceMailNumber();
	}

	/**
	 * ICC���Ƿ����
	 * 
	 * @return
	 */
	public boolean hasIccCard() {
		return telephonyManager.hasIccCard();
	}

	/**
	 * �Ƿ�����:(��GSM��;��)
	 * 
	 * @return
	 */
	public boolean isNetworkRoaming() {
		return telephonyManager.isNetworkRoaming();
	}

	/**
	 * ��ȡ��ݻ״̬<br/>
	 * DATA_ACTIVITY_IN �������״̬��������ڽ������<br/>
	 * DATA_ACTIVITY_OUT �������״̬��������ڷ������<br/>
	 * DATA_ACTIVITY_INOUT �������״̬��������ڽ��ܺͷ������<br/>
	 * DATA_ACTIVITY_NONE �������״̬�����������ݷ��ͺͽ���<br/>
	 * 
	 * @return
	 */
	public int getDataActivity() {
		return telephonyManager.getDataActivity();
	}

	/**
	 * ��ȡ�������״̬<br/>
	 * DATA_CONNECTED �������״̬��������<br/>
	 * DATA_CONNECTING �������״̬����������<br/>
	 * DATA_DISCONNECTED �������״̬���Ͽ�<br/>
	 * DATA_SUSPENDED �������״̬����ͣ<br/>
	 * 
	 * @return
	 */
	public int getDataState() {
		return telephonyManager.getDataState();
	}

}
