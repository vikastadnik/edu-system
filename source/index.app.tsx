import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BUILD } from './build.cfg';
import './index.app.less';
import { BaseAPI } from './api';
import { App } from './containers/app';

BaseAPI.setBaseURL(process.env.HOST || BUILD.BASE_URL);

ReactDOM.render(
  <App/>,
  document.getElementById('app-root')
);
