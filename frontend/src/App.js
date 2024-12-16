import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { base } from "@reown/appkit/networks";
import RoutesFile from "./RoutesFile";
import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TonWalletProvider } from "./context/TonWalletContext";

// 1. Get projectId
const projectId = "dc835ecaaa41287eb59a75fd08e11d48";

// 2. Set the networks
const networks = [base];

// 3. Create a metadata object - optional
const metadata = {
  name: "Charlie The Unicoin's presale website",
  description: "Charlie The Unicoin's presale website",
  url: "https://charlietheunicoin.sale/", // origin must match your domain & subdomain
  icons: ["/public/logo.png"],
};
// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

const isTonConnectSdkError = (error) => {
  return error && error.code && error.code.startsWith("TON_CONNECT_");
};

function App() {
  window.addEventListener("unhandledrejection", function(event) {
    if (isTonConnectSdkError(event.reason)) {
      console.warn("TonConnect SDK Error:", event.reason);
    }
  });

  return (
    <TonConnectUIProvider manifestUrl="http://localhost:3000/tonconnect-manifest.json">
      <TonWalletProvider>
        <RoutesFile />
      </TonWalletProvider>
      <ToastContainer />
    </TonConnectUIProvider>
  );
}

export default App;
