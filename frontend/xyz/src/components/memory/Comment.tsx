import React from "react";
import Container from "../common/Container";
import { MemoryCommentTypes } from "@/types/memory";
import ProfileImg from "../common/ProfileImg";
import CommentCreate from "./CommentCreate";

interface CommentProps {
  memorySeq: number;
  commentCnt: number;
  commentList: MemoryCommentTypes[];
}

function Comment({ memorySeq, commentCnt, commentList }: CommentProps) {
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
            {commentList.map((comment, idx) => {
              return (
                <div key={idx} className="flex gap-x-3 py-3">
                  <div className="flex-none">
                    <ProfileImg imgSrc={comment.profileImage} />
                  </div>
                  <div className="flex flex-col">
                    <p className="mb-1 mt-2 ">{comment.nickname} :</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>아직 댓글이 없어요ㅠㅠ</p>
        )}
        <CommentCreate memorySeq={memorySeq} />
      </Container>
    </div>
  );
}

export default Comment;
