import Header from "../components/Header";
import Footer from "../components/Footer";
import Mint from "../components/Mint";
import Uploading from "../components/Uploading";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { useSigner } from "wagmi";

export default function Create() {
  const { data: signer } = useSigner();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Upload Image");

  const NFT_API_KEY = process.env.NEXT_PUBLIC_NFT_API_KEY;

  let image;
  let metadata;
  let currentdate = new Date();
  function onUpload(e) {
    image = e.target.files[0];
  }

  //

  async function storeNFT(e) {
    const nft = {
      image, // use image Blob as `image` field
      name: title,
      description: story,
      author: signer._address,
      date: currentdate.getDate(),
    };

    setStatus(Uploading);
    console.log("Storing NFT...");
    console.log("Signer address is : ", signer._address);

    const client = new NFTStorage({ token: NFT_API_KEY });
    metadata = await client.store(nft);
    console.log("Metadate hash : ", metadata);
    //
    console.log("Signer data : ", signer);
    //
    console.log("NFT data stored!");
    setStatus("NFT data stored!");
    console.log("Metadata URI: ", metadata.url);

    setStatus("NFT Stored!");

    setData({ metadata, signer });
  }

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />

      <div className="flex items-center justify-center mt-20 py-24 bg-gray-900">
        <section className="w-5/6">
          <h2 className="text-white md:text-5xl xl:text-5xl font-bold tracking-tight mb-12">
            Your words are valuable <br />
            <span className="text-blue-600">Create your post now!</span>
          </h2>
          <div className="bg-gray-900">
            <div className="w-9/12 mb-4 border border-gray-200  rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"></div>
              </div>
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="editor"
                  className="block w-full px-0 text-3xl text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="The title goes here"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-9/12 h-full mb-4 border border-gray-200  rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"></div>
              </div>
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="editor"
                  rows="20"
                  className="block w-full px-0 text-xl text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write your story..."
                  onChange={(e) => setStory(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <input
              type="file"
              name="Asset"
              placeholder="Select an image..."
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
              onChange={onUpload}
            />{" "}
            <button
              onClick={(e) => storeNFT(e)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
            >
              {status}
            </button>
            <br /> <br />
            <div>{data && <Mint data={data} />}</div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
