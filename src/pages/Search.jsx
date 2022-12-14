import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader,SongCard } from '../components';
import { useParams } from 'react-router-dom';

import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';


const Search = () => {

    const {searchTerm}=useParams();

    const [loading, setLoading] = useState(true);
    const{activeSong,isPlaying} =useSelector((state)=>state.player);



const{data,isFetching,error}=useGetSongsBySearchQuery(searchTerm);

const songs=data?.tracks?.hits?.map((song)=>song.track);
console.log(songs);

if(isFetching) return<Loader title='Loading Top Charts'/>

if(error)return <Error/>



return(
    
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white mt-4 mb-10 text-left'>Showing Results For <span className='   text-red-500 p-3'>{searchTerm}</span>
        </h2>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {songs?.map((song,i)=>{
            return(
                <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={i} ></SongCard>
            )
        })}
        </div>
    </div>
    )}

export default Search;
