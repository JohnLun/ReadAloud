import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { TabGroup } from "components/Tab";
import { UploadArea } from "components/UploadArea";
import { TextArea } from "components/TextArea";
import { WebsiteArea } from "components/WebsiteArea";
import { SignInButton } from "components/SignInButton";
import { SignOutButton } from "components/SignOutButton";
import { ThemePicker } from "components/ThemePicker";
import { UserDisplay } from "components/UserDisplay";

const playAudioWarning = (warning: string) => {
  if (typeof window !== "undefined") {
    const message = new SpeechSynthesisUtterance();
    message.text = warning;
    message.rate = 1.2;
    window.speechSynthesis.speak(message);
  }
};

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
      {tab === "File Upload" ? <UploadArea submit={props.submitFile} /> : null};
      {tab === "Text" ? <TextArea submit={props.submitText} /> : null};
      {tab === "Website URL" ? <WebsiteArea submit={props.submitURL} /> : null};
    </div>
  );
};

enum uploadStatuses {
  Idle = "Select a file to begin.",
  Uploading = "Uploading file. Please wait.",
  Ready = "Press play to listen.",
}
let uploadStatus: uploadStatuses;

interface ResultsPanelProps {
  fileName: string;
  fileText: string;
}

const ResultsPanel = (props: ResultsPanelProps) => {
  const PlayButton = () => (
    <button
      className="flex justify-center items-center w-48 h-48 rounded-full bg-papyrus-200 hover:bg-papyrus-300 focus:outline-none"
      onClick={async () => {
        if (uploadStatus != uploadStatuses.Ready) {
          playAudioWarning(uploadStatus);
        }
      }}
    >
      <div className="ml-4 w-0 h-0 border-b-transparent border-l-brown-900 border-t-transparent border-r-transparent border-solid border-t-[3rem] border-r-0 border-b-[3rem] border-l-[6rem]"></div>
    </button>
  );
  return (
    <div className="w-full h-full">
      <div className="px-5">
        <div className="font-bold text-xl text-brown-800 py-3">
          {uploadStatus}
        </div>
        <div className="font-bold text-xl text-brown-800 py-2">
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

const useReadUpload: NextPage = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileText, setFileText] = useState<string>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    uploadStatus = uploadStatuses.Idle;
    const buffer = localStorage.getItem("user");
    if (buffer) {
      setUser(JSON.parse(buffer));
    }
  }, []);

  const submitFile = async (
    e: ChangeEvent,
    fileRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!fileRef.current?.files) {
      playAudioWarning("No file selected.");
      throw Error("No file selected.");
    }

    const data = new FormData();
    data.append("file", fileRef.current.files[0]);
    const fN = fileRef.current.files[0].name.toLowerCase();
    uploadStatus = uploadStatuses.Uploading;
    setFileName(fN);
    let ext = "";
    if (
      fN.endsWith(".png") ||
      fN.endsWith(".jpeg") ||
      fN.endsWith(".jpg") ||
      fN.endsWith(".gif")
    ) {
      ext = "/image";
    } else if (fN.endsWith(".docx")) {
      ext = "/docx";
    } else if (fN.endsWith(".pdf")) {
      ext = "/pdf";
    }
    const url = process.env.NEXT_PUBLIC_API_URL + ext;
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
    uploadStatus = uploadStatuses.Ready;
  };

  const submitText = async (value: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/text";
    if (!url) {
      throw Error(
        "Frontend server error (must set environment variable NEXT_PUBLIC_API_URL)."
      );
    }
    const text = value;
    console.log(text);
    const resultRaw = await fetch(
      url +
        "?" +
        new URLSearchParams({
          plain_text: text,
        }),
      {
        method: "POST",
        body: text,
      }
    );
    const resultJson = await resultRaw.json();
    setFileText(resultJson.text);
  };

  const submitURL = async (value: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/url";
    const resultRaw = await fetch(
      url +
        "?" +
        new URLSearchParams({
          url_web: value,
        }),
      {
        method: "POST",
        body: value,
      }
    );
    const resultJson = await resultRaw.json();
    setFileText(resultJson.text);
  };

  return (
    <div>
      <div className="bg-papyrus-100 flex items-center gap-2 border-b-2 border-brown-800 px-2 py-1">
        <UserDisplay user={user} />
        {user ? (
          <SignOutButton
            onSignOut={() => {
              alert("You have been signed out.");
              setUser(undefined);
            }}
          />
        ) : (
          <SignInButton onSignIn={(user: User) => setUser(user)} />
        )}
        <ThemePicker />
      </div>

      <div className="bg-papyrus-100 flex mdmax:flex-wrap min-h-screen">
        <InputPanel
          submitFile={submitFile}
          submitText={submitText}
          submitURL={submitURL}
        />
        <ResultsPanel fileName={fileName} fileText={fileText} />
      </div>
    </div>
  );
};
uploadStatus = uploadStatuses.Idle;
<<<<<<< HEAD
export default useReadUpload;
=======
export default read_upload;
>>>>>>> 684a503d94de18f3d21809e5e9c7168bc492939b
