import type { NextPage } from "next";
import { useRef } from "react";
import React from "react";

const read_upload: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const submit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    if (!fileRef.current?.files) {
      throw Error("No File Selected");
    } else {
      data.append("file", fileRef.current.files[0]);

      const result = await fetch("http://127.0.0.1:8000/image", {
        method: "POST",
        body: data,
      });
      const text = await result.json();
      console.log(text);
    }
  };
  return (
    <form className="flex h-screen">
      <input
        type="submit"
        value="ReadAloud"
        onClick={submit}
        className="cursor-pointer flex w-1/2 text-5xl font-bold h-full justify-center items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      />

      <div className="flex justify-center items-center w-1/2">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-full h-full bg-yellow-400 rounded-lg border-2 border-yellow-400 border-dashed cursor-pointer dark:hover:bg-yellow-500 dark:bg-yellow-500 hover:bg-yellow-500 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="h-full text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-xl text-white dark:text-white">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-lg text-white dark:text-white">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            ref={fileRef}
          />
        </label>
      </div>
    </form>
  );
};

export default read_upload;
