import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { LOADING_VAR_COLOR } from "../styles/colors";
import "../styles/global.css";

interface SessionProps {
  session: Session;
}

const App = ({ Component, pageProps }: AppProps<SessionProps>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress color={LOADING_VAR_COLOR} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
