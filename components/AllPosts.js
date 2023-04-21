import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
} from "wagmi";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const { ethers } = require("ethers");
import { hardhat, localhost } from "wagmi/chains";
import { useEffect } from "react";

import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

export default function AllPosts(props) {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const { data } = useContractRead({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "balanceOf",
    args: [props.signer._address],
    chainId: 1337,
  });

  console.log("Address is : ", props.signer._address);
  console.log("Balance is : ", parseInt(data));

  // setBalance(parseInt(data));

  // let myPosts = [];

  // fetchPosts();

  async function load() {
    const paypenContract = new ethers.Contract(
      paypenAddress,
      Paypen.abi,
      props.signer
    );

    let postIds = [];

    for (let i = 0; i < parseInt(data); i++) {
      postIds[i] = await paypenContract.tokenOfOwnerByIndex(
        props.signer._address,
        i
      );
    }
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
          postId: i,
        };

        return item;
      })
    );

    // const metadata = await paypenContract.tokenURI(2);

    setPosts(items);

    console.log("Posts are: ", items);
    //   // const posts = await paypenContract.fetchPosts();
  }

  // async function viewPost(post) {

  //   router.push({
  //     pathname: `/posts/${post.image.trim().slice(7)}`,
  //     query: { post: JSON.stringify(post) },
  //   });
  // }

  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-12 pb-4 text-center">All Posts</h2>
        {/* {signer && <PostsByUser signer={signer} />} */}

        <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12">
          {/* // */}
          {posts.map((post, i) => (
            <div key={i} className="mb-6 lg:mb-0">
              <div className="relative block bg-white rounded-lg shadow-lg">
                <div className="flex">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img src={post.image} className="w-full" />
                    <a href="#!">
                      <div
                        className="background-color: rgba(251, 251, 251, 0.15) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                        // style=""
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="font-bold text-lg mb-3 text-black">
                    {post.name}
                  </h5>
                  <p className="text-gray-500 mb-4">
                    <small>
                      Published by {post.author}
                      {/* <a href="" className="text-gray-900">
                          {props.signer._address}
                        </a> */}
                    </small>
                  </p>
                  <p className="mb-4 pb-2 text-black">{post.description}</p>
                  {/* <button onClick={viewPost(post)}> */}

                  <a>Some text</a>
                  <div
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="content-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <Link
                      href={{
                        pathname: `/posts/${post.image.trim().slice(29, 79)}`,
                        query: post, // the data
                      }}
                      // >
                      //   <a
                      // onClick={() => viewPost(post)}
                      // href="#!"
                      // data-mdb-ripple="true"
                      // data-mdb-ripple-color="light"
                      // className="content-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Read more
                      {/* </a> */}
                    </Link>

                    {/* </button> */}
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