import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { Link as GatsbyLink } from 'gatsby';
import Heading from '../components/Heading';

import { usePosts } from '../hooks/usePosts';

const StyledGrid = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3.2rem;
  color: var(--color-text);
`;

const StyledGradientBox = styled.div`
  box-sizing: border-box;
  margin: 1rem auto 2rem;
  padding: 0.5rem;
  width: 200%;
  max-width: 25rem;
  background: linear-gradient(var(--color-background), var(--color-background)),
    linear-gradient(to right, #3eecac, #4a90e2);
  border: 5px solid transparent;
  background-repeat: no-repeat;
  background-origin: padding-box, border-box;
  border-radius: 1rem;
  border-width: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    border: 6px solid var(--color-background);
    border-radius: 0.8rem;
  }
`;

const BlogArtikelImageWrapper = styled.div`
  min-width: 30rem;
  width: 30rem;
  flex-direction: row;
  margin: 0 auto;
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--padding-6);
  padding-bottom: var(--padding-6);
  padding-left: var(--padding-3);
  padding-right: var(--padding-3);
  background: var(--color-background);
  flex-grow: 1;
`;

const StyledBlogPost = styled.div`
  max-width: 30rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: var(--color-background);
  display: flex;

  img {
    object-position: center;
    object-fit: cover;
    width: 100%;
  }
`;

const MyBlog = () => {
  const { posts } = usePosts();

  return (
    <Layout>
      <SEO title="All posts" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <div
        css={`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: ${(props) => props.theme.maxWidth};
          margin: 0 auto;
          padding-top: 15rem;
        `}
      >
        <StyledGradientBox>
          <span> {posts.length} posts </span>
        </StyledGradientBox>
        <StyledGrid>
          {posts.map((post) => {
            return (
              <StyledBlogPost key={post.title}>
                <GatsbyLink
                  aria-label={`Go to ${post.slug}`}
                  to={post.slug}
                  css={`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <BlogArtikelImageWrapper>
                    <GatsbyImage
                      alt={`unsplash cover image to article ${post.title}`}
                      image={getImage(post.featuredImage)}
                    />
                  </BlogArtikelImageWrapper>

                  <StyledArticle
                    className="post-container"
                    css={`
                      padding: 1.5rem;
                    `}
                  >
                    <span
                      css={`
                        letter-spacing: 0.1em;
                      `}
                    >
                      Tags
                    </span>
                    <span>
                      {' '}
                      {post.tags != null &&
                        post.tags.map((tag, index, allTags) => {
                          if (allTags.length - 1 === index) {
                            return ` ${tag}`;
                          } else {
                            return ` ${tag},`;
                          }
                        })}
                    </span>
                    <Heading
                      css={`
                        color: var(--color-text);
                        font-size: 3rem;
                      `}
                      appearance="H3"
                    >
                      {post.title}
                    </Heading>

                    <p
                      css={`
                        margin-bottom: 0.75rem;
                      `}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: auto;
                      `}
                    >
                      <Link aria-label={`Go to ${post.slug}`} to={post.slug}>
                        Read
                      </Link>
                    </div>
                  </StyledArticle>
                </GatsbyLink>
              </StyledBlogPost>
            );
          })}
        </StyledGrid>

        <Link
          css={`
            margin-top: 12.8rem;
          `}
          to="/"
        >
          Back to homepage
        </Link>
      </div>
    </Layout>
  );
};

export default MyBlog;
