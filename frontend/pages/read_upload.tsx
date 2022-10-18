import type { NextPage } from "next";
//import 'styles.read_upload.module.css';
import Head from "next/head";
import { useRouter } from "next/router";

const read_upload : NextPage = () => {
    return(
        <div className="flex h-screen">
            <button className="flex w-1/2 text-5xl font-bold h-full justify-center items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                ReadAloud
            </button>
            <input type="file" className="flex w-1/2 font-bold h-full justify-center items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"/>
        </div>
    );
};

export default read_upload;