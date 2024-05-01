import RecommendedShow from "./Recommended";
import UpcomingEvents from "./UpcomingEvents";

export default function Banner(){
    return (
        <>
        <div className="h-[98%] w-full bg-Banner bg-cover bg-center flex flex-col md:justify-center  pt-20 items-center">

        <div className="text-white mt-8">
            <h1 className="lg:text-5xl md:text-3xl text-3xl text-center font-medium md:px-20 lg:px-60 px-10 lg:leading-[5rem] md:leading-[5rem] leading-[5rem] md:-mt-28 -mt-3">Discover Exciting Events Happening Near You - Stay Tuned for Updates!</h1>
        </div>
        <div className=" h-40">
        <p className="text-lg text-gray-300 text-center md:leading-10 md:px-20 lg:px-60 px-10  leading-[3rem] py-4 h-32">Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text, </p>

        </div>
    </div>
      <div className="h-[100%] w-full">

        <div className="w-[100%] -mt-56 h-screen "> 

        <RecommendedShow />
        <UpcomingEvents />

         </div>
      </div>
</>
    )
}