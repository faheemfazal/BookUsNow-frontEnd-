import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import moment from "moment";
import { img } from "./assets/img";
import axios from "axios";

export default function RecommendedShow() {
  const [recommendedShow, setRecommendedShow] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(process.env.REACT_APP_REC_API)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setRecommendedShow(data.events);
        })
        .catch((error) => {
          console.error("Error fetching recommended show:", error);
        });
    } catch {}
  }, []);



  return (
    <>
      <div className="md:mx-14 ml-12 flex  justify-between ">
        <div className="flex md:text-xl text-lg text-white items-center gap-5 md:pl-16 -ml-6">
          <p className="cursor-pointer">Recommended Show</p>
          <FaArrowRightLong className="cursor-pointer" />
        </div>
        <p className="text-white text-base underline cursor-pointer mr-4">
          See all
        </p>
      </div>
      <div className="flex ">
        <div className="md:w-32 w-10 h-96 "></div>
        <div className="w-full h-96   mt-4 flex gap-3 overflow-auto scrollbar-hide pe-10">
          <div className="flex gap-10">
            {recommendedShow &&
              recommendedShow.map((data, index) => (
                <div
                  className={`rounded-xl  md:h-96 md:w-72 h-96 w-64 `}
                  style={{
                    backgroundImage: `url(${img[index]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  key={index}
                >
                  <div className="h-full flex flex-col justify-end">
                    <div className="flex justify-between w-full md:px-3 px-1.5 items-end pb-2">
                      <div className="flex items-center text-sm gap-2">
                        <p className=" font-bold text-white ">
                          {data.eventName}
                        </p>
                      </div>
                      <p className="text-white text-sm text-right">
                        {" "}
                        {moment(data.date).format("MMMM DD, YYYY")}
                      </p>
                    </div>
                    <div className="flex justify-between w-full md:px-3 px-1.5 items-end pb-2">
                      <div className="flex items-center text-sm gap-2">
                        <IoLocationSharp className="text-white" />
                        <p className="items-center text-sm text-white  text-[12px]">
                          {data.cityName}
                        </p>
                      </div>
                      <p className="text-white text-[12px] text-right ">
                        {data.weather} | {`${Math.round(data.distanceKm)} km`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
