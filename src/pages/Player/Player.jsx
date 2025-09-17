import React, { useEffect , useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'
const Player = () => {
  const{id} = useParams();

  const [apiData,setApiData] = useState({
    name:" ",
    key: " ",
    published_at:"",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWIwMDQ5ODlmNjQ5MjQ4ZTAxNzA3YzIxYWE0ZmZkMCIsIm5iZiI6MTczNTY2ODEwMC42OTUwMDAyLCJzdWIiOiI2Nzc0MzE4NDA1YzQ2YWIzZmM5MmRhMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zMXyhnhI7R5_N_1CvPmnGGJySNNGDH0QYkFuZTsr10g'
    }
  };

  useEffect(() =>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player