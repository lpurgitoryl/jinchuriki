export default function Button({ buttonName }: { buttonName: string }) {
  return (
    <button
      name={buttonName}
      className="my-4 mx-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
    >
      {buttonName}
    </button>
  );
}
