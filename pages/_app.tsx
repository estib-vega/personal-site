import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../styles/global.css";

interface SessionProps {
  session: Session;
}

const App = ({ Component, pageProps }: AppProps<SessionProps>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="mainTheme">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default App;
