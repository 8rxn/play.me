
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader,SongCard } from '../components';

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';


const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const{activeSong,isPlaying} =useSelector((state)=>state.player);

    
    useEffect(()=>{
        
        const fetching=async()=>{
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '1664850bc8msh09875e1fb1c0b40p1e8d90jsn78b5edd175ce',
                    'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
                }
            };
            
            fetch('https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', options)
            .then(response => response.json())
	.then((response) =>{setCountry(response.country_code)} )
	.catch(err => console.error(err))
    .finally(setLoading(false));

}
fetching();
},[country])


const{data,isFetching,error}=useGetSongsByCountryQuery(country);

if(isFetching && loading) return<Loader title='Loading Songs Around You'/>

if(error && country)return <Error/>



return(
    
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white mt-4 mb-10 text-left'>Around You  <span className='text-red-500 p-1'>{country}</span>
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

export default AroundYou;
