import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "../src/redux/reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk
  )(createStore);

  let store = createStoreWithMiddleware(Reducer, undefined);

  if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
