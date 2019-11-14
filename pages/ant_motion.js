import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav0 from '../components/AntMotion/Nav0';
import Banner0 from '../components/AntMotion/Banner0';
import Content0 from '../components/AntMotion/Content0';
import Content7 from '../components/AntMotion/Content7';
import Content13 from '../components/AntMotion/Content13';
import Content12 from '../components/AntMotion/Content12';
import Footer0 from '../components/AntMotion/Footer0';

import {
  Nav00DataSource,
  Banner00DataSource,
  Content00DataSource,
  Content70DataSource,
  Content130DataSource,
  Content120DataSource,
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
      id="Banner0_0"
      key="Banner0_0"
      dataSource={Banner00DataSource}
    />,
    <Content0
      id="Content0_0"
      key="Content0_0"
      dataSource={Content00DataSource}
    />,
    <Content7
      id="Content7_0"
      key="Content7_0"
      dataSource={Content70DataSource}
    />,
    <Content13
      id="Content13_0"
      key="Content13_0"
      dataSource={Content130DataSource}
    />,
    <Content12
      id="Content12_0"
      key="Content12_0"
      dataSource={Content120DataSource}
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
