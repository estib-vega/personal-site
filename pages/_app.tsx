import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import "../styles/global.css";

interface SessionProps {
  session: Session;
}

const App = ({ Component, pageProps }: AppProps<SessionProps>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
