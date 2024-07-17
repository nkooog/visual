package bcs.vl.util.crypto;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
/***********************************************************************************************
* Program Name : 암호화유틸(SHA256Crypt.java)
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 암복호화유틸
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
***********************************************************************************************/
public class SHA256Crypt {
	public static String encrypt(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());

        return bytesToHex(md.digest());
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }
}