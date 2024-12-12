import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { base } from "@reown/appkit/networks";
import RoutesFile from "./RoutesFile";
import "./App.css";

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
function App() {
  return (
    <>
      <RoutesFile />
      <ToastContainer />
      {/* <Roadmap/> */}
    </>
  );
}

export default App;
