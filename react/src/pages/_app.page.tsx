import '#/styles/globals.css';
import { wrapper } from '#/components/ReduxProvider/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore({});

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col px-2">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};
export default App;
