import ReactMarkdown from "react-markdown";

import AboutLayout from "../components/about/AboutLayout";

const AboutPage = (): JSX.Element => {
  const content = `
  # JOSE E. VEGA

  4 years+ software engineer specialized in web technologies and cross-platform application development. Experienced in design-oriented development and rapid prototyping.
  Well-versed in programming languages like **JavaScript/TypeScript**, **Python** and professional experience with technologies like: **AWS**, **GitHub**, **GitLab**, **Electron**, **React**, **NPM**, among others.

  ## WORK

  ### Frontend Engineer II – Amazon Web Services
  #### SEPTEMBER 2022 – TODAY
  Responsible for the implementation and maintenance of web-based components inside the AWS console Systems Manager application. The development of the different applications required deep-dives into AWS tooling, encompassing internal and external-facing technologies.
  - Implementation of reusable, well-structured React components, compliant with company-wide guidelines and standards, ensuring compatibility and consistency (**Typescript + React.js**).
  - Development of a quality-assurance infrastructure pipeline through unit-testing, component-testing and E2E testing (**React Testing Library, Puppeteer, Cypress, AWS APIs**).
  - Performing on-call duties, including emergent bug-fixing and customer outreach.
  - Designed and spec-out ideas and feedback from technical planning and systems-design to deployment through documents, presentations and meaningful conversations with PMs, designers, peers and other stakeholders.
  - Responsible for the configuration of meaningful UX metrics tracking and visualizing, in order to gain meaningful insights about user interactions (**Kibana + Panorama**).

  ### Software Engineer II MapLab Team – HERE Technologies
  #### MAY 2019 – SEPTEMBER 2022
  Responsible for the creation of a fully web-based version of the map-styling tool.
  The tool already existed as a native application that hosted the frontend logic in a web-view (Qt) and this needed to be ported to a fully self-contained web-application connected to a different map-rendering engine (Based in **Three.js**)
  My main tasks:
  - Full-stack implementation of user workflows into the application, including UI/UX logic and business/API logic. (**Typescript + React.js + Electron + Next.js**)
  - Development of CI/CD pipelines to reduce issue-response time (**GitLab**)
  - Development of internal tools for build automation or miscellaneous styling use-cases (**Python, TS + React.js, Electron**)
  - Maintain different product versions of the application (**native, web, customer, internal**)
  - Keep close contact with external users in order to be able to translate their feedback into tangible features in the application
  - Closely work with UI/UX-designers to define workflows that seek to simplify sometimes very complex styling operations.

  ### Software Engineer (Internship) Documentation Team – HERE Technologies
  #### NOVEMBER 2018 – FEBRUARY 2019
  The main task I oversaw, was to further develop a cross-platform tool for the creation of branded documentation products (internal and external). The tool acted as a CLI between the user and an artifact-generation service which would return the documentation product in the form of PDF or HTML files.
  The initial intention was to have this tool be easily integrated into CI-pipelines, but some users had problems using it because of lack of technical background.
  - TDD development (**Mocha**)
  - Tasked with accommodating specific use-cases into the existing tool (**Node.js**)
  - Some basic back-end API implementation in **Ruby**
  - Created the graphic-UI version of the tool for the non CI-pipeline use-cases (**Electron + React.js**)

  ## PROJECTS

  ### Personal web-site
  [https://github.com/estib-vega/personal-site](https://github.com/estib-vega/personal-site)\n
  This is the implementation of my personal web-site using full-stack technologies inlcuding: **Next JS**, **React**, **Prisma**, **PostgreSQL**, among others.
  The site has a login-restricted blogging platform with some test posts of mine. It might include other full-stack experiments of mine: [https://estib-vega.vercel.app](https://estib-vega.vercel.app)

  ### Simple chess-engine
  [https://gitlab.com/estib/chess](https://gitlab.com/estib/chess)\n
  Simple heuristics-base chess engine game developed fully on the front-end using **TypeScript** and **React.js**.
  I keep submitting some changes now and then, lately I just focused in improving the chess heuristics for positional scoring and the move-searching algorithm in order to be able to look deeper into future moves.
  In order to unblock the main thread, I moved the move-searching step into a web worker.
  Hosted in GitLab pages here: [https://estib.gitlab.io/chess](https://estib.gitlab.io/chess)
  `;
  return (
    <AboutLayout>
      <ReactMarkdown>{content}</ReactMarkdown>
    </AboutLayout>
  );
};

export default AboutPage;
