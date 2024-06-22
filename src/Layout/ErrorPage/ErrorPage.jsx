import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <section className="flex items-center  p-20 ">
        <div className="container flex flex-col items-center  px-5 mx-auto my-8">
          <div className="max-w-lg text-center">
            <h2 className="mb-3 font-medium text-9xl text-blue-950 opacity-80">
              404
            </h2>
            <p className="text-7xl text-blue-950 opacity-80">
              {error.statusText || error.message}
            </p>
            <p className="mt-4 mb-8 dark:text-blue-950 opacity-80 text-xl">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to="/"
              className="btn px-16 py-2 text-xl text-white rounded-full font-semibold btn-primary bg-blue-950 opacity-80"
            >
              Back to Homepage
            </Link>
            {/* <Link to='/'><a className="px-7 py-4 font-semibold bg-green-700 dark:text-gray-50">Back to Homepage</a></Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
