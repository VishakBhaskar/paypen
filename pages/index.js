import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      <div className="py-24 bg-gray-900">
        <div className="text-center bg-gray-900 text-white pt-40 pb-20 px-6 ">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
            Join the new wave of publishing <br />
            <span className="text-blue-600">Make every second count</span>
          </h1>
          <a
            className="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            href="/create"
            role="button"
          >
            Get started
          </a>
          <a
            className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-base leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            href="/discover"
            role="button"
          >
            Discover
          </a>
        </div>
      </div>

      <div className="container my-24 px-6 pb-5 mx-auto">
        <section className="mb-32 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why is it so great?
          </h2>

          <div className="flex flex-wrap items-center">
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0 md:px-6">
              <div
                className="background-position: 50% relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                // style="background-position: 50%"
              >
                <Image
                  className="w-full h-auto"
                  src="/GoldenStatue5.png"
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="GFG logo served with static path of public directory"
                  // width={500}
                />

                <a href="#!">
                  <div
                    className="background-color: rgba(0, 0, 0, 0.4) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                    // style="background-color: rgba(0, 0, 0, 0.4)"
                  ></div>
                  <div className="relative overflow-hidden bg-no-repeat bg-cover">
                    <div
                      className="background-color: rgba(251, 251, 251, 0.2) absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                      // style="background-color: rgba(251, 251, 251, 0.2)"
                    ></div>
                  </div>
                </a>
              </div>
            </div>

            <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12 md:px-6">
              <div className="flex mb-12">
                <div className="shrink-0">
                  <div
                    className="background-color: hsl(204, 30%, 20%) p-4 rounded-md shadow-lg"
                    // style="background-color: hsl(204, 30%, 20%)"
                  >
                    {/* <img src="../vercel.svg" alt="next" /> */}
                    <Image
                      src="/clock.svg"
                      className="w-full"
                      width={400}
                      height={400}
                      layout="responsive"
                      alt="GFG logo served with static path of public directory"
                    />
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="grow ml-4">
                  <div className="font-bold mb-1">Make your writing count</div>
                  <div className="text-gray-500">
                    Get paid for every second your readers spend on your article
                    through Superfluid money streams
                  </div>
                </div>
              </div>

              <div className="flex mb-12">
                <div className="shrink-0">
                  <div
                    className="background-color: hsl(204, 30%, 20%) p-4 rounded-md shadow-lg"
                    // style="background-color: hsl(204, 30%, 20%)"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="grow ml-4">
                  <div className="font-bold mb-1">Stop writing for free</div>
                  <div className="text-gray-500">
                    Join our community and get rewarded for your writing in
                    crypto
                  </div>
                </div>
              </div>

              <div className="flex mb-12">
                <div className="shrink-0">
                  <div
                    className="background-color: hsl(204, 30%, 20%) p-4 rounded-md shadow-lg"
                    // style="background-color: hsl(204, 30%, 20%)"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="grow ml-4">
                  <div className="font-bold mb-1">
                    Earn crypto for your writing
                  </div>
                  <div className="text-gray-500">
                    Get paid based on how engaged your readers are with your
                    content
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="shrink-0">
                  <div
                    className="background-color: hsl(204, 30%, 20%) p-4 rounded-md shadow-lg"
                    // style="background-color: hsl(204, 30%, 20%)"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 544 512"
                    >
                      <path
                        fill="currentColor"
                        d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="grow ml-4">
                  <div className="font-bold mb-1">
                    Readers, pay only for what you read
                  </div>
                  <div className="text-gray-500">
                    Writers, get paid based on reader engagement. It's a win-win
                    situation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 background-radial-gradient">
          <div
            className=".background-radial-gradient {
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(
    650px circle at 0% 0%,
    hsl(218, 41%, 35%) 15%,
    hsl(218, 41%, 30%) 35%,
    hsl(218, 41%, 20%) 75%,
    hsl(218, 41%, 19%) 80%,
    transparent 100%
  ),
  radial-gradient(
    1250px circle at 100% 100%,
    hsl(218, 41%, 45%) 15%,
    hsl(218, 41%, 30%) 35%,
    hsl(218, 41%, 20%) 75%,
    hsl(218, 41%, 19%) 80%,
    transparent 100%
  );
}"
          />

          <div className="px-6 py-12 md:px-12 text-center lg:text-left">
            <div className="container mx-auto xl:px-32">
              <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                <div className="mt-12 lg:mt-0">
                  <h1 className="color: hsl(218, 81%, 95%); text-4xl md:text-4xl xl:text-4xl font-bold tracking-tight mb-12">
                    <span className="text-white">
                      Say goodbye to paywalls and subscriptions
                    </span>
                    <br />
                    <br />
                    <span className="text-blue-600">
                      Readers can pay per article and writers can earn based on
                      reader engagement
                    </span>
                  </h1>
                  <a
                    className="inline-block px-7 py-3 mr-2 bg-gray-200 text-gray-700 font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    href="/create"
                    role="button"
                  >
                    Get started
                  </a>
                  <a
                    className="inline-block px-7 py-3 bg-transparent text-white font-medium text-lg leading-snug uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    href="/discover"
                    role="button"
                  >
                    Discover
                  </a>
                </div>
                <div className="mb-12 lg:mb-0">
                  <Image
                    src="/goldcoins.png"
                    className="w-full"
                    width={400}
                    height={400}
                    layout="responsive"
                    alt=""
                  />
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
