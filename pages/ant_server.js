import React, { useState, useEffect } from 'react';
import { enquireScreen } from 'enquire-js';

import Nav2 from '../components/AntServer/Nav2';
import Banner3 from '../components/AntServer/Banner3';
import Content8 from '../components/AntServer/Content8';
import Content9 from '../components/AntServer/Content9';
import Content10 from '../components/AntServer/Content10';
import Content11 from '../components/AntServer/Content11';
import Content12 from '../components/AntServer/Content12';
import Footer2 from '../components/AntServer/Footer2';

import {
  Nav20DataSource,
  Banner30DataSource,
  Content80DataSource,
  Content90DataSource,
  Content100DataSource,
  Content110DataSource,
  Content120DataSource,
  Footer20DataSource,
} from '../components/AntServer/data.source.js';

import '../components/AntServer/less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const Ant_server = () => {
  const [isMobile, setIsMobile] = useState('')

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])


  const children = [
    <Nav2
      id="Nav2_0"
      key="Nav2_0"
      dataSource={Nav20DataSource}
      isMobile={isMobile}
    />,
    <Banner3
      id="Banner3_0"
      key="Banner3_0"
      dataSource={Banner30DataSource}
      isMobile={isMobile}
    />,
    <Content8
      id="Content8_0"
      key="Content8_0"
      dataSource={Content80DataSource}
      isMobile={isMobile}
    />,
    <Content9
      id="Content9_0"
      key="Content9_0"
      dataSource={Content90DataSource}
      isMobile={isMobile}
    />,
    <Content10
      id="Content10_0"
      key="Content10_0"
      dataSource={Content100DataSource}
      isMobile={isMobile}
    />,
    <Content11
      id="Content11_0"
      key="Content11_0"
      dataSource={Content110DataSource}
      isMobile={isMobile}
    />,
    <Content12
      id="Content12_0"
      key="Content12_0"
      dataSource={Content120DataSource}
      isMobile={isMobile}
    />,
    <Footer2
      id="Footer2_0"
      key="Footer2_0"
      dataSource={Footer20DataSource}
      isMobile={isMobile}
    />,
  ];
  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}
export default Ant_server
