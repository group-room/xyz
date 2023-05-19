## 😎 팀명 및 서비스명

- 팀명: 그룹의룸
- 서비스명: XYZ

## 👨‍👩‍👧‍👦 팀원

| 이름 | 담당 |
| --- | --- |
| 정유정 | 팀장, Backend |
| 김경림 | Frontend |
| 백체은 | Backend |
| 송수현 | Frontend |
| 오의석 | Backend |
| 이여민 | Frontend |

## ⚙️ 사용 기술

**FrontEnd**

- Node.js: `18.15.0`
- npm: `8.19.3`
- NextJs:

**DevOps**

- Docker: `23.0.1`
- Jenkins: `2.387.1`
- Nginx: `nginx/1.18.0`

**Server**

- AWS EC2: `ubuntu 20.04`
- AWS S3
- IntelliJ: `IDEA 2022.3.1`
- SpringBoot: `2.7.10`
- JDK: `OpenJDK 11.0.17`

**Database**

- MySQL: `8.0.32`
- MongoDB

**관리**

- GitLab
- Jira
- Notion
- Slack

## 🤔 기획의도

- 과거에 대한 향수는 시간과 공간을 막론하고 보편적인 정서
- 레트로 트렌드의 유행
- 친구들끼리 추억을 공유
- 과거와 현재에 대해 이야기를 나눌 수 있는 공간을 제공

## 🪄 서비스 소개

- 아지트별 추억앨범 기능
- 버디버디 컨셉 채팅 기능
- 새로운 추억을 만들 수 있는 타임캡슐 기능
- 그시절 감성 프로필 꾸미기 기능

## ✨ 기능 상세

### 1. 추억앨범

- 확인 가능한 추억앨범을 전체 조회할 수 있는 피드
- 날짜, 아지트, 위치 기준 필터 기능
- 추억앨범 생성
    - 아지트 기반, 공개범위(전체공개, 아지트공개, 비공개) 선택
    - 사진 최대 10장 첨부 가능, 메타데이터 추출이 가능할 경우 해당 메타데이터 기반으로 위치 지정, 메타데이터가 없거나 수정을 원하면 수동으로 설정 가능
    - 글 작성

### 2. 타임캡슐

- 아직 열리지 않은 타임캡슐은 스토리 형태로 오픈 시작일까지 남은 날짜 기준으로 정렬해서 제공(수정가능/오픈대기중/투표중)
    - 수정가능한 타임캡슐의 경우 내용 추가 가능
    - 투표중인 타임캡슐의 경우
        - 반경 1km 이내에서 투표 가능
        - 해당 타임캡슐이 만들어진 아지트 멤버 수의 과반수 이상이 투표해야 열림
- 열린 타임캡슐 목록 제공
- 열린 타임캡슐 중 랜덤 하나 뽑기 기능
- 타임캡슐 생성
    - 아지트 기반
    - 사진 최대 10장 첨부 가능
    - 수정 마감일, 오픈 시작일, 오픈 마감일, 타임캡슐이 묻힐 위치 지정

### 3. 친구

- 닉네임 / 고유코드 검색
- 친구 목록 확인
- 받은 친구 요청 확인(수락/거절 가능)
- 채팅 연결 가능

### 4. 아지트

- 생성
    - 아지트 이름, 사진 설정
    - 친구 관계인 유저 초대
- 아지트 생성시 채팅방 생성
- 해당 아지트 기반으로 작성된 추억앨범, 타임캡슐 목록 확인
- 아지트 정보 편집
- 멤버 추가 초대, 탈퇴

### 5. 채팅

- 아지트 채팅방, 친구 채팅방으로 자동 생성됨
- 메세지 최신순으로 정렬
- 실시간 채팅
- 위에 버튼 누르면 아지트나 프로필로 연결 가능

### 6. 프로필

- 편집
- 로그아웃
- 탈퇴
- 대문사진 기능 - 사진촬영 및 프레임 골라서 꾸미
    - 사진찍기 눌러서 찍기
    - 프레임 10개중에 선택가능
- 방명록
- 나의활동 (추억, 타임캡슐)
- 친구 목록 - 내친구목록 / 차단친구목록
- 친구 프로필
    - 친구된지 며칠째인지 확인 가능
    - 방명록 남기기 가능

### 7. 알림

- 미확인 알림 있을 시 표시
- 전체/방명록/친구/추억앨범 으로 선택하여 확인
- 해당되는 페이지로 이동 혹은 친구 수락/거절/차단
