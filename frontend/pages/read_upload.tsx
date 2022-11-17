import type { NextPage } from "next";
import { ChangeEvent, useRef, useState } from "react";
import React from "react";

interface TabProps {
  value: string;
  onClick?: () => void;
}
const Tab = (props: TabProps) => (
  <button
    type="button"
    className="w-full text-white font-bold mt-1 block px-3 py-2 bg-brown-700 rounded-md text-sm shadow-sm focus:bg-brown-900 hover:bg-brown-800"
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

interface UploadAreaProps {
  submit: (e: ChangeEvent, fileRef: React.RefObject<HTMLInputElement>) => void;
}
const UploadArea = (props: UploadAreaProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <form className="bg-papyrus-200 rounded-lg p-4 m-0 hover:bg-papyrus-300">
      <label htmlFor="dropzone-file">
        <div className="flex flex-col justify-center items-center pt-5 pb-6 hover:cursor-pointer">
          <svg
            aria-hidden="true"
            className="h-72 text-brown-900"
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
          <p className="mb-2 text-xl text-brown-900 dark:text-white">
            Click to upload or drag and drop
          </p>
          <p className="font-bold text-lg text-brown-900 dark:text-white">
            .png, .jpg, .gif, .docx, or .pdf
          </p>
          <p className="text-lg text-brown-900 dark:text-white">
            (images: max. 800 x 400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={(e: ChangeEvent) => props.submit(e, fileRef)}
        />
      </label>
    </form>
  );
};

interface InterfacePanelProps {
  submit: (e: ChangeEvent, fileRef: React.RefObject<HTMLInputElement>) => void;
}
const InputPanel = (props: InterfacePanelProps) => {
  return (
    <div className="w-full px-4 mdmin:border-r-2 border-r-brown-800">
      <div className="w-full py-2 truncate">
        <div className="py-2 text-3xl font-bold text-brown-900">ReadAloud</div>
        <div className="flex grid-cols-3 gap-2 ">
          <Tab value="Website URL" />
          <Tab value="Text" />
          <Tab value="File Upload" />
        </div>
      </div>
      <UploadArea submit={props.submit} />
    </div>
  );
};

const PlayButton = () => (
  <button className="flex justify-center items-center w-48 h-48 rounded-full bg-papyrus-200 hover:bg-papyrus-300 focus:outline-none">
    <div className="ml-4 w-0 h-0 border-b-transparent border-l-brown-900 border-t-transparent border-r-transparent border-solid border-t-[3rem] border-r-0 border-b-[3rem] border-l-[6rem]"></div>
  </button>
);

interface ResultsPanelProps {
  fileName: string;
  fileText: string;
}
const ResultsPanel = (props: ResultsPanelProps) => {
  return (
    <div className="w-full h-full">
      <div className="px-4">
        <div className="font-bold text-xl text-brown-800 py-10">
          {props.fileName}
        </div>
        <div className="overflow-y-auto text-brown-800">{props.fileText}</div>
        <div className="mt-8 mb-8 flex justify-center items-center">
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

const read_upload: NextPage = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileText, setFileText] = useState<string>("");

  const submit = async (
    e: ChangeEvent,
    fileRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!fileRef.current?.files) {
      throw Error("No file selected.");
    }

    const data = new FormData();
    data.append("file", fileRef.current.files[0]);
    setFileName(fileRef.current.files[0].name);

    const url = process.env.NEXT_PUBLIC_API_URL + "/image";
    if (!url) {
      throw Error(
        "Frontend server error (must set environment variable NEXT_PUBLIC_API_URL)."
      );
    }

    const resultRaw = await fetch(url, {
      method: "POST",
      body: data,
    });
    const resultJson = await resultRaw.json();

    setFileText(resultJson.text);
  };

  return (
    <div className="bg-papyrus-100 flex mdmax:flex-wrap min-h-screen">
      <InputPanel submit={submit} />
      <ResultsPanel fileName={fileName} fileText={fileText} />
    </div>
  );
};

export default read_upload;
