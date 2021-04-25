import React from 'react';

import Layout from '../components/Layout';
import Link from '../components/Link';

const NotFoundPage = () => {
  return (
    <Layout>
      <main
        css={`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 15rem;
        `}
      >
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">Back to Home</Link>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
