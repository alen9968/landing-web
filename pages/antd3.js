import React, { useState, useEffect } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Header from '../components/Antd3/Header';
import Banner from '../components/Antd3/Banner';
import Page1 from '../components/Antd3/Page1';
import Page2 from '../components/Antd3/Page2';
import Page3 from '../components/Antd3/Page3';
import Footer from '../components/Antd3/Footer';
//import cnLocale from '../components/Antd3/zh-CN';

import '../components/Antd3/less/style';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const Antd3 = () => {
  const [appLocale, setAppLocale] = useState('')
  const [isMobile, setIsMobile] = useState('')

  useEffect(() => {
    //  addLocaleData(appLocale.data)
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

  return (
    //<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <IntlProvider locale='en' messages={appLocale.messages}>
      <div className="page-wrapper home">
        <Header />
        <Banner isMobile={isMobile} />
        <Page1 isMobile={isMobile} />
        <Page2 isMobile={isMobile} />
        <Page3 />
        <Footer />
        <DocumentTitle title="Ant-Design" key="title" />
      </div>
    </IntlProvider>
  );
}
export default Antd3

