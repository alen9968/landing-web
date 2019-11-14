import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Header from '../components/AntV/Header';
import Banner from '../components/AntV/Banner';
import Page1 from '../components/AntV/Page1';
import Page2 from '../components/AntV/Page2';
import Page3 from '../components/AntV/Page3';
import Page4 from '../components/AntV/Page4';
import Page5 from '../components/AntV/Page5';
import Footer from '../components/AntV/Footer';
import '../components/AntV/less/style';


let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const Ant_v = () => {
  const [isMobile, setIsMobile] = useState('')
  const [showShadow, setShowShadow] = useState(false)

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

 const  navToShadow = (e) => {
   if( e.mode === 'leave' ){
     setShowShadow(true)
   }
 }
  return (
    [
      <Header key="header" className={showShadow ? 'show-shadow' : ''} />,
      <Banner key="banner" isMobile={isMobile} navToShadow={navToShadow} />,
      <Page1 key="page1" />,
      <Page2 key="page2" />,
      <Page3 key="page3" />,
      <Page4 key="page4" isMobile={isMobile} />,
      <Page5 key="page5" />,
      <Footer key="footer" />,
      <DocumentTitle title="Ant-V" />,
    ]
  );
}
export default Ant_v


