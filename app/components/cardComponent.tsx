import Image from "next/image";
import { useState } from "react";

export default function CardComponent({ data }: any) {
  const [imageIndex, setIndex] = useState(0);

  function handleImageChange(imageArr: string[], isLeft: boolean) {
    if (isLeft && imageIndex > 0) {
      setIndex(imageIndex - 1);
      return;
    } else if (!isLeft && imageIndex < imageArr.length - 1) {
      setIndex(imageIndex + 1);
      return;
    }
  }

  return (
    <div id="cardSection" className="w-1/2 flex px-4 py-4">
      <div
        id="card"
        className="mx-4 my-4 px-4 py-4 w-full border-2 border-black rounded-lg flex flex-col items-center"
      >
        <div className="font-bold " id="cardTitle">
          {data.name}
        </div>
        <Image
          src={data.images[imageIndex]}
          width={200}
          height={200}
          alt="character image"
        />
        {data.images.length > 1 ? (
          <div>
            <button
              className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
              id="nextImageLeft"
              onClick={() => {
                handleImageChange(data.images, true);
              }}
            >
              &lt;
            </button>
            <button
              className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
              id="nextImageRight"
              onClick={() => {
                handleImageChange(data.images, false);
              }}
            >
              &gt;
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="font-semibold text-wrap max-w-full break-words">
          {data.personal.birthdate != null ? (
            <div> Birthdate: {data.personal.birthdate}</div>
          ) : (
            ""
          )}
          {data.personal.sex != null ? (
            <div> Sex: {data.personal.sex}</div>
          ) : (
            ""
          )}
          {data.personal.bloodType != null ? (
            <div>Blood Type: {data.personal.bloodType}</div>
          ) : (
            ""
          )}
          {data.personal.affiliation != null ? (
            <div>
              Affiliation(s):
              {data.personal.affiliation.length > 1 &&
              Array.isArray(data.personal.affiliation)
                ? data.personal.affiliation.map((el) => {
                    return el + ", ";
                  })
                : data.personal.affiliation}
            </div>
          ) : (
            ""
          )}
          {data.personal.occupation != null ? (
            <div>
              Occupation(s):
              {data.personal.occupation.length > 1 &&
              Array.isArray(data.personal.occupation)
                ? data.personal.occupation.map((el) => {
                    return el + ", ";
                  })
                : data.personal.occupation}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
    // <div>{data}</div>
  );
}
