import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useSigner } from "wagmi";

const { Framework } = require("@superfluid-finance/sdk-core");
import Paypen from "../artifacts/contracts/Paypen.sol/Paypen.json";
import { paypenAddress, daix } from "../config";

export default function Post(props) {
  const { data: signer } = useSigner();
  const router = useRouter();
  const post = router.query;

  const [variable, setVariable] = useState(false);
  const [status, setStatus] = useState("Start Reading");

  const paypenContract = new ethers.Contract(
    paypenAddress,
    Paypen.abi,
    props.signer
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await asyncFunctionToUpdateVariable();
      setVariable(result);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function info() {
    let authorizeContractOperation = daix.updateFlowOperatorPermissions({
      flowOperator: paypenAddress,
      permissions: "7", //full control
      flowRateAllowance: "10000000000000000", // ~2500 per month
    });
    await authorizeContractOperation.exec(props.signer);

    await paypenContract.connect(props.signer).read(0, daix.address);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await asyncFunctionToUpdateVariable();
      setVariable(result);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <div className="px-6 py-12 md:px-12">
          <h2 className="text-5xl my-12 font-bold tracking-tight">
            Are you ready <br />
            <span className="text-blue-600">for an adventure?</span>
          </h2>
          <a
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-2 md:mr-2"
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Get started
          </a>
          <a
            className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out mb-2"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            href="#!"
            role="button"
          >
            Learn more
          </a>
        </div>
      </section>
    </div>

    //
    //
    //
    //
    //

    // <div className="bg-gray-900">
    //   <Header className="bg-gray-900" />
    //   <div className="container my-8 px-20 py-20 mx-auto">
    //     <section className="mb-20 text-white">
    //       <img
    //         src={post.image}
    //         className="w-full shadow-lg rounded-lg mb-6"
    //         alt=""
    //       />

    //       <div className="flex items-center mb-6">
    //         <div>
    //           <span>
    //             {" "}
    //             Published <u>{post.date}</u> by{" "}
    //           </span>
    //           <a href="#!" className="font-medium">
    //             {post.author}
    //           </a>
    //         </div>
    //       </div>

    //       <h1 className="font-bold text-3xl mb-6">{post.name}</h1>

    //       <p>{post.description}</p>
    //     </section>
    //   </div>
    //   <Footer />
    // </div>
  );
}
