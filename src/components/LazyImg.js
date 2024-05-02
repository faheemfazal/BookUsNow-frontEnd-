import moment from 'moment';
import { useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';


export default function LazyImg({img,data}){
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
      threshold: 0,
    });
  
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    };

    return (
        <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="w-90 h-80 ml-3 bg-white rounded-xl border-2 border-[#B0BABF]"
          >
            <div className="h-60 p-2">
              <div
                className="rounded-xl h-full w-80 flex flex-col justify-end"
                style={{
                  backgroundImage: isVisible ? `url(${img[index]})` : '',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                ref={ref}
              >
                <div className="w-full h-10 text-white p-2 bg-black opacity-70 rounded-b-xl">
                  {moment(item.date).format('MMMM DD, YYYY')}
                </div>
              </div>
            </div>
            <h1 className="text-black p-2 pl-2 ml-1">{item.eventName}</h1>
            <div className="flex justify-between w-full px-3">
              <div className="flex items-center text-sm gap-2">
                <IoLocationSharp className="text-[#989090]" />
                <p className="items-center text-[#989090]">{item.cityName}</p>
              </div>
              <p className="text-[#989090] text-sm">
                {item.weather} | {`${Math.round(item.distanceKm)}km`}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
}