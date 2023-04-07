import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Article() {
  return (
    <div className="bg-gray-900">
      <Header className="bg-gray-900" />
      <div class="container my-8 px-20 py-20 mx-auto">
        <section class="mb-20 text-white">
          <img
            src="https://mdbootstrap.com/img/new/slides/198.jpg"
            class="w-full shadow-lg rounded-lg mb-6"
            alt=""
          />

          <div class="flex items-center mb-6">
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg"
              class="rounded-full mr-2 h-8"
              alt=""
              loading="lazy"
            />
            <div>
              <span>
                {" "}
                Published <u>15.07.2020</u> by{" "}
              </span>
              <a href="#!" class="font-medium">
                Anna Maria Doe
              </a>
            </div>
          </div>

          <h1 class="font-bold text-3xl mb-6">
            An intriguing title for an interesting article
          </h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            harum tempore cupiditate asperiores provident, itaque, quo ex iusto
            rerum voluptatum delectus corporis quisquam maxime a ipsam nisi
            sapiente qui optio! Dignissimos harum quod culpa officiis suscipit
            soluta labore! Expedita quas, nesciunt similique autem, sunt,
            doloribus pariatur maxime qui sint id enim. Placeat, maxime labore.
            Dolores ex provident ipsa impedit, omnis magni earum. Sed fuga ex
            ducimus consequatur corporis, architecto nesciunt vitae ipsum
            consequuntur perspiciatis nulla esse voluptatem quos dolorum
            delectus similique eum vero in est velit quasi pariatur blanditiis
            incidunt quam.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
