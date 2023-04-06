import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
} from "wagmi";
const { ethers } = require("ethers");
import { hardhat, localhost } from "wagmi/chains";
import { useEffect } from "react";

import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress } from "../config";

export default function PostsByUser(props) {
  const paypenContractConfig = {
    address: paypenAddress,
    abi: Paypen.abi,
    chainId: hardhat.id,
  };

  // useEffect(() => {
  //   load();
  // }, []);

  const { data, isRefetching, isSuccess, refetch } = useContractRead({
    address: paypenAddress,
    abi: Paypen.abi,
    functionName: "balanceOf",
    args: [props.signer._address],
    chainId: 1337,
  });

  console.log("Address is : ", props.signer._address);
  console.log("Balance is : ", data.toString());

  // async function load() {
  //   for (let i = 0; i < creatorBal; i++) {
  //     creatorOwned[i] = await blogs.tokenOfOwnerByIndex(creator.address, i);
  //   }
  // }
  //   function ReadContractsInfinite() {
  //   const { data, isLoading, isSuccess, fetchNextPage } =
  //     useContractInfiniteReads({
  //       cacheKey: "TokensOwned",
  //       ...paginatedIndexesConfig(
  //         (index) => [
  //           {
  //             ...paypenContractConfig,
  //             functionName: "tokenOfOwnerByIndex",
  //             args: [props.signer._address, index],
  //           },
  //         ],
  //         { start: 0, perPage: balance, direction: "increment" }
  //       ),
  //       suspense: true,
  //     });

  //   console.log(data);

  //
  //

  //   }
  //   useEffect(() => {
  //     loadPosts();
  //   }, []);
  //   let items = [];

  //   async function loadPosts() {
  //     const { balance } = useContractRead({
  //       address: paypenAddress,
  //       abi: Paypen.abi,
  //       functionName: "balanceOf",
  //       args: [props.signer._address],
  //       chainId: 1,
  //     });

  //     for (let i = 0; i < balance; i++) {
  //       items[i] = useContractRead({
  //         address: paypenAddress,
  //         abi: Paypen.abi,
  //         functionName: "tokenOfOwnerByIndex",
  //         args: [props.signer._address, i],
  //       });
  //     }
  //   }

  //   console.log("Posts : ", items);
}
