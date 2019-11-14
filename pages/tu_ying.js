import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav3 from '../components/TuYing/Nav3';
import Banner5 from '../components/TuYing/Banner5';
import Feature6 from '../components/TuYing/Feature6';
import Feature7 from '../components/TuYing/Feature7';
import Feature0 from '../components/TuYing/Feature0';
import Feature8 from '../components/TuYing/Feature8';
import Footer1 from '../components/TuYing/Footer1';

import {
  Nav30DataSource,
  Banner50DataSource,
  Feature60DataSource,
  Feature70DataSource,
  Feature00DataSource,
  Feature80DataSource,
  Footer10DataSource,
} from '../components/TuYing/data.source';

import '../components/TuYing/less/antMotionStyle.less';


const Tu_ying = () => {
  const children = [
    <Nav3
      id="Nav3_0"
      key="Nav3_0"
      dataSource={Nav30DataSource}
    />,
    <Banner5
      id="Banner5_0"
      key="Banner5_0"
      dataSource={Banner50DataSource}
    />,
    <Feature6
      id="Feature6_0"
      key="Feature6_0"
      dataSource={Feature60DataSource}
    />,
    <Feature7
      id="Feature7_0"
      key="Feature7_0"
      dataSource={Feature70DataSource}
    />,
    <Feature0
      id="Feature0_0"
      key="Feature0_0"
      dataSource={Feature00DataSource}
    />,
    <Feature8
      id="Feature8_0"
      key="Feature8_0"
      dataSource={Feature80DataSource}
    />,
    <Footer1
      id="Footer1_0"
      key="Footer1_0"
      dataSource={Footer10DataSource}
    />,
  ];
  return (
    <div>
      {children}
    </div>
  );
}
export default Tu_ying

