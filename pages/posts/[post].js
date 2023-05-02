import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Post from "../../components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";
const { Framework } = require("@superfluid-finance/sdk-core");

export default function Article() {
  const { data: signer } = useSigner();
  const router = useRouter();
  const provider = useProvider();
  const post = router.query;

  const [daix, setDaix] = useState(null);
  const [loading, setLoading] = useState(true);
  let sf;

  useEffect(() => {
    const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
    const fetchToken = async () => {
      sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider: provider,
      });

      daix = await sf.loadSuperToken(fDAIx);

      setDaix(daix);
      setLoading(false);
    };

    fetchToken();
  }, [provider]);

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />

      {signer && (
        <Post
          signer={signer}
          post={post}
          provider={provider}
          daix={daix}
          loading={loading}
        />
      )}

      <Footer />
    </div>
  );
}
