export default function Resume() {
  return (
    <section className="section">
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
    </section>
  );
}
