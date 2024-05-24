import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { resolver, theme } from "../theme";
import { Provider } from "react-redux";
import { store } from "../store/store";
import '../styles/global.scss';
import { Layout } from "../components/layout/Layout";
import { Inter } from 'next/font/google'
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <Head>
          <title>ArrowFlicks</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
          <style jsx global>{`html {font-family: ${inter.style.fontFamily};}`}</style>
        </Head>
        {router.pathname === '/404' ? <Component {...pageProps}/> :
        <Layout>
          <Component {...pageProps} />
        </Layout>}
      </MantineProvider>
    </Provider>
  );
}
