import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { StyledHeaderBG, StyledWrapper, StyledInformation } from '../templates/PageStyles/StyledHome';
import { getImage } from 'gatsby-plugin-image';
import { FormattedMessage } from "react-intl";

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
          <h1>
            <FormattedMessage id="text_0006" />
          </h1>
        </StyledInformation>
      </StyledWrapper>
    </StyledHeaderBG>
  );
};

export default LightHeader;
