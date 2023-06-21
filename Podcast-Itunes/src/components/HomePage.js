import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [lastFetchTime, setLastFetchTime] = useState(null);
    useEffect(() => {
        const dataPai = async () =>{
          try {
            const now = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            if (!lastFetchTime || now - lastFetchTime > oneDay) {
              const allOriginsUrl = 'https://api.allorigins.win/get?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
              const response = await fetch(allOriginsUrl);
              const data = await response.json();
              const jsonData = await JSON.parse(data.contents);
              const podcastList = await jsonData.feed.entry;
              setPodcasts(podcastList);
              setFilteredPodcasts(podcastList);
              setLastFetchTime(now);
              
            }
          }catch(error){
            console.error('errorrrrrrrrrr!:', error);
          }
           
          }
          dataPai()
         
    }, [lastFetchTime,podcasts.id]);
    const handleFilterChange = (event) => {
      const searchText = event.target.value.toLowerCase();
      setFilterText(searchText);
  
      const filteredList = podcasts.filter((podcast) => {
        const title = podcast['im:name'].label.toLowerCase();
        const author = podcast['im:artist'].label.toLowerCase();
        return title.includes(searchText) || author.includes(searchText);
      });
  
      setFilteredPodcasts(filteredList);
    };

  return (
    <div className='content'>
        <h1>Podcaster</h1>
        
       <div className="podcasts-home-content">
        <div className="search">
            <span>100</span>
            <input
             type="text"
             value={filterText}
             onChange={handleFilterChange}
              placeholder='Filter Podcasts...' />
        </div>

          <div className='podcast-content '>
            <div className='link'>
          {filteredPodcasts.map((podcast) =>(
            <div className='grid' key={podcast.id.attributes["im:id"]} >
              <Link  to={`/podcast/${podcast.id.attributes["im:id"]}`} className='route'>

              <div className='img'>
              <img width='150px' height='130px' src={podcast["im:image"][2].label} alt="" />
              </div>

               <div className='contenu'>
              <h3 className='name'>{podcast["im:name"].label}</h3>
              <p className='artist'>{podcast["im:artist"].label}</p>
               </div>


            </Link>
            </div>
           ))}
           </div>
          </div>
       </div>
    </div>
  )
}

export default HomePage
