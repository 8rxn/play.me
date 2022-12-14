
import { Link } from 'react-router-dom'

import PlayPause from './PlayPause'
import { playPause,setActiveSong } from '../redux/features/playerSlice'
import { useDispatch } from 'react-redux'


const SongCard = ({song, i, isPlaying,activeSong, data}) => {
  const dispatch= useDispatch();
  const handlePauseClick=()=>{
    
    dispatch(playPause(false));
  };

  const handlePlayClick=()=>{

    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white bg-opacity-20 backdrop-blur-sm animate-slidup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong.title===song.title?'flex bg-black bg-opacity-70':'hidden'}`}>

          <PlayPause song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick}
          isPlaying={isPlaying} activeSong={activeSong}
           />
        </div>
          <img src={song.images?.coverart} alt="song_img" />
      </div>
      <div className='mt-4 flex-col flex '>
    <p className='font-semibold text-lg truncate text-white'>
      <Link to={`/songs/${song?.key}`}>
      {song.title}
      </Link>
    </p>
    <p className=' text-md truncate text-white opacity-60'>
      <Link  to={song.artists?`/artists/${song?.artists[0]?.adamid}`:`/top-artists`}>
      {song.subtitle}
      </Link>
    </p>
      </div>
    </div>
  )
}

export default SongCard