import "../styles/globals.css";
import NavBar from "../components/NavBar";
import "semantic-ui-css/semantic.min.css";
import { Web3Provider } from "../context/Web3Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3Provider>
        <NavBar />
        <Component {...pageProps} />
      </Web3Provider>
    </>
  );
}

export default MyApp;
