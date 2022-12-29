import React from "react";
import Blogs from "./blogs";
import { SEO } from "../../components/SEO";

export default Blogs;

export const Head = () => (
    <>
      <SEO title="Blogs" description="Blogs page" pathname="/blogs" />
    </>
)
