import { Dispatch, SetStateAction, FormEvent } from "react";

export default function Button({
  buttonName,
  isLeft,
  onID,
  ID,
}: {
  buttonName: string;
  isLeft: boolean;
  onID: Dispatch<SetStateAction<number>>;
  ID: number;
}) {
  function handleClick() {
    if (isLeft && ID > 0) {
      onID(ID - 1);
      return;
    } else if (!isLeft && ID < 1431) {
      onID(ID + 1);
      return;
    }
  }
  return (
    <button
      name={buttonName}
      className="my-4 mx-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] active:bg-gray-500 active:shadow-none"
      type="button"
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}
