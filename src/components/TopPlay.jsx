import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import 'swiper/css/free-mode'


const TopChartCard=({song,i,isPlaying,activeSong,handlePauseClick,handlePlayClick})=>{
  return(
    <div className="w-full flex flex-row items-center hover:bg-slate-600 py-2 p-4 rounded-lg cursor-pointer mb-2 text-white">
      <p className="text-white ">{i+1}</p>
      <div className="w-20 h-20 flex justify-center items-center rounded-md mx-2 ml-5">

      <img src={song.images?.coverart} alt="" className="rounded-md  align-middle "/>
      </div>
      <div className="flex flex-col w-full items-start mx-2">
      <Link to={`songs/${song.key}`}>
      <h4>{song?.title}</h4>
      </Link>
      <Link to={`artists/${song?.artists[0].adamid}`}>
      <h5>{song?.subtitle}</h5>
      </Link>
      
      </div>
      <div>
        <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePlay={()=>{handlePlayClick(song,i)}}
        handlePause={handlePauseClick}
        />
      </div>

    </div>
  )
}

const TopPlay = () => {
  const dispatch=useDispatch();
  const {activeSong,isPlaying}=useSelector((state)=>state.player);
  const {data}=useGetTopChartsQuery();
  const divRef=useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({behavior:'smooth'});
  })
  

  const topPlays = data?.slice(0,5);


  const handlePauseClick=()=>{
    
    dispatch(playPause(false));
  };

  const handlePlayClick=(song,i)=>{

    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  };

  return(
  <div ref={divRef} className="xl:ml-8 ml-0 xl:mb-0 mb-8 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">
          Top Charts
        </h2>
        <Link to='/top-charts'>
          <p className="text-gray-300 text-base cursor-pointer" >See more</p>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {topPlays?.map((song,i)=>{return(

          <TopChartCard song={song} i={i} key={song.key} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
          )
        })}

      </div>
    </div>

    <div className="w-full flex flex-col mt-8">
    <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">
          Top Artists
        </h2>
        <Link to='/top-artists'>
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
        </Link>
      </div>
    <Swiper slidesPerView="auto" spaceBetween={5} freeMode
    centeredSlides centeredSlidesBounds modules={[FreeMode]} className='mt-4' >
      {topPlays?.map((song,i)=>(
        <SwiperSlide key={song.key} style={{width:'25%',height:'auto' }} className='shadow-lg rounded-full animate-slideright' >
          <Link to={`artists/${song?.artists[0].adamid}`}>
          <img src={song?.images.background} alt="" className="rounded-full w-full object-cover  "/>
          </Link>
        </SwiperSlide>
      ))}

    </Swiper>
    </div>
  </div>
)}

export default TopPlay;
