import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import AllPosts from "../components/AllPosts";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";

export default function MyPosts() {
  const { data: signer } = useSigner();
  const provider = useProvider();

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && <AllPosts signer={signer} provider={provider} />}
      <Footer />
    </div>
  );
}
