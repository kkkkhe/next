import type { AppProps } from 'next/app'
import {fork, Scope, ValueMap, serialize} from "effector";
import {ReactElement, ReactNode, useMemo} from "react";
import {Provider} from "effector-react";
import {NextPage} from "next";

interface State {
    clientScope: Scope | null,
}

export const state: State = {
    clientScope: null,
}

export const INITIAL_STATE_KEY = '__EFFECTOR_NEXTJS_INITIAL_STATE__'

export function initializeScope(values: ValueMap) {
    let _clientScope =
        state.clientScope ??
        fork({
            values,
        });

    if (state.clientScope && values) {
        /*
         * Values have changed, most likely it's happened on the user navigation
         * Create the new Scope from the old one and save it as before
         */

        const currentValues = serialize(state.clientScope);
        const nextValues = { ...currentValues, ...values };

        _clientScope = fork({
            values: nextValues,
        });

        // Reset the current scope (Why?)
        state.clientScope = null;

        if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
            // console.log('USESCOPE - client second render or when values changes');
        }
    }

    // For SSG and SSR always create a new scope
    if (typeof window === 'undefined') {
        if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
            // console.log('USESCOPE - fork on server');
        }
        return _clientScope;
    }

    /*
     * Client first render
     * Create the new Scope and save it globally
     * We need it to be accessable inside getInitialProps
     */
    if (!state.clientScope) {
        if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
            // console.log('USESCOPE - client first render');
        }
        state.clientScope = _clientScope;
    }

    return _clientScope;
}
export const useScope = (values: ValueMap) => {
    return useMemo(() => initializeScope(values), [values]);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type LayoutAppProps = AppProps & {Component: NextPageWithLayout}

export default function MyApp({ Component, pageProps }: LayoutAppProps) {
    const { initialState} = pageProps
    const scope = useScope(initialState)
    const getLayout = Component.getLayout ?? ((page) => page)
  return (
      <Provider value={scope}>
          {getLayout(<Component {...pageProps} />)}
      </Provider>
  )
}
// MyApp.getInitialProps = async (context:any) => {
//     console.log(context)
//     const data = await fetch('https://jsonplaceholder.typicode.com/todos')
//     const result = await data.json()
//     return {
//         result
//     }
// }
// export default MyApp
// export default appWithTranslation(App)
