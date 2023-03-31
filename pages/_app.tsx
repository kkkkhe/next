import type { AppProps } from 'next/app'
import {useStore} from '@/src/app'
import {Provider} from "react-redux";
import {appWithTranslation} from "next-i18next";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState)
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}
// export default appWithTranslation(App)