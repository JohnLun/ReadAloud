import { playAudioMessage } from "lib/playAudioMessage";
import { UploadStatus } from "lib/uploadStatus";
import { useEffect, useState } from "react";

interface PlayButtonProps {
  uploadStatus: UploadStatus;
  audioBinaryData: string;
}
export const PlayButton = (props: PlayButtonProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setIsPlaying] = useState<boolean>(false);

  // Reset the audio binary whenever the underlying data changes
  useEffect(() => {
    console.log("data:audio/mpeg;base64," + props.audioBinaryData);
    setAudio(new Audio("data:audio/mpeg;base64," + props.audioBinaryData));
  }, [props.audioBinaryData]);

  const onPlay = () => {
    // Play the upload status audio message on press unless the
    // data has already been received
    if (props.uploadStatus != UploadStatus.Ready) {
      playAudioMessage(props.uploadStatus);
    }

    if (!playing) {
      audio?.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      className="flex justify-center items-center w-48 h-48 rounded-full bg-papyrus-200 hover:bg-papyrus-300 focus:outline-none"
      onClick={onPlay}
    >
      <div className="ml-4 w-0 h-0 border-b-transparent border-l-brown-900 border-t-transparent border-r-transparent border-solid border-t-[3rem] border-r-0 border-b-[3rem] border-l-[6rem]"></div>
    </button>
  );
};
