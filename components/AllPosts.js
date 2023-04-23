import Read from "./Read";
import { useContractRead } from "wagmi";
import { useState } from "react";
const { ethers } = require("ethers");
import Image from "next/image";

import { useEffect } from "react";

import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";
import Link from "next/link";

export default function AllPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const { data } = useContractRead({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "totalSupply",
    chainId: 5,
    // testing
    // chainId: 1337,
  });

  console.log("Address is : ", props.signer._address);
  console.log("Balance is : ", parseInt(data));

  async function load() {
    const paypenContract = new ethers.Contract(
      paypenAddress,
      Paypen.abi,
      props.signer
    );

    let postIds = [];

    for (let i = 0; i < parseInt(data); i++) {
      postIds[i] = await paypenContract.tokenByIndex(i);
    }

    console.log("Post ids : ", postIds);

    const items = await Promise.all(
      postIds.map(async (i) => {
        const metadataUrl = await paypenContract.tokenURI(i);

        const httpUrl =
          "https://nftstorage.link/ipfs/" + metadataUrl.trim().slice(7);
        const res = await fetch(httpUrl);
        if (!res.ok) {
          throw new Error(
            `error fetching image metadata: [${res.status}] ${res.statusText}`
          );
        }

        const metadata = await res.json();
        const imageURL =
          "https://nftstorage.link/ipfs/" + metadata.image.trim().slice(7);

        let item = {
          name: metadata.name,
          description: metadata.description,
          author: metadata.author,
          image: imageURL,
          postId: i.toString(),
        };

        return item;
      })
    );

    setPosts(items);

    console.log("Posts are: ", items);
  }

  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-12 pb-4 text-center">All Posts</h2>

        <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12">
          {posts.map((post, i) => (
            <div key={i} className="mb-6 lg:mb-0">
              <div className="relative block bg-white rounded-lg shadow-lg">
                <div className="flex">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <Image src={post.image} className="w-full" />
                    <Link href="#!">
                      <div className="background-color: rgba(251, 251, 251, 0.15) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"></div>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="font-bold text-lg mb-3 text-black">
                    {post.name}
                  </h5>
                  <p className="text-gray-500 mb-4">
                    <small>Published by {post.author}</small>
                  </p>
                  <p className="mb-4 pb-2 text-black">{post.description}</p>
                  <div>
                    {
                      <Read
                        post={post}
                        signer={props.signer}
                        provider={props.provider}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
