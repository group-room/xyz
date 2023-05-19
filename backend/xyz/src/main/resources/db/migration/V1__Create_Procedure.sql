DROP PROCEDURE IF EXISTS usp_ins_azt;
//
CREATE PROCEDURE usp_ins_azt(
    IN loginSeq BIGINT,
    IN name VARCHAR(255),
    IN imagePath VARCHAR(2083),
    IN members VARCHAR(2083),
    IN createdAt TIMESTAMP,
    IN updatedAt TIMESTAMP,
    OUT outAztSeq BIGINT
)
BEGIN
    -- 채팅방 생성
    INSERT INTO xyz.chat (sequence) VALUES (null);
    SET @chatSeq = LAST_INSERT_ID();

    -- 아지트 생성
    INSERT INTO azt (azt_name, azt_image, is_deleted, chat_sequence, created_at, updated_at) VALUES (name, imagePath, FALSE, @chatSeq, createdAt, updatedAt);
    SET @aztSeq = LAST_INSERT_ID();

    -- 본인 가입
    INSERT INTO azt_member (azt_sequence, user_sequence, is_deleted, created_at, updated_at) VALUES (@aztSeq, loginSeq, FALSE, createdAt, updatedAt);

    -- 멤버 추가
    INSERT INTO azt_member (azt_sequence, user_sequence, is_deleted, created_at, updated_at)
    SELECT @aztSeq, user_sequence, FALSE, createdAt, updatedAt
    FROM JSON_TABLE(members, '$[*]' COLUMNS (user_sequence BIGINT PATH '$.userSeq')) AS m
    WHERE EXISTS (
                  SELECT 1
                  FROM user u
                  WHERE u.sequence = m.user_sequence
              );

    -- 아지트 시퀀스 반환
    SET outAztSeq = @aztSeq;
END;
