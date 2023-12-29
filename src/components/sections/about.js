import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

// max-width: 900px;
const StyledAboutSection = styled.section`
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'React', 'Node.js', 'BlockChain', 'WordPress', 'GSAP'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Greetings! I'm M Hemel Hasan, a passionate web developer with a journey that commenced
              in 2010. My initial foray into web development involved converting PSD to HTML themes
              and crafting free themes for Blogger. This hands-on experience ignited my fascination
              with HTML &amp; CSS, laying the foundation for my journey into the world of web
              development.
            </p>

            <p>
              Over the years, I've had the honor of contributing to renowned organizations such as
              Computer Software Solution, Desh Team, SoftTech, and collaborating with clients on
              UpWork. Today, my primary focus revolves around crafting affordable, internationally
              acclaimed products, and delivering exceptional digital experiences.
            </p>

            <p>
              In addition to my work in conventional web development, I've ventured into the dynamic
              realm of NFTs. I recently developed an all-encompassing NFT Marketplace using Node.js
              and React for the frontend, covering the entire spectrum of the NFT marketplace
              ecosystem.
            </p>

            <p>
              Currently, at Themefic, I am actively involved in WordPress plugin development.
              Leveraging my expertise, I am working on creating innovative plugins to enhance the
              functionality and user experience of WordPress websites. This endeavor allows me to
              stay at the forefront of technological advancements in both conventional and niche
              areas of web development.
            </p>

            <p></p>

            <p>Here's a snapshot of the technologies I've been actively engaged with:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/mhemelhasan.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="mhemelhasan"
            />
          </div>
        </StyledPic>
      </div>

      <p className="mt-2">
        This journey has equipped me with the skills to bring ideas to life on the internet. I'm
        dedicated to pushing the boundaries of creativity and technology to deliver innovative
        solutions for my clients.
      </p>

      <p>
        Feel free to explore my portfolio and discover how I can contribute to your digital
        endeavors!
      </p>
    </StyledAboutSection>
  );
};

export default About;
