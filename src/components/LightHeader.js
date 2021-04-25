import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import { StyledHeaderBG, StyledWrapper, StyledInformation, StyledName } from '../templates/PageStyles/StyledHome';
import { getImage } from 'gatsby-plugin-image';

import Social from './Social';

const LightHeader = () => {
  const { placeholderImage } = useStaticQuery(graphql`
    {
      placeholderImage: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `);

  const pluginImage = getImage(placeholderImage);

  const backgroundFluidImage = [pluginImage, `var(--linear-gradient)`].reverse();

  return (
    <StyledHeaderBG tag={`header`} image={backgroundFluidImage}>
      <StyledWrapper>
        <StyledInformation>
          <span>HEY EVERYONE MY NAME IS JACOB COFMAN</span>
          <h1>
            I LOVE WEB DEVELOPMENT
            <span role="img" aria-label="a computer emoji">
              {` `}
              💻
            </span>
            , VOLLEYBALL
            <span role="img" aria-label="a volleyball emoji">
              🏐
            </span>
            {` `}
            AND TRAVELLING{` `}
            <span role="img" aria-label="a tent emoji">
              ⛺️
            </span>
            {` `}
            <span role="img" aria-label="a nature tree emoji">
              🌲
            </span>
            {` `}
            <span role="img" aria-label="a run emoji">
              🏃
            </span>
          </h1>
        </StyledInformation>
      </StyledWrapper>
      <Social />
      <StyledName>Jacob Cofman</StyledName>
    </StyledHeaderBG>
  );
};

export default LightHeader;
