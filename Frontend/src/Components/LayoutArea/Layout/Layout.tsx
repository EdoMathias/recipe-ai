import React from 'react';
import Copyrights from '../Copyrights/Copyrights';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Routing from '../Routing/Routing';
import './Layout.css';

function Layout(): React.ReactElement {
  return (
    <div className="Layout">
      <nav>
        <Menu />
      </nav>
      <main>
        <header>
          <Header />
        </header>
        <Routing />
      </main>
      <footer>
        <Copyrights />
      </footer>
    </div>
  );
}

export default Layout;
