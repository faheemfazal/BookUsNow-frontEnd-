import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import { img } from "./assets/img";

export default function UpcomingEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false); // Flag to prevent multiple API calls

    useEffect(() => {
        console.log('start','1useEffect');
        fetchEvents();
    }, []);

  


    useEffect(() => {
        const handleScroll = () => {
            if (
                document.documentElement.scrollHeight - 
                (window.innerHeight + window.scrollY) <= 100 &&
                !fetching && 
                !loading 
            ) {
                setFetching(true); 
            }
        };
        

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetching, loading]); 

    useEffect(() => {
        if (fetching) {
        console.log('start','2useEffect');

            fetchEvents();
        }
    }, [fetching]); 

    const fetchEvents = async () => {
        setLoading(true);
        try {
            console.log(page, 'Current Page'); 
            const response = await axios.get(
                `${process.env.REACT_APP_EVENTS_API}&page=${page}`
            );
            setEvents(prevEvents => [...prevEvents, ...response?.data.events]);
            setPage(prevPage => prevPage + 1); 
        } catch (error) {
            
        } finally {
            setLoading(false);
            setFetching(false); 
        }
    };


    return (
        <>
            <div className="mx-14 flex  justify-between mt-10">
                <div className="flex text-xl text-black items-center gap-5 pl-16">
                    <p className="cursor-pointer">Recommended Show</p>
                    <FaArrowRightLong className="cursor-pointer" />
                </div>
                <p className="text-black underline cursor-pointer">See all</p>
            </div>
            <div className="w-full flex flex-col h-screen">
                <div className="flex gap-6 justify-center flex-wrap items-center py-5 w-[100%]">
                    {events.map((data, index) => (
                        <div key={index} className="w-90  h-80 ml-3 bg-white  rounded-xl border-2 border-[#B0BABF]">
                            <div className="h-60 p-2">
                                <img
                                    src={`${img[index]}`}
                                    alt="this is song"
                                    className="bg-cover rounded-xl h-full w-80"
                                ></img>
                            </div>
                            <h1 className="text-black p-2 pl-2 ml-1">{data.eventName}</h1>
                            <div className="flex justify-between w-full px-3">
                                <div className="flex  items-center text-sm gap-2">
                                    <IoLocationSharp className="text-[#989090]" />
                                    <p className="items-center text-[#989090]">{data.cityName}</p>
                                </div>
                                <p className="text-[#989090] text-sm">{data.weather} | {`${Math.round(data.distanceKm)}km`}</p>
                            </div>
                        </div>
                    ))}
                </div>
                    {loading && <div className=" w-full h-14 flex justify-center loading-spinner">
                    <FadeLoader
          color={"#989090"}
         
          
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
                        </div>}
            </div>
        </>
    );
}