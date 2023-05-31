# README

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

- Next.js: `13.2.4`
- Redux Toolkit: `1.9.5`
- yarn: `1.22.19`
- Node.js: `18.15.0`

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
- 친구들끼리 추억을 공유하며 과거와 현재에 대해 이야기를 나눌 수 있는 공간을 제공

## 🌻 서비스 소개

- 과거를 기록하는 추억앨범 기능
- 새로운 추억을 만들 수 있는 타임캡슐 기능
- 친구들과 함께 속하는 아지트 그룹 기능
- 실시간 채팅 기능
- 그시절 감성 프로필 꾸미기 기능

## ✨ 기능 상세

### 0. 헤더 디자인

- 새로고침 시 서비스 컨셉에 맞는 랜덤 이미지로 변경
    
    ![랜덤헤더](https://github.com/jyueong/git-first/assets/109324439/660e6fd5-937e-4de1-a040-6d772b1a90cd)

    

### 1. 로그인

- 카카오, 네이버, 구글 소셜 로그인
- JWT 기반 refreshToken, accessToken 사용

![로그인](https://github.com/jyueong/git-first/assets/109324439/3f2f5bff-61f9-4f38-bca8-e1bc66d9970a)

### 2. 추억앨범

- 추억 피드
    - 확인 가능한 추억들을 전체 조회할 수 있는 피드
    - 날짜, 아지트, 위치 기준 필터 기능
    - 지도에서 마커 선택하여 위치 변경시 해당 위치에서 가까운 추억 순으로 정렬
        
        ![추억피드](https://github.com/jyueong/git-first/assets/109324439/4f48f7f3-c921-454e-9057-a4140a4c2d28)
        
- 추억 생성
    - 추억을 저장할 아지트, 날짜, 공개범위 (전체공개, 아지트공개, 비공개) 선택
    - 사진 최대 10장 첨부 가능
    - 사진 메타데이터 추출이 가능할 경우 해당 메타데이터 기반으로 위치 지정
    - 메타데이터가 없거나 수정을 원하면 수동으로 설정 가능
    
    ![추억생성](https://github.com/jyueong/git-first/assets/109324439/3b4cad5e-1943-45cc-9cf8-ac23ecd1815b)
    
- 추억 상세
    - 추억 아지트 정보, 등록일, 위치, 공개범위 등 추억 상세 내용 조회
    - 추억 좋아요 및 댓글 작성, 삭제
    
    ![추억상세](https://github.com/jyueong/git-first/assets/109324439/69f62a72-ae0f-4bc1-974f-62f2689fe352)
    
- 추억 편집 및 삭제
    - 추억 아지트 정보, 위치, 내용 수정
    - 공개범위는 수정 불가능
    
    ![추억편집삭제](https://github.com/jyueong/git-first/assets/109324439/c108cec6-2ee1-49b4-b063-15e678d33226)
    

### 3. 타임캡슐

- 아직 열리지 않은 타임캡슐은 스토리 형태로 오픈 시작일까지 남은 날짜 기준으로 정렬해서 제공(수정가능/오픈대기중/투표중)
    
    ![타임캡슐_대기중목록](https://github.com/jyueong/git-first/assets/109324439/8bcb2f3f-b7e5-469a-9863-ca3d5bc85c89)
    
    - 수정가능한 타임캡슐의 경우 내용 추가 가능
        
        ![타임캡슐_내용추가](https://github.com/jyueong/git-first/assets/109324439/2585202f-f440-4174-a5ee-006aa93d8cd6)
        
    - 투표중인 타임캡슐의 경우
        - 반경 1km 이내에서 투표 가능
        - 해당 타임캡슐이 만들어진 아지트 멤버 수의 과반수 이상이 투표해야 열림
- 열린 타임캡슐 목록 제공
- 타임캡슐 상세페이지
    
    ![타임캡슐_목록_상세](https://github.com/jyueong/git-first/assets/109324439/8c82d57b-a83f-4403-95b2-64dfe5340a85)
    
- 열린 타임캡슐 중 랜덤 하나 뽑기 기능
    
    ![타임캡슐_랜덤뽑기](https://github.com/jyueong/git-first/assets/109324439/48f227e9-1fa3-4e93-b72b-9a108702f6c2)
    
- 타임캡슐 생성
    - 아지트 기반
    - 사진 최대 10장 첨부 가능
    - 수정 마감일, 오픈 시작일, 오픈 마감일, 타임캡슐이 묻힐 위치 지정
    
    ![타임캡슐_생성](https://github.com/jyueong/git-first/assets/109324439/d971eda0-0e61-47d2-9201-71c0e4532166)
    

### 4. 친구

- 닉네임 / 고유코드 검색
- 친구 목록 확인
- 받은 친구 요청 확인(수락/거절 가능)
- 채팅 연결 가능
    
    ![친구](https://github.com/jyueong/git-first/assets/109324439/a2981a8b-41e9-4663-b0f2-9608b71aec65)
    

### 5. 아지트

- 아지트 생성
    - 아지트 이름, 사진 설정
    - 친구 관계인 유저 초대 가능
    
    ![아지트생성](https://github.com/jyueong/git-first/assets/109324439/8bc88207-7d1d-40fd-ad12-bc0b5b89160a)
    
- 아지트 상세
    - 해당 아지트 기반으로 작성된 추억앨범, 타임캡슐별 상태 목록 확인
    - 아지트 생성시 자동으로 생성된 채팅방 연결
    - 아지트 이름, 생성일, 대표사진, 멤버와 같은 상세 정보 확인 가능
    
    ![아지트상세](https://github.com/jyueong/git-first/assets/109324439/ff2cdc2c-b888-464f-959e-e3594d14c526)
    
- 아지트 편집
    - 아지트 이름, 대표 사진 변경 및 멤버 추가 초대 가능
    - 아지트 탈퇴
    
    ![아지트편집](https://github.com/jyueong/git-first/assets/109324439/11f9141d-a358-453b-b38e-5cc5df03bc1f)
    

### 6. 채팅

- 채팅 목록 피드
    - 아지트 채팅방 및 친구 채팅방 목록
    - 채팅방은 아지트 생성시, 친구 요청 상호 수락시 자동 생성
    - 메세지 최신순으로 정렬
- 실시간 채팅 (SSE 기반)
    - 새로운 채팅 작성시 하단으로 자동 스크롤
    - 해당 채팅방의 아지트나 친구 프로필로 연결되는 링크 포함
    
    ![채팅](https://github.com/jyueong/git-first/assets/109324439/fa26be29-87b4-4e0d-aef2-3bd5ef8aecb0)
    

### 7. 프로필

- 편집
    
    ![프로필편집](https://github.com/jyueong/git-first/assets/109324439/088f3c96-e8a8-472f-bf77-8172c796a73a)
    
- 로그아웃
    
    ![프로필로그아웃](https://github.com/jyueong/git-first/assets/109324439/ea885e26-7398-4097-b16f-312434dc3f79)
    
- 탈퇴
    
    ![회원_탈퇴](https://github.com/jyueong/git-first/assets/109324439/435b2847-f7ad-45a3-92f1-0cdbd61f8bee)
    
- 대문사진 기능 - 사진촬영 및 프레임 골라서 꾸미기
    - 사진찍기 눌러서 찍기
    - 프레임 10개중에 선택가능
        
        ![대문사진](https://github.com/jyueong/git-first/assets/109324439/5d399305-964d-458b-936a-69bf0b2f63fd)
        
- 방명록
- 친구 목록 - 내친구목록 / 차단친구목록
- 친구 프로필
    - 친구된지 며칠째인지 확인 가능
    - 방명록 남기기 가능
    
    ![방명록](https://github.com/jyueong/git-first/assets/109324439/17d26561-623e-4247-a0c6-f95862f4e0da)
    
- 나의활동 (추억, 타임캡슐)
    
    ![나의활동](https://github.com/jyueong/git-first/assets/109324439/b4e3127e-45e2-40e9-9065-94b1ef1f08ae)
    

### 7. 알림

- 미확인 알림 있을 시 표시
- 전체/방명록/친구/추억앨범 으로 선택하여 확인
- 해당되는 페이지로 이동 혹은 친구 수락/거절/차단
    
    ![알림](https://github.com/jyueong/git-first/assets/109324439/ab456d66-772c-4660-9b0e-524f8732fb59)
    

## 배포 아키텍처

<img width="1000" alt="아키텍처" src="https://github.com/jyueong/git-first/assets/109324439/e59db496-d6e9-4961-b584-3a65f10d9c67">

## ERD 다이어그램

![ERD](https://github.com/jyueong/git-first/assets/109324439/2623404c-b43f-473b-963b-6bd209def65c)

## 와이어 프레임

![와프](https://github.com/jyueong/git-first/assets/109324439/66004a80-3de6-44c7-a422-888b53469bac)
