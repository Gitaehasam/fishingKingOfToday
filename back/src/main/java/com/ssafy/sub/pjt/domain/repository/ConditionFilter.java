package com.ssafy.sub.pjt.domain.repository;

import static com.ssafy.sub.pjt.domain.QBoard.board;

import com.querydsl.core.BooleanBuilder;
import com.ssafy.sub.pjt.domain.BoardSearchCondition;
import org.springframework.stereotype.Component;

@Component
public class ConditionFilter {

    public BooleanBuilder filterByCondition(BoardSearchCondition condition) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        filterByCategory(booleanBuilder, condition.getCategoryId());
        filterByFishBook(booleanBuilder, condition.getFishBookId());
        filterByHashTag(booleanBuilder, condition.getHashTagId());

        return booleanBuilder;
    }

    private void filterByFishBook(BooleanBuilder booleanBuilder, Integer fishBookId) {
        if (fishBookId != null) {
            booleanBuilder.and(board.fishBook.id.eq(fishBookId));
        }
    }

    private void filterByHashTag(BooleanBuilder booleanBuilder, Integer hashTagId) {
        if (hashTagId != null) {
            booleanBuilder.and(board.boardHashTags.any().hashTag.id.eq(hashTagId));
        }
    }

    private void filterByCategory(BooleanBuilder booleanBuilder, Integer categoryId) {
        booleanBuilder.and(board.category.id.eq(categoryId));
    }
}
