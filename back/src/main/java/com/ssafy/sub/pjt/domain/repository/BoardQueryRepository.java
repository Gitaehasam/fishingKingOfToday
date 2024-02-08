package com.ssafy.sub.pjt.domain.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.ssafy.sub.pjt.domain.QBoard.board;
import static com.ssafy.sub.pjt.domain.QBoardHashTag.boardHashTag;
import static com.ssafy.sub.pjt.domain.QFishBook.fishBook;
import static com.ssafy.sub.pjt.domain.QHashTag.hashTag;
import static com.ssafy.sub.pjt.domain.QUser.user;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.sub.pjt.domain.BoardData;
import com.ssafy.sub.pjt.domain.BoardSearchCondition;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BoardQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final ConditionFilter conditionFilter;

    public Slice<BoardData> searchBy(
            final BoardSearchCondition boardSearchCondition, final Pageable pageable) {
        final List<BoardData> boards =
                jpaQueryFactory
                        .select(makeProjections())
                        .from(board)
                        .where(conditionFilter.filterByCondition(boardSearchCondition))
                        .join(board.user, user)
                        .distinct()
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize() + 1)
                        .orderBy(
                                orderByCondition(boardSearchCondition.getSortType())
                                        .toArray(OrderSpecifier[]::new))
                        .fetch();

        if (boardSearchCondition.getCategoryId() == 2) {
            setHashTagName(boards);
        } else if (boardSearchCondition.getCategoryId() == 1) {
            setFishName(boards);
        }

        return new SliceImpl<BoardData>(
                getCurrentPageBoards(boards, pageable), pageable, hasNext(boards, pageable));
    }

    private static ConstructorExpression<BoardData> makeProjections() {
        return Projections.constructor(
                BoardData.class,
                board.user.nickName,
                board.user.imageUrl,
                board.id,
                board.image,
                board.fishBook.name,
                board.content,
                board.createdAt,
                board.comments.size(),
                board.likes.size());
    }

    private Map<Integer, List<String>> findHashTagNameMap(List<Integer> boardIds) {
        return jpaQueryFactory
                .from(board)
                .leftJoin(board.boardHashTags, boardHashTag)
                .leftJoin(boardHashTag.hashTag, hashTag)
                .where(board.id.in(boardIds))
                .transform(groupBy(board.id).as(GroupBy.list(hashTag.name)));
    }

    private void setHashTagName(List<BoardData> fetch) {
        List<Integer> boardIds = toBoardIds(fetch);
        Map<Integer, List<String>> keywordNameMap = findHashTagNameMap(boardIds);
        fetch.forEach(o -> o.setHashTags(keywordNameMap.get(o.getBoardId())));
    }

    private Map<Integer, List<String>> findFishNameMap(List<Integer> boardIds) {
        return jpaQueryFactory
                .from(board)
                .leftJoin(board.fishBook, fishBook)
                .where(board.id.in(boardIds))
                .transform(GroupBy.groupBy(board.id).as(GroupBy.list(fishBook.name)));
    }

    private void setFishName(List<BoardData> fetch) {
        Map<Integer, List<String>> fishNameMap = findFishNameMap(toBoardIds(fetch));
        fetch.forEach(o -> o.setFishName(fishNameMap.get(o.getBoardId()).get(0)));
    }

    private List<Integer> toBoardIds(List<BoardData> result) {
        return result.stream().map(BoardData::getBoardId).collect(Collectors.toList());
    }

    private List<OrderSpecifier<?>> orderByCondition(String sortType) {
        List<OrderSpecifier<?>> orderBy = new LinkedList<>();

        if (sortType.equals("comments")) {
            orderBy.add(board.comments.size().desc());
        } else if (sortType.equals("likes")) {
            orderBy.add(board.likes.size().desc());
        } else {
            orderBy.add(board.createdAt.desc());
        }

        return orderBy;
    }

    private List<BoardData> getCurrentPageBoards(
            final List<BoardData> boards, final Pageable pageable) {
        if (hasNext(boards, pageable)) {
            return boards.subList(0, boards.size() - 1);
        }
        return boards;
    }

    private boolean hasNext(final List<BoardData> challenges, final Pageable pageable) {
        return challenges.size() > pageable.getPageSize();
    }
}
