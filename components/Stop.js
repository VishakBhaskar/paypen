import { useRouter } from "next/router";
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");
import { useEffect } from "react";
import { useState } from "react";
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
let daix;
let sf;
// let authorizeContractOperation;
// let flowRate;
export default function Stop(props) {
  const router = useRouter();

  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const fetchFlow = async () => {
      sf = await Framework.create({
        chainId: (await props.provider.getNetwork()).chainId,
        provider: props.provider,
      });
      //
      // For local testing
      // sf = await Framework.create({
      //   provider: props.provider,
      //   resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3",
      //   networkName: "hardhat",
      //   dataMode: "WEB3_ONLY",
      //   protocolReleaseVersion: "v1",
      //   chainId: 1337,
      // });

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
  }, [props]);

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
      const waiter = await paypenContract
        .connect(props.signer)
        .stop(props.post.postId, daix.address);
      await waiter.wait(1);
      exit();
    }
  }
  return (
    <div className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
      <button
        onClick={() => stop()}
        className="text-white bg-gradient-to-r from-red-500 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
      >
        Stop
      </button>
    </div>
  );
}
