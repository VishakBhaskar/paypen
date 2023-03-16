import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Title  : ", title);
    console.log("Story  : ", story);
  };

  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />

      <div className="flex items-center justify-center mt-20 py-24 bg-gray-900">
        <form className="w-5/6">
          <h2 className="text-white md:text-5xl xl:text-5xl font-bold tracking-tight mb-12">
            Your words are valuable <br />
            <span className="text-blue-600">Create your post now!</span>
          </h2>
          <div className="bg-gray-900">
            <div className="w-9/12 mb-4 border border-gray-200  rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"></div>
              </div>
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="editor"
                  className="block w-full px-0 text-3xl text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="The title goes here"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            //
            <div className="w-9/12 h-full mb-4 border border-gray-200  rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"></div>
              </div>
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="editor"
                  rows="20"
                  className="block w-full px-0 text-xl text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write your story..."
                  onChange={(e) => setStory(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <input
              type="file"
              name="Asset"
              placeholder="Select an image..."
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              // onChange={onChange}
            />
            <br /> <br />
            <button
              // onClick={handleOnSubmit}
              onClick={(e) => handleOnSubmit(e)}
              // type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2"
            >
              Publish post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
