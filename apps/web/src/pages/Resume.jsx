import profile from '../assets/profile.jpg';

export default function About() {
  return (
    <><section className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-layout">
          <img src={profile} alt="프로필" />
          <div>
            <h3>안녕하세요, [조예원]입니다.</h3>
            <p>저는 인하공업전문대학 [컴퓨터정보공학과]에 재학 중이며, [게임 개발자]가 되기 위해 꾸준히 학습하고 있습니다. 즐겁고 몰입감 있는 경험을 만드는 것을 목표로 삼고, 사용자 관점에서 재미와 가치를 줄 수 있는 게임을 만드는 데 열정을 쏟고 있습니다.</p>
            <p>새로운 기술을 배우고 팀원들과 협력하는 과정을 즐기며, 함께 성장하며 더 큰 시너지를 만들어내는 것이 저의 강점입니다.</p>
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
              <li>프로젝트 성과를 수치로 강조</li>
              <li>역할/기여/성과를 구체적으로 기재</li>
            </ul>
          </div>

          <div className="resume-section">
            <h3>Education</h3>
            <p><strong>[소프트웨어과]</strong> | [인천산업정보학교] (2020.03~2021.02)</p>
            <p><strong>[컴퓨터정보공학과]</strong> | [인하공업전문대학] (2023.03~2026.02)</p>
          </div>

          <div className="resume-section">
            <h3>Skills</h3>
            <p><strong>Programming:</strong> JavaScript, HTML/CSS</p>
            <p><strong>Tools:</strong> Figma, Git</p>
          </div>
        </div>
      </section></>

  );
}
