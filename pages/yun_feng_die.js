import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';

import Header from '../components/YunFengDie/Header';
import Banner from '../components/YunFengDie/Banner';
import Page1 from '../components/YunFengDie/Page1';
import Page2 from '../components/YunFengDie/Page2';
import Page3 from '../components/YunFengDie/Page3';
import Page4 from '../components/YunFengDie/Page4';
import Footer from '../components/YunFengDie/Footer';
import '../components/YunFengDie/less/style';

const Yun_feng_die =() => {

  return (
    <div className="home-page">
      <Header key="header" />
      <Banner key="banner" />
      <Page1 key="page1" />
      <Page2 key="page2" />
      <Page3 key="page3" />
      <Page4 key="page4" />
      <Footer key="footer" />
      <DocumentTitle title="凤蝶 - 移动建站平台" />
    </div>
  );
}
export default Yun_feng_die
