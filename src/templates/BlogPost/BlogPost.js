import React from 'react';
import styled, { css } from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import Link from '../../components/Link';

import TableOfContents from '../../components/TableOfContents';
import { StyledSingleBlogPostArticle } from './StyledBlogPost';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--color-primary);
  color: var(--color-text);
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${(props) =>
    props.primary &&
    css`
      background: var(--color-primary);
      color: var(--color-white);
    `}
  &:hover, &:focus {
    cursor: pointer;
  }
`;

const StyledHeader = styled.header`
  .gatsby-image-wrapper {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  h1 {
    margin: 0 1rem;
    text-align: center;

    transform: skew(-5deg) rotate(-1deg);
    margin-top: -6rem;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
    width: 80%;
    background-color: ${(props) => props.theme.colors.primary};
    transition: color ${(props) => props.theme.themeTransition};
    line-height: 1.1em;
    font-size: 4rem;

    ${(props) => props.theme.small} {
      font-size: 6rem;
    }
    ${(props) => props.theme.medium} {
      font-size: 8rem;
    }
  }
`;

const StyledBlogBottomNav = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  a {
    margin: 1rem 2rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledInfo = styled.div`
  text-align: center;
  margin: 1rem;
`;

const StyledTags = styled.div`
  font-style: italic;
`;

export default function Template({ data, pageContext }) {
  const { mdx: post } = data;
  const { next, prev } = pageContext;
  const image = getImage(post.frontmatter.headerImage);
  return (
    <Layout>
      <SEO
        title={`JCofman - ${post.frontmatter.title}`}
        description={post.frontmatter.description || post.frontmatter.excerpt || `nothing’`}
        image={image}
        pathname={post.frontmatter.path}
        article
      />
      <StyledHeader>
        <GatsbyImage image={image} alt={`background image which represents - ${post.frontmatter.title}`} />
        <h1>{post.frontmatter.title}</h1>
      </StyledHeader>
      <StyledInfo>
        {post.frontmatter.date}
        <StyledTags>
          {post.frontmatter.tags.map((tag, index, allTags) => {
            if (allTags.length - 1 === index) {
              return ` ${tag}`;
            } else {
              return ` ${tag},`;
            }
          })}
        </StyledTags>
      </StyledInfo>
      <StyledSingleBlogPostArticle className="blog-post">
        {typeof post.tableOfContents.items === 'undefined' ? (
          <div></div>
        ) : (
          <TableOfContents className="blog-post-toc" items={post.tableOfContents.items}></TableOfContents>
        )}
        <div className="blog-post-content">
          <MDXRenderer>{post.body}</MDXRenderer>
          <StyledBlogBottomNav>
            {prev && (
              <Link to={prev.path}>
                <small>{prev.title}</small>
                <StyledButton>
                  <FaChevronLeft /> Prev Post
                </StyledButton>
              </Link>
            )}
            {next && (
              <Link to={next.path}>
                <small>{next.title}</small>
                <StyledButton>
                  <FaChevronRight /> Next Post
                </StyledButton>
              </Link>
            )}
          </StyledBlogBottomNav>
        </div>
      </StyledSingleBlogPostArticle>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($id: String) {
    mdx(id: { eq: $id }) {
      tableOfContents
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
        headerImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
