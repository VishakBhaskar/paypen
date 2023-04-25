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
let authorizeContractOperation;
let flowRate;

export default function Read(props) {
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
      //   resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
      //   networkName: "hardhat",
      //   dataMode: "WEB3_ONLY",
      //   protocolReleaseVersion: "v1",
      //   chainId: 1337,
      // });

      daix = await sf.loadSuperToken(fDAIx);

      if (props.signer._address !== props.post.author) {
        authorizeContractOperation = daix.updateFlowOperatorPermissions({
          flowOperator: paypenAddress,
          permissions: "7", //full control
          flowRateAllowance: "10000000000000000", // ~2500 per month
        });
        flowRate = await daix.getFlow({
          sender: props.signer._address,
          receiver: props.post.author,
          providerOrSigner: props.signer,
        });

        console.log("flow rate ; ", flowRate);

        if (flowRate.flowRate == "1000000000000000") {
          setFlow(true);
        } else {
          setFlow(false);
        }
      }
    };

    fetchFlow();
  }, [props]);

  const view = () => {
    router.push({
      pathname: `/posts/${props.post.image.trim().slice(29, 79)}`,
      query: props.post,
    });
  };

  async function viewPost() {
    const paypenContract = new ethers.Contract(
      paypenAddress,
      Paypen.abi,
      props.signer
    );
    if (props.post.author == props.signer._address) {
      view();
    } else if (flow) {
      view();
    } else {
      await authorizeContractOperation.exec(props.signer);
      await paypenContract
        .connect(props.signer)
        .read(props.post.postId, daix.address);
      view();
    }
  }

  return (
    <button
      onClick={() => viewPost()}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      className="content-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Read more
    </button>
  );
}
