import { Link } from "react-router-dom";

const DetailsHeader = ({artistData,songData,artistId}) => {

  const artattr=artistData.data[0].attributes;



  return (

    <div className="relative w-full flex flex-col">
      <div className="w-full bg-zinc-900 rounded-xl sm:h-48 h-28 flex-row flex justify-between"> 
  
      <div className="absolute inset-0 flex items-center">
      <img src={artistId?artattr.artwork.url:songData?.images?.coverart} alt="" className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" />

      <div className="ml-5">
        <p className="text-white text-2xl sm:text-3xl font-bold"> {artistId?artattr.name:songData?.title}</p>

        {!artistId &&(
          <Link to={`/artists/${songData?.artists[0].adamid}`}>
          <p className="text-base text-gray-400 mt-2">{songData?.subtitle} </p></Link>
        )}

        <p className="text-base text-gray-400 mt-2"> 
          {artistId
          ?artattr?.genreNames[0]
          : songData?.genres?.primary}
        </p>
      </div>
      </div>
      </div>
      </div>
  )
}

export default DetailsHeader;
