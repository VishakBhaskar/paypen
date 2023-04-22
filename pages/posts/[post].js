import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Post from "../../components/Post";
import { useRouter } from "next/router";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";

const { Framework } = require("@superfluid-finance/sdk-core");
import Paypen from "../../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../../config";

export default function Article() {
  const { data: signer } = useSigner();
  const router = useRouter();
  const provider = useProvider();
  const post = router.query;

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />

      {signer && <Post signer={signer} post={post} provider={provider} />}

      <Footer />
    </div>
  );
}
