import { useRouter } from "next/router";
const { Framework } = require("@superfluid-finance/sdk-core");
// import { useProvider } from "wagmi";
import { useEffect } from "react";
import { useState } from "react";
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
let daix;
let sf;
let authorizeContractOperation;

export default function Read(props) {
  const router = useRouter();
  // const provider = useProvider();
  const [flow, setFlow] = useState(false);

  useEffect(() => {
    // init();

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

      authorizeContractOperation = daix.updateFlowOperatorPermissions({
        flowOperator: paypenAddress,
        permissions: "7", //full control
        flowRateAllowance: "10000000000000000", // ~2500 per month
      });
      let flowRate = await daix.getFlow({
        sender: props.signer._address,
        receiver: props.post.author,
        providerOrSigner: props.signer,
      });

      // const result = await asyncFunctionToUpdateVariable();
      if (flowRate == "1000000000000000") {
        setFlow(true);
      } else {
        setFlow(false);
      }
    };

    fetchFlow();

    // fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 1000);

    // return () => clearInterval(interval);
  }, []);

  // async function init() {
  // sf = await Framework.create({
  //   provider: provider,
  //   resolverAddress: "0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E",
  //   networkName: "hardhat",
  //   dataMode: "WEB3_ONLY",
  //   protocolReleaseVersion: "v1",
  //   chainId: 1337,
  // });

  // daix = await sf.loadSuperToken(fDAIx);

  // authorizeContractOperation = daix.updateFlowOperatorPermissions({
  //   flowOperator: paypenAddress,
  //   permissions: "7", //full control
  //   flowRateAllowance: "10000000000000000", // ~2500 per month
  // });
  // }

  const view = () => {
    router.push({
      pathname: `/posts/${props.post.image.trim().slice(29, 79)}`,
      query: props.post,
    });
  };

  async function viewPost() {
    if (props.post.author == props.signer._address) {
      view();
    } else if (flow) {
      view();
    } else {
      await authorizeContractOperation.exec(props.signer);
      await paypenContract.connect(props.signer).read(0, daix.address);
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
