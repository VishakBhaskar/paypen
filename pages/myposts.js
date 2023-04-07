import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import { useSigner } from "wagmi";
import { useState } from "react";
import { useRouter } from "next/router";

export default function MyPosts() {
  const { data: signer } = useSigner();
  const [posts, setPosts] = useState([]);
  // const router = useRouter();

  // useEffect(() => {
  //   loadPosts();
  // }, []);

  // async function loadPosts() {
  //   const signer = provider.getSigner();
  //   let record = new ethers.Contract(recordAddress, Record.abi, signer);
  //   const allFunds = await record.getAllFunds();

  //   let items = [];
  //   for (let i = 0; i < allFunds.length; i++) {
  //     const addr = allFunds[i].contractAddress;
  //     const fundContract = new ethers.Contract(addr, CrowdFund.abi, signer);
  //     const isClosed = await fundContract.isClosed();
  //     const fundGoal = await fundContract.getFundGoal();
  //     const fundCause = await fundContract.getCause();

  //     if (isClosed == false) {
  //       let item = {
  //         contractAddress: allFunds[i].contractAddress,
  //         goal: fundGoal,
  //         balance: allFunds[i].balance,
  //         cause: fundCause,
  //       };
  //       items.push(item);
  //       console.log("Goal is:", item.goal.toString());
  //     }
  //   }
  //   setFunds(items);
  //   setLoadingState("loaded");
  // }

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      {signer && <PostsByUser signer={signer} />}
      <Footer />
    </div>
  );
}
