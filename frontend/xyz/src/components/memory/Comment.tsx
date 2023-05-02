import React from "react";
import Container from "../common/Container";
import { MemoryCommentTypes } from "@/types/memory";
import ProfileImg from "../common/ProfileImg";

interface CommentProps {
  commentCnt: number;
  commentList: MemoryCommentTypes[];
}

function Comment({ commentCnt, commentList }: CommentProps) {
  return (
    <div className="my-2">
      <Container
        title
        titleBgColor="yellow"
        titleImgSrc="/icons/comment.svg"
        titleImgAlt="댓글 아이콘"
        titleText={`댓글 (${commentCnt})`}
      >
        {commentList.map((comment, idx) => {
          return (
            <div key={idx}>
              <div>
                <ProfileImg imgSrc={comment.profileImage} />
                <span>{comment.nickname} :</span>
              </div>
              <div>{comment.content}</div>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default Comment;
