import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";
import { useContractRead } from "wagmi";

export default function MyPosts() {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { data } = useContractRead({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "balanceOf",
    args: [props.signer._address],
    chainId: 80001,
    // testing
    // chainId: 1337,
  });

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && (
        <PostsByUser signer={signer} provider={provider} data={data} />
      )}
      <Footer />
    </div>
  );
}
