import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { hardhat } from "wagmi/chains";
import { utils } from "ethers";

import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

export default function Mint(props) {
  let onSuccess = false;
  const { config } = usePrepareContractWrite({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "safeMint",
    overrides: {
      from: props.data.signer._address,
      value: utils.parseEther("1"),
    },
    args: [props.data.signer._address, props.data.metadata],
    chainId: hardhat.id,
  });

  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite(config);

  console.log(props.data.metadata);
  console.log(props.data.signer._address);

  return (
    <div>
      <button
        onClick={() => write?.()}
        className="text-white bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
        // disabled={!write}
        // onClick={() => write?.()}
      >
        {/* Mint */}
        Mint
        {isLoading && (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </button>

      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  );
}
