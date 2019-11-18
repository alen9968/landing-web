import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav0 from '../components/AntMotion/Nav0';
import Banner0 from '../components/AntMotion/Banner0';
import Content0 from '../components/AntMotion/Content0';
import Content7 from '../components/AntMotion/Content7';
import Content3 from '../components/AntMotion/Content3';
import Content5 from '../components/AntMotion/Content5';
import Footer0 from '../components/AntMotion/Footer0';

import {
  Nav00DataSource,
  Banner01DataSource,
  Content00DataSource,
  Content70DataSource,
  Content30DataSource,
  Content50DataSource,
  Footer00DataSource,
} from '../components/AntMotion/data.source.js';

import '../styles/less/style.less';

const Ant_motion = () => {
  const children = [
    <Nav0
      id="Nav0_0"
      key="Nav0_0"
      dataSource={Nav00DataSource}
    />,
    <Banner0
      id="Banner0_1"
      key="Banner0_1"
      dataSource={Banner01DataSource}
    />,
    <Content0
      id="Content0_0"
      key="Content0_0"
      dataSource={Content00DataSource}
    />,
    <Content5
      id="Content5_0"
      key="Content5_0"
      dataSource={Content50DataSource}
    />,
    <Content3
      id="Content3_0"
      key="Content3_0"
      dataSource={Content30DataSource}
    />,
    <Footer0
      id="Footer0_0"
      key="Footer0_0"
      dataSource={Footer00DataSource}
    />
  ];
  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}
export default Ant_motion
