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

    //
    //
    //
    //
    //

    // <div className="bg-gray-900">
    //   <Header className="bg-gray-900" />
    //   <div className="container my-8 px-20 py-20 mx-auto">
    //     <section className="mb-20 text-white">
    //       <img
    //         src={post.image}
    //         className="w-full shadow-lg rounded-lg mb-6"
    //         alt=""
    //       />

    //       <div className="flex items-center mb-6">
    //         <div>
    //           <span>
    //             {" "}
    //             Published <u>{post.date}</u> by{" "}
    //           </span>
    //           <a href="#!" className="font-medium">
    //             {post.author}
    //           </a>
    //         </div>
    //       </div>

    //       <h1 className="font-bold text-3xl mb-6">{post.name}</h1>

    //       <p>{post.description}</p>
    //     </section>
    //   </div>
    //   <Footer />
    // </div>
  );
}
