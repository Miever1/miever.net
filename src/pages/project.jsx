import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

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

const Project = () => (
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
    render={() => (
      <Layout>
        <SEO title="Project" keywords={[`project`, `aerman`, `frontend`, `engineer`]} />
        <Wrapper>
            under construction
        </Wrapper>
      </Layout>
    )}
  />
);

export default Project;
