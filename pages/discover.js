import Header from "../components/Header";
import Footer from "../components/Footer";
import AllPosts from "../components/AllPosts";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";

import { useContractRead } from "wagmi";
import { paypenAddress } from "../config";
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";

export default function MyPosts() {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const { data } = useContractRead({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "totalSupply",
    chainId: 80001,
    // testing
    // chainId: 1337,
  });

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && <AllPosts signer={signer} provider={provider} data={data} />}
      <Footer />
    </div>
  );
}
