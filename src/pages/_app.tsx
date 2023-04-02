import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Link from "next/link";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="container mx-auto flex min-h-full flex-col py-2">
      <header className="pb-6 text-center md:pb-0">
        <h1 className="text-xl font-extrabold underline">
          <Link href="/">Roundest Movie</Link>
        </h1>
      </header>
      <section className="flex flex-1 flex-col">
        <Component {...pageProps} />
      </section>
      <footer className="text-center font-extrabold underline">
        <Link href="/results">Results</Link>
      </footer>
    </main>
  );
};

export default api.withTRPC(MyApp);
