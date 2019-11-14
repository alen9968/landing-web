import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Header from '../components/AntdPro/Header';
import Banner from '../components/AntdPro/Banner';
import Page1 from '../components/AntdPro/Page1';
import Page2 from '../components/AntdPro/Page2';
import Footer from '../components/AntdPro/Footer';
import '../components/AntdPro/less/style';

let isMobile;

enquireScreen((b) => {
  isMobile = b;
});

const Ant_pro = () => {
  const [isMobile, setIsMobile] = useState('')
  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

  return (
    <DocumentTitle title="Ant Design - pro">
      <div>
        <Header isMobile={isMobile} />
        <div className="home-wrapper">
          <Banner isMobile={isMobile} />
          <Page1 isMobile={isMobile} />
          <Page2 />
        </div>
        <Footer />
      </div>
    </DocumentTitle>
  );
}
export default Ant_pro


