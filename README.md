# 🐟 오늘은 낚시왕

### 😎 오늘은 낚시왕을 소개합니다 
- 낚시에 입문하고자 하는 MZ세대 맞춤 초보자용 낚시 서비스

<br>

### 🔵 서비스 목표
- 코로나 시기 낚시 인구가 949만명에서 1,138만명으로 약 20% 증가했습니다.
입문자들이 낚시 용어를 어려워하는 것에서 시작해서 입문자의 즐거운 낚시를 위한 서비스를 기획했습니다.

<br>

### 🟤 Infra
![gitaehasam_architecture.drawio__2_](/uploads/de72c35d98ab7d7ca79b3ba9b9783c09/gitaehasam_architecture.drawio__2_.png)

<br>

### 🟡 기술 스택 선정 이유
|Framework|선정 이유|
|---------|---------|
|Spring Boot|Spring과 비교했을 때 환경 설정을 쉽게 할 수 있어서 개발 생산성 증가|
|MySQL|구조화된 데이터 관리 및 오픈 소스 라이센스를 따르기 때문에 무료 사용 가능|
|JPA|ORM을 사용함으로써 Entity와 데이터베이스의 테이블을 매핑함|
|QueryDSL|조건이 복잡할 때 동적 쿼리를 사용해서 단일 API로 필터링을 걸 수 있음|
|AWS EC2|추후 데이터 처리량 증가에 대비해 높은 안정성 및 확장성을 가진 EC2를 선택|
|NGNIX|어떤 클라이언트도 내부 서버와 직접 통신하지 못 하게 하기 위해 reverse proxy 서버로 사용. 또한, 가벼우면서도 높은 성능을 가지고 있어서 선택|
|S3|업로드한 이미지 저장, 정적 리소스 파일 서빙용으로 사용|
|CloudFront|S3는 데이터를 보관하는 서비스인만큼 보안이 중요. S3를 퍼블릭으로 공개하지 않으면서 퍼블릭하게 접근할 수 있도록 하기 위해 사용|
|Docker|컨테이너 기반으로 여러 서버들을 쉽게 관리할 수 있음|
|Redis|유효 기간이 있는 Refresh Token 및 자주 갱신되지 않는 데이터를 캐싱 용도로 저장하기 위한 목적으로 사용|
|OpenVidu|SFU 구조로 WebRTC를 설계할 때 미디어 서버의 역할을 하기 위해 사용. Kurento에 비해서 러닝 커브가 낮아서 개발 생산성 증가|

<br>

### 🟣 기능
#### 1. 어종 인식
- Teachable Machine을 이용해 약 50여종의 어류를 이미지 분류하는 서비스   
![djwhddlstlr](/uploads/237bf235faba513833d9a62bad822a6d/djwhddlstlr.gif)

#### 2. 라이브 캐스팅
- 인스타그램 라이브와 비슷하게 1:N 방식으로 진행  
![djwhddlstlr](/uploads/237bf235faba513833d9a62bad822a6d/djwhddlstlr.gif)

#### 3. 아쿠아리움
- 내가 잡은 물고기로 꾸미는 나만의 아쿠아리움  
- three.js를 사용하여 생생하게 움직이는 물고기를 볼 수 있음  
![aquarium](/uploads/ae524a5c1c23903336ede7ded274d3fa/aquarium.gif)

#### 4. 초보자 튜토리얼
- 한 단계씩 사진/움짤, 한 줄 멘트를 넣음  
![tutorial](/uploads/d9ca116d099a49d5c57c7c10e73bb0df/tutorial.gif)

#### 5. 도감
![fishbook](/uploads/72dc8bdf7ac4c69f5a48546c0aa0f834/fishbook.gif)

#### 5. 챗봇을 이용한 낚시 용어 검색  
![chatbot](/uploads/9898f9830c7a7cf85da95bea3c84c0b2/chatbot.gif)

#### 6. 사용자 후기와 해시태그로 검색하는 맞춤형 낚시터 찾기  
![fishingspot](/uploads/0b413ef9dd1292055574d623a49431c1/fishingspot.gif)

### 게시판 조회에 Cache를 적용한 성능 테스트 결과 
![성능테스트](/uploads/2314b1dea800fc396c7561c0769a3b7e/성능테스트.png)


### Ground Rules
1. 데일리 스크럼 진행
2. 사유 없는 지각 시 간식 사오기
3. 혼자서 하는 고민은 최대 1시간. 그 이후에는 팀원과 함께 하기
4. 읽씹은 안 돼요. 이모지라도 달기
5. SSAFY에서는 MM, 외부에서는 카카오톡으로 소통
6. 기록을 습관화하기
7. 회의 시간은 최대 1시간 30분
8. 서로의 의견 존중하기
9. 본인 방식에 대한 집착 버리기
10. 자기 비하 하지 않기

