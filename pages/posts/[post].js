import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Post from "../../components/Post";
import { useRouter } from "next/router";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";

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
