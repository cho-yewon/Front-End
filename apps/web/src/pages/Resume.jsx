import profile from '../assets/profile.jpg';

export default function About() {
  const handlePrint = () => window.print();

  return (
    <><section className="section">
      <div className="container resume-print-area">

        <header className="cover-header"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "right",
            marginBottom: "2em"  // 아래 간격 추가
          }}>
          <button className="btn btn-secondary cover-print" onClick={handlePrint}>
            Print / Save as PDF
          </button>
        </header>
        <div className="about-layout">
          <img src={profile} alt="프로필" />
          <div>
            <h3>안녕하세요, [조예원]입니다.</h3>
            <p>중학교 때 처음 코딩과 게임을 접한 이후, 두 분야를 함께 공부하며 개발자의 길을 걸어왔습니다.
              인하공업전문대학 컴퓨터정보공학과에서 컴퓨터 공학 기초를 다지고, 게임 클라이언트 구현에 필요한
              언어와 엔진을 꾸준히 학습하고 있습니다.</p>
            <p>새로운 기술을 빠르게 익히는 것에 두려움이 없고, 막히는 부분이 있어도 끝까지 파고들어 해결하려는
              집요함과 책임감을 강점으로 삼고 있습니다. 팀 프로젝트와 공모전 경험을 통해 협업과 소통의 중요성을
              배우며, 함께 성장하는 개발자를 지향합니다.</p>
          </div>
        </div>
      </div>
    </section><section className="section">
        <div className="container">
          <h2 className="section-title">My Resume</h2>

          <div className="resume-section">
            <h3>Personal Data</h3>
            <p><strong>[이름]</strong> | 조예원</p>
            <p><strong>[성별]</strong> | Female</p>
            <p><strong>[생년월일]</strong> | 2002.10.17</p>
            <p><strong>[나이]</strong> | 만 22세</p>
          </div>

          <div className="resume-section">
            <h3>Work Experience</h3>
            <ul>
              <li>노브랜드버거 (2024.03 ~ 재직 중)</li>
              <li>빨래터카페(개인 카페) (2023.07 ~ 2023.08)</li>
              <li>배스킨라빈스 (2023.04 ~ 2023.07)</li>
              <li>CU 편의점 (2022.10 ~ 2023.02)</li>
              <li>포메인 (2022.05 ~ 2022.08)</li>
              <li>배스킨라빈스 (2021.11 ~ 2022.02)</li>
            </ul>

            <p style={{ marginTop: "1em" }}>
              다양한 근무 경험을 통해 책임감·기본 직장 매너·대인관계 능력을 쌓았으며,
              팀 프로젝트에서는 의견 조율·중재·협업 역량을 실질적으로 발휘하였습니다.
            </p>
          </div>

          <div className="resume-section">
            <h3>Education</h3>
            <p><strong>컴퓨터정보공학과</strong> | 인하공업전문대학 (2023.03 ~ 재학 중)</p>
            <p><strong>소프트웨어과</strong> | 인천산업정보학교 (2020.03 ~ 2021.02)</p>
            <p><strong>가림고등학교</strong> (2018.03 ~ 2021.02)</p>
          </div>

          <div className="resume-section">
            <h3>Certifications</h3>
            <ul className="resume-list">
              <li>
                <span className="resume-date">2022.11</span>
                <span className="resume-title">운전면허증 2종 보통</span>
                <span className="resume-org">도로교통공단</span>
              </li>
              <li>
                <span className="resume-date">2020.08</span>
                <span className="resume-title">GTQ 1급</span>
                <span className="resume-org">한국생산성본부</span>
              </li>
              <li>
                <span className="resume-date">2015.02</span>
                <span className="resume-title">
                  ICDL (International Computer Driving Licence)
                </span>
                <span className="resume-org">한국생산성본부</span>
              </li>
              <li>
                <span className="resume-date">2014.12</span>
                <span className="resume-title">ITQ 한글엑셀</span>
                <span className="resume-org">한국생산성본부</span>
              </li>
              <li>
                <span className="resume-date">2014.10</span>
                <span className="resume-title">ITQ 아래한글</span>
                <span className="resume-org">한국생산성본부</span>
              </li>
              <li>
                <span className="resume-date">2014.07</span>
                <span className="resume-title">ITQ 한글파워포인트</span>
                <span className="resume-org">한국생산성본부</span>
              </li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>Training / Courses</h3>
            <ul className="resume-list">
              <li>
                <span className="resume-date">2020.02 ~ 2020.10</span>
                <span className="resume-title">게임프로그래밍 과정</span>
                <span className="resume-org">SBS아카데미게임학원</span>
              </li>
              <li>
                <span className="resume-date">2020.09 ~ 2020.12</span>
                <span className="resume-title">언리얼 과정</span>
                <span className="resume-org">SBS아카데미게임학원</span>
              </li>
              <li>
                <span className="resume-date">2021.02 ~ 2021.08</span>
                <span className="resume-title">유니티 과정</span>
                <span className="resume-org">SBS아카데미게임학원</span>
              </li>
              <li>
                <span className="resume-date">2025.06 ~ 2021.12</span>
                <span className="resume-title">언리얼 과정</span>
                <span className="resume-org">SBS아카데미게임학원</span>
              </li>
              <li>
                <span className="resume-date">2025.10 ~ 2025.06</span>
                <span className="resume-title">게임프로그래밍 과정</span>
                <span className="resume-org">SBS아카데미게임학원</span>
              </li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>Skills</h3>
            <p><strong>Programming:</strong> C, C++, C#, Java, JavaScript, Python, Go</p>
            <p><strong>Game Dev:</strong> WinAPI, Direct2D/3D, Unity, Unreal Engine</p>
            <p><strong>CS Knowledge:</strong> 자료구조, 알고리즘, 운영체제, 컴퓨터구조, 네트워크, DB</p>
            <p><strong>Tools:</strong> Git, Visual Studio, VS Code, Photoshop</p>
          </div>
        </div>
      </section></>

  );
}
