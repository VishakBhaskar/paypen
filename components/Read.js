import { useRouter } from "next/router";
const { Framework } = require("@superfluid-finance/sdk-core");
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect } from "react";
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
let daix;
let sf;
let authorizeContractOperation;

export default function Read(props) {
  const router = useRouter();

  useEffect(() => {
    init();

    const fetchFlow = async () => {
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

  async function init() {
    sf = await Framework.create({
      provider: provider,
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

    // await authorizeContractOperation.exec(props.signer);

    // await paypenContract.connect(props.signer).read(0, daix.address);
  }

  const view = (post) => {
    router.push({
      pathname: `/posts/${post.image.trim().slice(29, 79)}`,
      query: post,
    });
  };

  async function viewPost(post) {
    if (post.author == props.signer._address) {
      view(post);
    } else if (condition) {
    }
  }
}
