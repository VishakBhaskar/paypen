import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import { useSigner } from "wagmi";

export default function MyPosts() {
  const { data: signer } = useSigner();

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && <PostsByUser signer={signer} />}
      <Footer />
    </div>
  );
}
