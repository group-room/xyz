import React from "react";
import Container from "../common/Container";
import { MemoryCommentTypes } from "@/types/memory";
import CommentCreate from "./CommentCreate";
import CommentItem from "./CommentItem";

interface CommentProps {
  memorySeq: number;
  commentCnt: number;
  commentList: MemoryCommentTypes[];
}

function CommentList({ memorySeq, commentCnt, commentList }: CommentProps) {
  return (
    <div className="my-2">
      <Container
        title
        titleBgColor="yellow"
        titleImgSrc="/icons/chat.svg"
        titleImgAlt="댓글 아이콘"
        titleText={`댓글 (${commentCnt})`}
        padding="p-0"
      >
        {commentList.length ? (
          <div className="divide-y divide-stone-300 px-4 py-1">
            {commentList.map(
              ({ commentSeq, profileImage, nickname, content, userSeq }) => {
                return (
                  <CommentItem
                    key={commentSeq}
                    commentSeq={commentSeq}
                    profileImage={profileImage}
                    nickname={nickname}
                    content={content}
                    memorySeq={memorySeq}
                    userSeq={userSeq}
                  />
                );
              }
            )}
          </div>
        ) : (
          <p className="px-2 py-3">아직 댓글이 없어요ㅠㅠ</p>
        )}
        <CommentCreate memorySeq={memorySeq} />
      </Container>
    </div>
  );
}

export default CommentList;
