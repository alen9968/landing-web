import React from 'react';
import { enquireScreen } from 'enquire-js';

import Content0 from '../components/Home/Content0';
import Content7 from '../components/Home/Content7';
import Content13 from '../components/Home/Content13';
import Content12 from '../components/Home/Content12';

import {
  Content00DataSource,
  Content70DataSource,
  Content130DataSource,
  Content120DataSource,
} from '../components/Home/data.source.js';


const C0 = () => {
  const children = [
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
 ];
  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}
export default C0
