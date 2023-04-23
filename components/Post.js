import Header from "./Header";
import { useRouter } from "next/router";

import { useState } from "react";
const { ethers } = require("ethers");
import { useEffect } from "react";

const { Framework } = require("@superfluid-finance/sdk-core");
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
let daix;
let sf;

export default function Post(props) {
  const router = useRouter();
  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const fetchFlow = async () => {
      sf = await Framework.create({
        provider: props.provider,
        resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
        networkName: "hardhat",
        dataMode: "WEB3_ONLY",
        protocolReleaseVersion: "v1",
        chainId: 1337,
      });

      daix = await sf.loadSuperToken(fDAIx);

      console.log("post id: ", props.post.postId);
      let flowRate = await daix.getFlow({
        sender: props.signer._address,
        receiver: props.post.author,
        providerOrSigner: props.provider,
      });

      if (flowRate.flowRate == "1000000000000000") {
        setFlow(true);
      } else {
        setFlow(false);
      }
    };

    fetchFlow();

    setInterval(async () => {
      let flowRate = await daix.getFlow({
        sender: props.signer._address,
        receiver: props.post.author,
        providerOrSigner: props.provider,
      });

      if (
        props.signer._address !== props.post.author &&
        flowRate.flowRate !== "1000000000000000"
      ) {
        router.push({
          pathname: `/discover`,
        });
      }
    }, 1000);
  }, []);

  const exit = () => {
    router.push({
      pathname: `/discover`,
    });
  };

  async function stop() {
    const paypenContract = new ethers.Contract(
      paypenAddress,
      Paypen.abi,
      props.signer
    );
    if (props.post.author == props.signer._address) {
      exit();
    } else if (!flow) {
      exit();
    } else {
      await paypenContract
        .connect(props.signer)
        .stop(props.post.postId, daix.address);
      exit();
    }
  }

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />

      <div className="container my-8 px-20 py-20 mx-auto relative">
        <div className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
          <button
            onClick={() => stop()}
            className="text-white bg-gradient-to-r from-red-500 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
          >
            Stop
          </button>
        </div>

        <section className="mb-20 text-white">
          <img
            src={props.post.image}
            className="w-full shadow-lg rounded-lg mb-6"
            alt=""
          />

          <div className="flex items-center mb-6">
            <div>
              <span>
                {" "}
                Published <u>{props.post.date}</u> by{" "}
              </span>
              <a href="#!" className="font-medium">
                {props.post.author}
              </a>
            </div>
          </div>

          <h1 className="font-bold text-3xl mb-6">{props.post.name}</h1>

          <p>{props.post.description}</p>
        </section>
      </div>
    </div>
  );
}
