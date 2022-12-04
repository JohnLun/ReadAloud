import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { User } from "firebase/auth";
import { SignInButton } from "components/SignInButton";
import { SignOutButton } from "components/SignOutButton";
import { ThemePicker } from "components/ThemePicker";
import { UserDisplay } from "components/UserDisplay";
import { UploadStatus } from "lib/uploadStatus";
import { playAudioMessage } from "lib/playAudioMessage";
import { filenameToExtension } from "lib/filenameToExtension";
import { extendBackendUrl } from "lib/checkEnvironment";
import { ResultsPanel } from "components/ResultsPanel";
import { InputPanel } from "components/InputPanel";

const ReadUpload: NextPage = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileText, setFileText] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.IdleFile
  );

  // Notify the user that text has been received
  const setFileTextAndReady = (text: string) => {
    setFileText(text);
    setUploadStatus(UploadStatus.Ready);
    playAudioMessage(UploadStatus.Ready);
  };

  const submitFile = async (
    e: ChangeEvent,
    fileRef: React.RefObject<HTMLInputElement>
  ) => {
    // Prevent form submission from automatically refreshing the page
    e.preventDefault();

    // If no files are selected, then it is not possible to submit
    if (!fileRef.current?.files) {
      playAudioMessage("No file selected.");
      return;
    }

    // Create form data object to send to backend
    const data = new FormData();
    data.append("file", fileRef.current.files[0]);

    // Set file name and upload status
    const filename = fileRef.current.files[0].name.toLowerCase();
    setFileName(filename);
    setUploadStatus(UploadStatus.Uploading);

    // Determine backend URL to query
    const fileExtension = filenameToExtension(filename);
    const url = extendBackendUrl(fileExtension);

    // Perform an HTTP POST request to the backend
    const resultRaw = await fetch(url, {
      method: "POST",
      body: data,
    });
    const resultJson = await resultRaw.json();

    // Notify the user that text has been received
    setFileTextAndReady(resultJson.text);
  };

  const submitText = async (text: string) => {
    // Determine backend URL to query
    const url = extendBackendUrl("/text");

    // Perform an HTTP POST request to the backend
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

    setFileTextAndReady(resultJson.text);
  };

  const submitURL = async (value: string) => {
    // Determine backend URL to query
    const url = extendBackendUrl("/url");

    // Perform an HTTP POST request to the backend
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

    // Notify the user that text has been received
    setFileTextAndReady(resultJson.text);
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
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          submitFile={submitFile}
          submitText={submitText}
          submitURL={submitURL}
        />
        <ResultsPanel
          fileName={fileName}
          fileText={fileText}
          uploadStatus={uploadStatus}
        />
      </div>
    </div>
  );
};

export default ReadUpload;
