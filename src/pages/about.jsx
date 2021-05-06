import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import SEO from '../components/SEO';

const StyledH1 = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  transform: skew(-5deg) rotate(-1deg);
  font-size: 6rem;
  :before {
    width: 0;
    height: 0;
    opacity: 0.2;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid var(--color-text);
    content: '';
    pointer-events: none;
    position: absolute;
    transform: translateX(-0.5em) translateY(-1.5rem);
  }
  ${(props) => props.theme.xsmall} {
    font-size: 6rem;
  }
  ${(props) => props.theme.small} {
    font-size: 8rem;
  }
`;

const StyledH2 = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  ${(props) => props.theme.xsmall} {
    font-size: 6rem;
  }
  ${(props) => props.theme.small} {
    font-size: 8rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  margin: 5rem 5rem;
  min-height: 50vh;
  align-items: center;
  max-width: ${(props) => props.theme.maxWidth};
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  grid-row-gap: 10rem;

  ${(props) => props.theme.small} {
    grid-template-columns: 1fr;
    margin: 10rem 5rem;
  }

  ${(props) => props.theme.medium} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    margin: 10rem 3rem;
  }

  ${(props) => props.theme.large} {
    margin: 8rem auto;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledListParallelogram = styled.ul`
  margin: 0.75em 0;
  font-size: 2rem;
  padding: 0 1em;
  list-style-type: none;
  li:before {
    content: '';
    width: 1.2rem;
    height: 0.9rem;
    opacity: 0.5;
    background-color: ${(props) => props.theme.colors.white};
    left: -1em;
    top: 0.9em;
    position: relative;
    display: block;
    clip-path: polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%);
  }
`;

const StyledSkills = styled.ul`
  font-size: 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  order: 3;
  ${(props) => props.theme.small} {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledTriangle = styled.div`
  align-self: center;
  order: 1;
  width: 100%;
  max-width: 800px;
`;

const StyledMainInformation = styled.div`
  order: 2;
`;

const StyledInformationSkills = styled.div`
  order: 6;
`;

const StyledH3 = styled.h3`
  font-size: 3rem;
`;

const AboutMe = () => (
  <StaticQuery
    query={graphql`
      {
        profileImage: file(relativePath: { eq: "profilePicture.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
        meJumpingImage: file(relativePath: { eq: "meJumping.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
        meHackingImage: file(relativePath: { eq: "meHacking.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
      }
    `}
    render={(data) => (
      <Layout>
        <SEO title="About Me" keywords={[`about me`, `aerman`, `frontend`, `engineer`]} />
        <Wrapper>
          <StyledTriangle>
            {` `}
            <GatsbyImage image={data.profileImage.childImageSharp.gatsbyImageData} alt="A picture of myself" />
          </StyledTriangle>
          <StyledMainInformation>
            <StyledH1>Aerman</StyledH1>
          </StyledMainInformation>
          <StyledInformationSkills>
            <Heading appearance="H2" backgroundStyle="PARALLELOGRAM">
              <StyledH2>Skills</StyledH2>
            </Heading>
            <StyledSkills>
              <StyledListParallelogram>
                <StyledH3>💅 Frontend</StyledH3>
                <li>JavaScript</li>
                <li>Styled-Components - CSS</li>
                <li>React</li>
                <StyledH3>Things I am currently learning</StyledH3>
                <li>SCSS</li>
                <li>TypeScript</li>
              </StyledListParallelogram>
            </StyledSkills>
          </StyledInformationSkills>
        </Wrapper>
      </Layout>
    )}
  />
);

export default AboutMe;
