package com.ssafy.sub.pjt.util;

import java.util.Arrays;
import java.util.List;

public class RandomNicknameUtil {

    public static String getRamdomNinkname() {
        return adjective.get((int) (Math.random() * adjective.size()))
                + " "
                + fishname.get((int) (Math.random() * fishname.size()));
    }

    static List<String> adjective =
            Arrays.asList(
                    "귀여운,", "커다란", "부자", "위협하는", "가냘픈", "게으른", "느린", "예쁜", "뛰어난", "반짝이는", "비싼", "빠른",
                    "밝은", "짧은", "느린", "멋진");
    static List<String> fishname =
            Arrays.asList(
                    "가물치", "갈색송어", "꺽지", "끄리", "누치", "메기", "배스", "붕어", "송어", "쏘가리", "은어", "잉어",
                    "향어", "가다랑어", "갈치", "감성돔", "갑오징어", "까치상어", "넙치", "노래미", "농어", "달고기", "대구", "돌돔",
                    "만새기", "방어", "뱅에돔", "보리멸", "뽈락", "붉바리", "삼치", "성대", "쏨뱅이", "옥돔", "용치놀래기", "자리돔",
                    "전갱이", "전어", "주꾸미", "쥐치", "참다랑어", "호박돔", "황어");
}
