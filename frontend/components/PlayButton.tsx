import { playAudioMessage } from "lib/playAudioMessage";
import { UploadStatus } from "lib/uploadStatus";

interface PlayButtonProps {
  uploadStatus: UploadStatus;
}
export const PlayButton = (props: PlayButtonProps) => {
  const onPlay = () => {
    if (props.uploadStatus != UploadStatus.Ready) {
      playAudioMessage(props.uploadStatus);
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
