import Link from "next/link";

export const metadata = {
  title: "Lecture",
  description: "모션 디자이너 Noitom의 출강 · 강의 안내. 기업 출강, 대학 특강, 원데이 클래스, 1:1 코칭.",
};

export default function LecturePage() {
  return (
    <>
      {/* ===== 타이틀 ===== */}
      <section className="page-head">
        <div className="container reveal">
          <p className="eyebrow">Lecture</p>
          <h1 className="title-xl">출강 · 강의</h1>
          <p className="lead">모션그래픽 실무부터 AI 웹·영상 제작, 업무 자동화(AX)까지. 현업에서 직접 쓰는 노하우를 대상과 목적에 맞게 커리큘럼으로 구성해 드립니다.</p>
        </div>
      </section>

      {/* ===== 강의 형태 ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Format</p>
              <h2 className="title-lg">강의 형태</h2>
            </div>
          </div>
          <div className="formats">
            <article className="format reveal">
              <p className="format__tag">Corporate</p>
              <h3 className="format__title">기업 출강</h3>
              <p className="format__desc">사내 디자인 · 마케팅 팀 대상 실무 교육. 팀의 작업 환경에 맞춰 진행합니다.</p>
              <p className="format__meta">4시간 ~ 다회차 · 5~30명</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">University</p>
              <h3 className="format__title">대학 특강</h3>
              <p className="format__desc">디자인 · 영상 전공 학생 대상 특강, 포트폴리오 리뷰, 진로 멘토링.</p>
              <p className="format__meta">2~3시간 · 인원 무관</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">Class</p>
              <h3 className="format__title">원데이 클래스</h3>
              <p className="format__desc">입문자를 위한 하루 집중 클래스. 수업이 끝나면 완성된 결과물을 가져갑니다.</p>
              <p className="format__meta">4~6시간 · 소규모</p>
            </article>
            <article className="format reveal">
              <p className="format__tag">1:1</p>
              <h3 className="format__title">1:1 코칭</h3>
              <p className="format__desc">개인 프로젝트 피드백, 포트폴리오 컨설팅, 툴 집중 레슨.</p>
              <p className="format__meta">회당 2시간 · 온라인/오프라인</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 커리큘럼 ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Curriculum</p>
              <h2 className="title-lg">강의 주제</h2>
            </div>
            <p className="lead">아래 주제를 조합하거나, 원하는 내용으로 새로 구성할 수 있어요. 가격은 예상 기준이며 인원 · 지역 · 난이도에 따라 상담 후 확정됩니다.</p>
          </div>

          <div className="curriculum">
            <div className="course reveal">
              <p className="course__num">01</p>
              <div>
                <h3 className="course__title">AI 웹페이지 제작 · 배포</h3>
                <span className="course__level">입문 · 실무</span>
              </div>
              <div className="course__desc">
                AI 툴로 기획부터 제작, 실제 배포까지 혼자 끝내는 과정.
                <ul>
                  <li>요구사항 정리 · 레퍼런스 리서치</li>
                  <li>AI 코딩/디자인 툴로 레이아웃 · 카피 · 이미지 제작</li>
                  <li>Vercel 등으로 실제 배포, 도메인 연결까지</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">8시간 ~</p>

                <p className="course__price">1:1 72만원 ~ · 그룹(인당) 30만원 ~</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">02</p>
              <div>
                <h3 className="course__title">AI 영상 제작 & 포트폴리오 제작</h3>
                <span className="course__level">전체</span>
              </div>
              <div className="course__desc">
                생성형 AI 영상 · 이미지 툴을 실무 워크플로우에 결합하는 과정.
                <ul>
                  <li>AI 영상 · 이미지 생성 툴로 소스 · 레퍼런스 제작</li>
                  <li>기존 편집 · 모션그래픽 워크플로우와 결합</li>
                  <li>포트폴리오용 쇼릴 기획 및 완성</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">6시간 ~</p>

                <p className="course__price">1:1 54만원 ~ · 그룹(인당) 24만원 ~</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">03</p>
              <div>
                <h3 className="course__title">AX(업무 자동화) 강의</h3>
                <span className="course__level">기업 · 팀</span>
              </div>
              <div className="course__desc">
                반복 업무를 AI로 자동화하는 실무 중심 기업 강의.
                <ul>
                  <li>업무 프로세스 분석, 자동화 포인트 도출</li>
                  <li>AI 에이전트 · 자동화 툴로 실제 업무에 적용</li>
                  <li>팀 적용 가이드 및 유지보수 방법 공유</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">4시간 ~ (기업 출강)</p>

                <p className="course__price">시간당 25만원 ~ (인원 · 범위 협의)</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">04</p>
              <div>
                <h3 className="course__title">모션그래픽 포트폴리오 1:1 코칭</h3>
                <span className="course__level">3개월 집중</span>
              </div>
              <div className="course__desc">
                3개월간 밀착 코칭으로 취업 · 이직용 포트폴리오를 완성하는 과정.
                <ul>
                  <li>월 4회 1:1 피드백 세션 (온라인/오프라인)</li>
                  <li>기획 · 제작 · 보정 전 과정 코칭</li>
                  <li>최종 데모릴 완성 및 이력서 · 포트폴리오 구성 조언</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">3개월 · 월 4회</p>

                <p className="course__price">월 60만원 (3개월 160만원, 일괄결제 할인)</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">05</p>
              <div>
                <h3 className="course__title">2D 모션그래픽 (After Effects)</h3>
                <span className="course__level">입문 · 중급</span>
              </div>
              <div className="course__desc">
                툴이 처음인 분도 따라올 수 있는 기초부터, 실무 작업 방식까지.
                <ul>
                  <li>인터페이스와 작업 흐름, 키프레임 · 그래프 에디터</li>
                  <li>기획 · 스토리보드 · 스타일 프레임 → 실제 제작</li>
                  <li>렌더링 · 납품 규격 · 협업 팁</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">8시간 ~</p>

                <p className="course__price">1:1 72만원 ~ · 그룹(인당) 32만원 ~</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">06</p>
              <div>
                <h3 className="course__title">3D 모션그래픽 (Cinema 4D)</h3>
                <span className="course__level">중급</span>
              </div>
              <div className="course__desc">
                2D 모션 디자이너를 위한 3D 입문 과정.
                <ul>
                  <li>모델링 · 머티리얼 · 라이팅 기초</li>
                  <li>MoGraph로 만드는 3D 모션</li>
                  <li>After Effects와의 합성 워크플로우</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">12시간 ~</p>

                <p className="course__price">1:1 108만원 ~ · 그룹(인당) 45만원 ~</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">07</p>
              <div>
                <h3 className="course__title">촬영 · 기획 강의</h3>
                <span className="course__level">입문 · 중급</span>
              </div>
              <div className="course__desc">
                영상 기획부터 촬영 현장 실무까지 다루는 과정.
                <ul>
                  <li>기획안 · 콘티 작성법</li>
                  <li>카메라 세팅, 조명, 구도 기초</li>
                  <li>촬영 실습 및 현장 피드백</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">6시간 ~</p>

                <p className="course__price">1:1 54만원 ~ · 그룹(인당) 24만원 ~</p>

              </div>
            </div>

            <div className="course reveal">
              <p className="course__num">08</p>
              <div>
                <h3 className="course__title">UI 모션 & Lottie</h3>
                <span className="course__level">중급</span>
              </div>
              <div className="course__desc">
                앱 · 웹 서비스를 위한 인터랙션 모션.
                <ul>
                  <li>UI 모션 원칙과 모션 가이드 작성</li>
                  <li>Figma → After Effects → Lottie 제작 흐름</li>
                  <li>개발자 협업과 에셋 최적화</li>
                </ul>
              </div>
              <div className="course__time-wrap">

                <p className="course__time">6시간 ~</p>

                <p className="course__price">1:1 54만원 ~ · 그룹(인당) 24만원 ~</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 진행 과정 ===== */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="title-lg">진행 과정</h2>
            </div>
          </div>
          <ol className="process reveal">
            <li>
              <h3>문의</h3>
              <p>대상, 인원, 희망 일정과 주제를 알려주세요.</p>
            </li>
            <li>
              <h3>상담 · 제안</h3>
              <p>수강생 수준과 목적에 맞춘 커리큘럼과 견적을 보내드립니다.</p>
            </li>
            <li>
              <h3>준비</h3>
              <p>강의 자료, 예제 파일, 실습 환경을 미리 안내합니다.</p>
            </li>
            <li>
              <h3>강의 · 피드백</h3>
              <p>강의 후 자료 공유와 질의응답을 지원합니다.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 출강 이력 ===== */}
      <section className="section">
        <div className="container history">
          <div className="reveal">
            <p className="eyebrow">History</p>
            <h2 className="title-lg">출강 · 활동 이력</h2>
          </div>
          <ul className="history__list reveal">
            <li>
              <span className="history__year">기업</span>
              <span className="history__org">KT</span>
              <span className="history__type">사내 디자인 · 영상 교육</span>
            </li>
            <li>
              <span className="history__year">기업</span>
              <span className="history__org">SKT</span>
              <span className="history__type">사내 디자인 · 영상 교육</span>
            </li>
            <li>
              <span className="history__year">기관</span>
              <span className="history__org">공공기관</span>
              <span className="history__type">실무자 대상 특강</span>
            </li>
            <li>
              <span className="history__year">플랫폼</span>
              <span className="history__org">숨고</span>
              <span className="history__type">모션그래픽 · 영상 1:1 과외 다수 진행</span>
            </li>
            <li>
              <span className="history__year">개인</span>
              <span className="history__org">1:1 과외 · 코칭</span>
              <span className="history__type">포트폴리오 · 툴 집중 레슨</span>
            </li>
            <li>
              <span className="history__year">커뮤니티</span>
              <span className="history__org">디자인 커뮤니티</span>
              <span className="history__type">커뮤니티 운영 및 세미나 진행</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="title-lg">자주 묻는 질문</h2>
            </div>
          </div>
          <div className="faq reveal">
            <details>
              <summary>온라인 강의도 가능한가요?</summary>
              <p>네, Zoom · Google Meet 등으로 실시간 온라인 강의가 가능합니다. 화면 공유와 실습 피드백도 함께 진행합니다.</p>
            </details>
            <details>
              <summary>수강생 수준이 제각각인데 괜찮을까요?</summary>
              <p>사전 설문으로 수준을 파악한 뒤, 기초와 심화 과제를 나눠 모두가 따라올 수 있게 구성합니다.</p>
            </details>
            <details>
              <summary>실습용 프로그램이 필요한가요?</summary>
              <p>실습 강의는 Adobe After Effects(체험판 가능)가 설치된 PC가 필요합니다. 이론 위주 특강은 장비가 필요 없습니다.</p>
            </details>
            <details>
              <summary>강의료는 어떻게 되나요?</summary>
              <p>강의 형태, 시간, 인원, 지역에 따라 달라집니다. 문의 주시면 맞춤 견적을 보내드립니다.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container cta reveal">
          <h2 className="title-lg">강의를 계획하고 계신가요?</h2>
          <p className="lead">일정과 대상만 알려주시면 맞춤 커리큘럼을 제안해 드릴게요.</p>
          <Link href="/contact?type=lecture" className="btn btn--primary">
            강의 문의하기 <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
