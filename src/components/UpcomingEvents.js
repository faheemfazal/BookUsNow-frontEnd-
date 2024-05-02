import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import { img } from "./assets/img";
import moment from "moment";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false); // Flag to prevent multiple API calls

  useEffect(() => {
   
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollHeight -
          (window.innerHeight + window.scrollY) <=
          100 &&
        !fetching &&
        !loading
      ) {
        setFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetching, loading]);

  useEffect(() => {
    if (fetching) {
     

      fetchEvents();
    }
  }, [fetching]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
    
      const response = await axios.get(
        `${process.env.REACT_APP_EVENTS_API}&page=${page}`
      );
      setEvents((prevEvents) => [...prevEvents, ...response?.data.events]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  return (
    <>
      <div className="md:mx-14 ml-12 flex  justify-between mt-10">
        <div className="flex md:text-xl text-lg text-black items-center gap-5 md:pl-16 -ml-6">
          <p className="cursor-pointer">Recommended Show</p>
          <FaArrowRightLong className="cursor-pointer" />
        </div>
        <p className="text-black underline cursor-pointer mr-4">See all</p>
      </div>
      <div className="w-full lg:px-20 flex flex-col h-screen">
        <div className="flex gap-6  justify-center flex-wrap  items-center py-5 w-[100%]">
          {events.map((data, index) => (
            <div
              key={index}
              className="w-90  h-80 ml-3 bg-white  rounded-xl border-2 border-[#E8EFF2]"
            >
              <div className="h-60 p-2 ">
                <div
                  className={` rounded-xl h-full z-10 w-80  flex flex-col justify-end `}
                  style={{
                    backgroundImage: `url(${img[index]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  key={index}
                >
                  <div className="w-full h-10 text-white p-2  z-20 bg-black opacity-70 rounded-b-xl">
                    {moment(data.date).format("MMMM DD, YYYY")}
                  </div>
                </div>

        
              </div>
              <h1 className="text-black p-2 pl-2 ml-1">{data.eventName}</h1>
              <div className="flex justify-between w-full  px-3">
                <div className="flex  items-center text-sm gap-2">
                  <IoLocationSharp className="text-[#989090]" />
                  <p className="items-center text-[#989090]">{data.cityName}</p>
                </div>
                <p className="text-[#989090] text-sm ">
                  {data.weather} | {`${Math.round(data.distanceKm)}km`}
                </p>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className=" w-full h-14 flex justify-center loading-spinner">
            <FadeLoader
              color={"#989090"}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </>
  );
}
