import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>ReadAloud</title>
        <meta name="description" content="ReadAloud: Read images aloud." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full justify-center items-center dark:bg-black">
        <h1 className="text-5xl font-bold dark:text-white">
          Welcome to ReadAloud.
        </h1>
      </main>
    </div>
  );
};

export default Home;
