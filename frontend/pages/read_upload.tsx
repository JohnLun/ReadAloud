import type { NextPage } from "next";
import { useRef } from "react";
import React from "react";
import NavBar from "react";

const read_upload: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  var fileName;
  const submit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    if (!fileRef.current?.files) {
      throw Error("No File Selected");
    } else {
      data.append("file", fileRef.current.files[0]);
      fileName = fileRef.current.files[0].name;
      console.log(fileName);
      document.getElementById("fileName")!.innerHTML = fileName;
      const result = await fetch("http://127.0.0.1:8000/image", {
        method: "POST",
        body: data,
      });
      const text = await result.json();
      document.getElementById("fileText")!.innerHTML = text.text;
      console.log(text);
    }
  };
  return (
    <form className="bg-[#fff8ea] flex h-screen">
      <div className="w-1/2 h-full px-4">
        <div className="w-4/6">
          <div className="w-full py-2 truncate">
            <div className="py-2 text-3xl font-bold text-[#594545]">
              ReadAloud
            </div>
            <div className="flex grid-cols-3 gap-2 ">
              <button
                type="button"
                className="w-1/6 text-white mt-1 block w-full px-3 py-2 bg-[#9e7676] rounded-md text-sm shadow-sm focus:bg-[#594545] hover:bg-[#866363]"
              >
                Website URL
              </button>
              <button
                type="button"
                className="w-1/6 text-white mt-1 block w-full px-3 py-2 bg-[#9e7676] rounded-md text-sm shadow-sm focus:bg-[#594545] hover:bg-[#866363]"
              >
                Text
              </button>
              <button
                type="button"
                className="truncate w-1/6 text-white mt-1 block w-full px-3 py-2 bg-[#9e7676] rounded-md text-sm shadow-sm focus:bg-[#594545] hover:bg-[#866363]"
              >
                File Upload
              </button>
            </div>
          </div>
          <div className="bg-[#ecded3] rounded-lg m-0">
            <label htmlFor="dropzone-file" className="bg-[#ecded3]">
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="h-full text-[#5a4646]"
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
                <p className="mb-2 text-xl text-[#5a4646] dark:text-white">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-lg text-[#5a4646] dark:text-white">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={submit}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full border border-l-2 border-l-[#b4a7a0]">
        <div className="px-4">
          <div className="font-bold text-xl text-[#594545] py-10" id="fileName">
            {fileName}
          </div>
          <div
            className="h-80 overflow-auto text-[#594545] w-5/6"
            id="fileText"
          ></div>
          <div>
            <button className="w-24 h-24 rounded-full bg-blue-500 focus:outline-none">
              <i className="fa fa-play fa-2x text-white" id="play-btn"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
    // <form className="flex h-screen">
    //   <input
    //     type="submit"
    //     value="ReadAloud"
    //     onClick={submit}
    //     className="cursor-pointer flex w-1/2 text-5xl font-bold h-full justify-center items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    //   />

    //   <div className="flex justify-center items-center w-1/2">
    //     <label
    //       htmlFor="dropzone-file"
    //       className="flex flex-col justify-center items-center w-full h-full bg-yellow-400 rounded-lg border-2 border-yellow-400 border-dashed cursor-pointer dark:hover:bg-yellow-500 dark:bg-yellow-500 hover:bg-yellow-500 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    //     >
    //       <div className="flex flex-col justify-center items-center pt-5 pb-6">
    //         <svg
    //           aria-hidden="true"
    //           className="h-full text-white"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    //           ></path>
    //         </svg>
    //         <p className="mb-2 text-xl text-white dark:text-white">
    //           <span className="font-semibold">Click to upload</span> or drag and
    //           drop
    //         </p>
    //         <p className="text-lg text-white dark:text-white">
    //           SVG, PNG, JPG or GIF (MAX. 800x400px)
    //         </p>
    //       </div>
    //       <input
    //         id="dropzone-file"
    //         type="file"
    //         className="hidden"
    //         ref={fileRef}
    //       />
    //     </label>
    //   </div>
    // </form>
  );
};

export default read_upload;

