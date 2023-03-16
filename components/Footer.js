export default function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="" className="flex items-center mb-4 sm:mb-0">
          <img src="/paypen-logo.png" className="h-8 mr-3" alt="PayPen Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Paypen
          </span>
        </a>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 3{" "}
        <a href="/" className="hover:underline">
          Paypen™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
