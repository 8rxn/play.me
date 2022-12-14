import { useNavigate } from "react-router-dom";


const ArtistCard = ({track}) => {
  const Navigate= useNavigate();
 
  return(
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-0-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    onClick={()=>Navigate(`/artists/${track?.artists[0].adamid}`)}
    >

      <img src={track?.share.avatar} alt="" className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>


  )
}

export default ArtistCard;
