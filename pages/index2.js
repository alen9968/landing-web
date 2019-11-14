import React, { useState, useEffect } from 'react';
import { enquireScreen } from 'enquire-js';
import LinksList from '../components/LinksList';
// import Nav0 from '../components/AntMotion/Nav0';
// import Footer1 from '../components/AntMotion/Footer1';
// import {
//   Nav00DataSource,
//   Footer10DataSource,
// } from '../components/AntMotion/data.source.js';
// import '../components/AntMotion/less/style.less';
//
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const Index2 = () => {
  // const children = [
  //   <Nav0
  //     id="Nav0_0"
  //     key="Nav0_0"
  //     dataSource={Nav00DataSource}
  //     isMobile={isMobile}
  //   />,
  //   <LinksList />,
  //   <Footer1
  //     id="Footer1_0"
  //     key="Footer1_0"
  //     dataSource={Footer10DataSource}
  //     isMobile={isMobile}
  //   />
  // ];
  const children = [
    <LinksList />
  ]
  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}
export default Index2
