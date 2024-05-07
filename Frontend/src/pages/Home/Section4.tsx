import { Link } from "react-router-dom";

const Section4 = () => {
  return (
    <section className="sm:mt-6 lg:mt-8 mt-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 font-amethysta  ml-9">
      <div className="my-20 mx-auto max-w-8xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-2xl tracking-tight font-extrabold text-gray-800 sm:text-3xl md:text-5xl mt-7">
            <span className="block xl:inline ">List Your Auctions</span>
            <span className="block text-primary">Today!</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Unlock the potential of your items by listing them in our auction
            platform. Reach eager buyers and maximize your profits. Start your
            auction journey now!
          </p>

          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                to="/auctioneerRegister"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-2 md:text-lg md:px-6"
              >
                Get Register
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:inset-y-0 lg:right-0 lg:w-2/5 my-4 ml-28">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mb-5"
            src="https://firebasestorage.googleapis.com/v0/b/relicroom-db857.appspot.com/o/Asset%206%404x.png?alt=media&token=e9a594cf-159c-48e2-8e53-cbcde8d06f73"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Section4;
