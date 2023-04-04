import Header from "../components/Header";
import Footer from "../components/Footer";
import PostsByUser from "../components/PostsByUser";
import { useSigner } from "wagmi";
import { useState } from "react";

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
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-white text-center py-20">
          <h2 className="text-3xl font-bold mb-12 pb-4 text-center">
            My Posts
          </h2>
          {signer && <PostsByUser signer={signer} />}

          <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12">
            {/* // */}
            <div className="mb-6 lg:mb-0">
              <div className="relative block bg-white rounded-lg shadow-lg">
                <div className="flex">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/standard/city/024.webp"
                      className="w-full"
                    />
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
                    My paradise
                  </h5>
                  <p className="text-gray-500 mb-4">
                    <small>
                      Published <u>13.01.2022</u> by
                      <a href="" className="text-gray-900">
                        Anna Maria Doe
                      </a>
                    </small>
                  </p>
                  <p className="mb-4 pb-2 text-black">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="relative block bg-white rounded-lg shadow-lg">
                <div className="flex">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/standard/city/031.webp"
                      className="w-full"
                    />
                    <a href="#!">
                      <div
                        className="background-color: rgba(251, 251, 251, 0.15) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                        // style="background-color: rgba(251, 251, 251, 0.15)"
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="font-bold text-lg mb-3 text-black">
                    Travel to Italy
                  </h5>
                  <p className="text-gray-500 mb-4">
                    <small>
                      Published <u>12.01.2022</u> by
                      <a href="" className="text-gray-900">
                        Halley Frank
                      </a>
                    </small>
                  </p>
                  <p className="mb-4 pb-2 text-black">
                    Suspendisse in volutpat massa. Nulla facilisi. Sed aliquet
                    diam orci, nec ornare metus semper sed. Integer volutpat
                    ornare erat sit amet rutrum.
                  </p>
                  <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-0">
              <div className="relative block bg-white rounded-lg shadow-lg">
                <div className="flex">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/standard/city/081.webp"
                      className="w-full"
                    />
                    <a href="#!">
                      <div
                        className="background-color: rgba(251, 251, 251, 0.15) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                        // style="background-color: rgba(251, 251, 251, 0.15)"
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="font-bold text-lg mb-3 text-black">
                    Chasing the sun
                  </h5>
                  <p className="text-gray-500 mb-4">
                    <small>
                      Published <u>10.01.2022</u> by
                      <a href="" className="text-gray-900">
                        Joe Svan
                      </a>
                    </small>
                  </p>
                  <p className="mb-4 pb-2 text-black">
                    Curabitur tristique, mi a mollis sagittis, metus felis
                    mattis arcu, non vehicula nisl dui quis diam. Mauris ut
                    risus eget massa volutpat feugiat. Donec.
                  </p>
                  <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
