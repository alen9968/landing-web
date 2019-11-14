import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Header from '../components/Antd2/Header';
import Banner from '../components/Antd2/Banner';
import Page1 from '../components/Antd2/Page1';
import Page2 from '../components/Antd2/Page2';
import Page3 from '../components/Antd2/Page3';
import Page4 from '../components/Antd2/Page4';
import Footer from '../components/Antd2/Footer';

import '../components/Antd2/less/style';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});


const Antd2 = () => {
  const [isFirstScreen, setIsFirstScreen] = useState(true)
  const [isMobile, setIsMobile] = useState('')

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

  const onEnterChange = (mode) => {
    if( mode === 'enter'){
      setIsFirstScreen(true)
    } else {
      setIsFirstScreen(false)
    }
  }

  return (
    [
      <Header key="header" isFirstScreen={isFirstScreen} isMobile={isMobile} />,
      <Banner key="banner" onEnterChange={onEnterChange} />,
      <Page1 key="page1" isMobile={isMobile} />,
      <Page2 key="page2" />,
      <Page3 key="page3" isMobile={isMobile} />,
      <Page4 key="page4" />,
      <Footer key="footer" />,
      <DocumentTitle title="Ant Design - 一个 UI 设计语言" key="title" />,
    ]
  )
}
export default Antd2

