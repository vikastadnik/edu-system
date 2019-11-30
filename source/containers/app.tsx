import * as React from 'react';
import * as Redux from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import { IState } from '../interfaces';
import { Main } from '../reducers';
import { AppRootContainer } from './app-root';

export class App extends React.Component<{}, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      store: Redux.createStore(Main, Redux.applyMiddleware(thunk, createLogger({ collapsed: true })))
    };
  }

  public render(): JSX.Element {
    return (
      <Provider store={this.state.store}>
        <BrowserRouter>
          <AppRootContainer/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export interface IAppState {
  readonly store: Redux.Store<IState>;
}
