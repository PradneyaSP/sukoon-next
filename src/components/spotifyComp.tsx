import React from 'react';
import { Spotify } from 'react-spotify-embed';

const SpotifyPlaylist = () => (
    <div className="flex justify-center pt-5">
  <div className="w-96 h-96 mx-auto">
    <Spotify link="https://open.spotify.com/playlist/3abbn1rg9ZbJfHMk317pCh?si=al_NVi5zTDaKbfjeXU0o3A" />
  </div>
  <div className="w-96 h-96 mx-auto">
      <Spotify link="https://open.spotify.com/playlist/03JdDiL2Yz4hHJI9tfPdSc?si=3BUWabGlTk2MjNhmcmDLsQ" />
  </div>
  <div className="w-96 h-96 mx-auto">
      <Spotify link="https://open.spotify.com/playlist/4TBCj4uHbeg6In9V2YanRa?si=-4l3XbAGTsyCuTy5GhaPBA&pi=Wiudz7ZtRU-li" />
  </div>
    </div>
);

export default SpotifyPlaylist;
