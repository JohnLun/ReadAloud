import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import React from "react";
import { TabGroup } from "components/Tab";
import { UploadArea } from "components/UploadArea";
import { TextArea } from "components/TextArea";
import { WebsiteArea } from "components/WebsiteArea";

interface InterfacePanelProps {
  submitFile: (
    e: ChangeEvent,
    fileRef: React.RefObject<HTMLInputElement>
  ) => void;
  submitText: (text: string) => void;
  submitURL: (url: string) => void;
}
const InputPanel = (props: InterfacePanelProps) => {
  const [tab, setTab] = useState<string>("File Upload");

  return (
    <div className="w-full px-4 mdmin:border-r-2 border-r-brown-800">
      <div className="w-full py-2 truncate">
        <div className="py-2 text-3xl font-bold text-brown-900">ReadAloud</div>
        <TabGroup onChange={(tab: string) => setTab(tab)} />
      </div>
      {tab === "File Upload" ? (
        <UploadArea submit={props.submitFile} />
      ) : tab === "Text" ? (
        <TextArea submit={props.submitText} />
      ) : tab === "Website URL" ? (
        <WebsiteArea submit={props.submitURL} />
      ) : (
        ""
      )}
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
      <InputPanel submitFile={submit} />
      <ResultsPanel fileName={fileName} fileText={fileText} />
    </div>
  );
};

export default read_upload;
