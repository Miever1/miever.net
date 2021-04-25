import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Html } from '@react-three/drei';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from 'styled-components';

import { StyledInformation, StyledName, StyledHeaderBG } from '../templates/PageStyles/StyledHome';
import { Block } from './SwarmThree/Block';
import Social from './Social';
import { Shapes } from './SwarmThree/HomeShapes';

const HtmlContent = ({ className, style, children, portal }) => {
  return (
    <Html fullscreen portal={portal}>
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  );
};

const FullHeader = () => {
  const domContent = React.useRef();
  const themeContext = React.useContext(ThemeContext);
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);
  const backgroundFluidImage = [
    image.childImageSharp.gatsbyImageData,
    `${
      themeContext && themeContext.mode === `dark`
        ? `linear-gradient(rgba(1, 1, 1, 0.95), rgba(1, 1, 1, 0.95))`
        : `linear-gradient(rgba(244, 244, 244, 0.95), rgba(244, 244, 244, 0.95))`
    }`,
  ].reverse();

  return (
    <StyledHeaderBG tag={`header`} fluid={backgroundFluidImage}>
      <Canvas
        style={{
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: '10',
        }}
        colorManagement
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 2.5;
        }}
      >
        <Block factor={1.5} offset={0}>
          <Shapes />
          <HtmlContent portal={domContent}>
            <div
              css={`
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-align-items: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
                height: 75vh;
              `}
            >
              <StyledInformation theme={themeContext}>
                <span css={``}>HEY EVERYONE MY NAME IS JACOB COFMAN</span>
                <h1>
                  I LOVE WEB DEVELOPMENT
                  <span role="img" aria-label="computer">
                    {` `}
                    💻
                  </span>
                  , VOLLEYBALL
                  <span role="img" aria-label="computer">
                    🏐
                  </span>
                  {` `}
                  AND TRAVELLING{` `}
                  <span role="img" aria-label="tent">
                    ⛺️
                  </span>
                  {` `}
                  <span role="img" aria-label="nature tree">
                    🌲
                  </span>
                  {` `}
                  <span role="img" aria-label="run">
                    🏃
                  </span>
                </h1>
              </StyledInformation>
            </div>
            <Social />
            <StyledName>Jacob Cofman</StyledName>
          </HtmlContent>
        </Block>
      </Canvas>
    </StyledHeaderBG>
  );
};

FullHeader.displayName = 'FullHeader';

export default FullHeader;
