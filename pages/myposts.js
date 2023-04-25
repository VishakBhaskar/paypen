import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";
import { useContractRead } from "wagmi";

import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

export default function MyPosts() {
  const { signer } = useSigner();
  const provider = useProvider();

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && <PostsByUser signer={signer} provider={provider} />}
      <Footer />
    </div>
  );
}
