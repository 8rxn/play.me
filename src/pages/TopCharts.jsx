import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader,SongCard } from '../components';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';


const TopCharts = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const{activeSong,isPlaying} =useSelector((state)=>state.player);



const{data,isFetching,error}=useGetTopChartsQuery(country);

if(isFetching) return<Loader title='Loading Top Charts'/>

if(error)return <Error/>



return(
    
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white mt-4 mb-10 text-left'>Top Charts<span className='text-white/10'>{country}</span>
        </h2>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song,i)=>{
            return(
                <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={i} ></SongCard>
            )
        })}
        </div>
    </div>
    )}

export default TopCharts;
