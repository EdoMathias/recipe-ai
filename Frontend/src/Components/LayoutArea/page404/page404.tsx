import React from 'react';
import './page404.css';

function Page404(): React.ReactElement {
  return (
    <div className="page404">
      <p>The page you are looking for doesn't exist.</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true"
        allow="autoplay"
        title="Page not Found"
      />
    </div>
  );
}

export default Page404;
