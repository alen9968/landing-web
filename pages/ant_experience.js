import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Header from '../components/AntExperience/Header';
import Banner from '../components/AntExperience/Banner';
import Page1 from '../components/AntExperience/Page1';
import Page2 from '../components/AntExperience/Page2';
import Page3 from '../components/AntExperience/Page3';
import Page4 from '../components/AntExperience/Page4';
import Footer from '../components/AntExperience/Footer';
import '../components/AntExperience/less/style';


let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const Ant_experience = () => {
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
      <Page1 key="page1" isMobile={isMobile} />,
      <Page2 key="page2" isMobile={isMobile} />,
      <Page3 key="page3" isMobile={isMobile} />,
      <Page4 key="page4" />,
      <Footer key="footer" />,
      <DocumentTitle title="蚂蚁体验云" key="title" />,
    ]
  );
}
export default Ant_experience
