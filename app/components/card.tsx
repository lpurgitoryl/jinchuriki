export default function Card() {
  return (
    <div id="cardSection" className="w-1/2 h-3/4 flex px-4 py-4">
      <div
        id="card"
        className="mx-4 my-4 px-4 py-4 block w-full border border-black"
      >
        <div id="cardTitle">card title goes here</div>
        <div id="cardContent">content goes here</div>
        <div id="cardDescription">card info goes here</div>
      </div>
    </div>
  );
}
