import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader,RelatedSongs } from "../components";
import { setActiveSong,playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";


const SongDetails = () => {
    const dispatch=useDispatch();
    const {activeSong,isPlaying}=useSelector((state)=>state.player);
    const{songid}=useParams();
    
    const {data:songData,isFetching: isFetchingSongDetails }=useGetSongDetailsQuery({songid});
    const {data:relatedData, isFetching:isFetchingSongRelated,error}=useGetSongRelatedQuery({songid});

    if(isFetchingSongDetails||isFetchingSongRelated)
    return <Loader title='Loading Song Data'/>

    if(error)return <Error/>

    const handlePauseClick=()=>{
    
        dispatch(playPause(false));
      };
    
      const handlePlayClick=(song,i)=>{
    
        dispatch(setActiveSong({song,data,i}));
        dispatch(playPause(true));
      };
    
    return(
        <div className="flex flex-col">
            <DetailsHeader artistId={''} songData={songData}/>
            <div className="mb-10"> 
                <h2 className="text-white text-2xl ">Lyrics</h2>

                <div className="mt-5 ">
                {songData?.sections[1].type==='LYRICS'?songData?.sections[1].text.map((line,i)=>(
                    <p className="text-white/40">{line}</p>
                )):<p className="text-grey-400">Lyrics Not Available</p>}
                </div>
            </div>

            <RelatedSongs
            data={relatedData}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}

            />
        </div>
    )
}

export default SongDetails;
