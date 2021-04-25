import { Link } from 'gatsby';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { usePosts } from '../hooks/usePosts';

import { zIndexbackGroundAfterElements } from '../components/Styles/zIndex';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Divider from '../components/Divider';

const BlogArtikelWrapper = styled.article`
  background-color: ${(props) => props.theme.black};
  transition: color ${(props) => props.theme.themeTransition};
  min-height: 300px;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BlogArtikel = styled.div`
  display: flex;
  max-width: ${(props) => props.theme.maxWidth};

  margin: 2rem auto;
  flex-direction: column;

  ${(props) => props.theme.small} {
    flex-direction: column;
    width: 80%;
  }

  ${(props) => props.theme.large} {
    width: 60%;
    flex-direction: row;
  }

  ${(props) => props.theme.xlarge} {
    flex-direction: row;
  }
`;

// const BlogArtikelHeaderTextShadow = theme(`mode`, {
//   light: `2px 2px 0 rgba(0,0, 0,0.3)`,
//   dark: `2px 2px 0 rgba(255,255, 255,0.3)`,
// });

const BaseArtikelHeader = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-text);
  transform: skew(-5deg) rotate(-1deg);
  text-shadow: var(--text-shadow);
  a {
    color: var(--color-text);
  }
  a:hover,
  a:focus {
    color: ${(props) => props.theme.colors.primary};
    transition: none;
  }
  ${(props) => props.theme.xsmall} {
    font-size: 3rem;
  }
  ${(props) => props.theme.small} {
    font-size: 5rem;
  }
  ${(props) => props.theme.medium} {
    font-size: 5rem;
  }
`;

const StyledBlogArtikelHeaderTriangle = styled(BaseArtikelHeader)`
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
    z-index: ${zIndexbackGroundAfterElements};
    transform: translateX(-0.5em) translateY(-1.5rem);
  }
`;

const StyledBlogArtikelHeaderCircle = styled(BaseArtikelHeader)`
  :before {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    opacity: 0.2;
    background-color: var(--color-text);
    content: '';
    pointer-events: none;
    position: absolute;
    transform: translateX(-0.5em) translateY(-1.5rem);
  }
`;

const StyledBlogArtikelHeaderParallelogram = styled(BaseArtikelHeader)`
  :before {
    width: 50px;
    height: 40px;
    background: var(--color-text);
    opacity: 0.2;
    content: '';
    pointer-events: none;
    position: absolute;
    transform: translateX(-0.5em) translateY(-1.5rem) skew(20deg);
  }
`;

const BlogArtikelImageWrapper = styled.div`
  min-width: 250px;
  width: 250px;
  flex-direction: row;
  margin: 0 auto;

  ${(props) => props.theme.small} {
    margin: 0 auto;
  }
  ${(props) => props.theme.medium} {
    margin: 1rem 2rem;
  }
`;

const BlogArtikelSingleWrapper = styled.div`
  flex-direction: row;
  margin: 1rem 2rem;
  padding: 1rem;
`;

const BlogartikleSubInfo = styled.p`
  font-style: italic;
  font-size: 1.4rem;
`;

const BlogArtikelHeaderTime = styled.time`
  font-size: 2rem;
  color: var(--color-text);
  transition: color ${(props) => props.theme.themeTransition};
  padding: 0.1rem 0.25rem;
  margin: 0.25rem 0;
`;

const BlogArtikelHeaderTags = styled.span`
  font-size: 1.5rem;
  padding: 0.1rem 0.25rem;
  margin: 0.25rem 0;
  transition: color ${(props) => props.theme.themeTransition};
  color: var(--color-text);
`;

const StyledMain = styled.main`
  border-top: 1px solid #201c29;
`;

const IndexPage = () => {
  let { posts } = usePosts();
  // only render most recent 5 posts;
  posts = posts.slice(0, 5);
  return (
    <Layout>
      <SEO title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Header />
      <StyledMain>
        {posts.map((post, index) => {
          return (
            <BlogArtikelWrapper key={post.title}>
              <BlogArtikel>
                <BlogArtikelImageWrapper>
                  <Link aria-label={`Go to ${post.slug}`} to={post.slug}>
                    <GatsbyImage
                      image={post.featuredImage.childImageSharp.gatsbyImageData}
                      alt={`article featured image for ${post.title}`}
                    />
                  </Link>
                </BlogArtikelImageWrapper>
                <BlogArtikelSingleWrapper>
                  {index % 3 === 0 && (
                    <StyledBlogArtikelHeaderTriangle>
                      <Link to={post.slug}>{post.title}</Link>
                    </StyledBlogArtikelHeaderTriangle>
                  )}
                  {index % 3 === 1 && (
                    <StyledBlogArtikelHeaderCircle>
                      <Link to={post.slug}>{post.title}</Link>
                    </StyledBlogArtikelHeaderCircle>
                  )}
                  {index % 3 === 2 && (
                    <StyledBlogArtikelHeaderParallelogram>
                      <Link to={post.slug}>{post.title}</Link>
                    </StyledBlogArtikelHeaderParallelogram>
                  )}

                  <BlogartikleSubInfo>
                    <BlogArtikelHeaderTime>{post.date}</BlogArtikelHeaderTime>
                    <BlogArtikelHeaderTags>
                      {post.tags != null &&
                        post.tags.map((tag, index, allTags) => {
                          if (allTags.length - 1 === index) {
                            return ` ${tag}`;
                          } else {
                            return ` ${tag},`;
                          }
                        })}
                    </BlogArtikelHeaderTags>
                    {` `}
                  </BlogartikleSubInfo>

                  {post.excerpt}
                </BlogArtikelSingleWrapper>
              </BlogArtikel>
              <Divider />
            </BlogArtikelWrapper>
          );
        })}
      </StyledMain>
    </Layout>
  );
};

export default IndexPage;
