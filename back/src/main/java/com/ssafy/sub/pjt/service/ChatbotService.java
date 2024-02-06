package com.ssafy.sub.pjt.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ChatbotService {
    @Value("${chatbot.secretKey}")
    String secretKey = "";

    @Value("${chatbot.apiURL}")
    String apiURL = "";

    public String chatbot(String inputMessage) {

        String chatbotMessage = "";
        try {
            URL url = new URL(apiURL);

            String message = getReqMessage(inputMessage);
            String encodeBase64String = makeSignature(message, secretKey);

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json;UTF-8");
            con.setRequestProperty("X-NCP-CHATBOT_SIGNATURE", encodeBase64String);

            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(message.getBytes("UTF-8"));
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();

            BufferedReader br;

            if (responseCode == 200) {
                System.out.println(con.getResponseMessage());

                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String decodedString;
                while ((decodedString = in.readLine()) != null) {
                    chatbotMessage = decodedString;
                }

                in.close();
                chatbotMessage = jsonToString(chatbotMessage);
            } else {
                chatbotMessage = con.getResponseMessage();
            }
        } catch (Exception e) {
            log.info("챗봇 api와 연동하는데 문제가 생겼습니다.");
        }
        return chatbotMessage;
    }

    public static String makeSignature(String message, String secretKey) {

        String encodeBase64String = "";

        try {
            byte[] secrete_key_bytes = secretKey.getBytes("UTF-8");
            SecretKeySpec signingKey = new SecretKeySpec(secrete_key_bytes, "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);

            return encodeBase64String;

        } catch (Exception e) {
            log.info("시크릿 키로 시그니처를 만드는데 문제가 생겼습니다.");
        }

        return encodeBase64String;
    }

    public static String getReqMessage(String voiceMessage) {

        String requestBody = "";

        try {
            JSONObject obj = new JSONObject();

            long timestamp = new Date().getTime();
            obj.put("version", "v2");
            obj.put("userId", "U47b00b58c90f8e47428af8b7bddc1231heo2");
            obj.put("timestamp", timestamp);

            JSONObject bubbles_obj = new JSONObject();

            bubbles_obj.put("type", "text");

            JSONObject data_obj = new JSONObject();
            data_obj.put("description", voiceMessage);

            bubbles_obj.put("type", "text");
            bubbles_obj.put("data", data_obj);

            JSONArray bubbles_array = new JSONArray();
            bubbles_array.put(bubbles_obj);

            obj.put("bubbles", bubbles_array);
            obj.put("event", "send");

            requestBody = obj.toString();

        } catch (Exception e) {
            log.info("## Exception : " + e);
        }
        return requestBody;
    }

    public String jsonToString(String jsonResultStr) throws JSONException {
        String resultText = "";
        JSONObject jsonObj = new JSONObject(jsonResultStr);
        JSONArray chatArray = (JSONArray) jsonObj.get("bubbles");
        if (chatArray != null) {
            JSONObject tempObj = (JSONObject) chatArray.get(0);
            JSONObject dataObj = (JSONObject) tempObj.get("data");
            if (dataObj != null) {
                resultText += (String) dataObj.get("description");
            }
        } else {
            log.info("내용이 없습니다.");
        }
        return resultText;
    }
}
