import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import ViedeoCard from "../components/ViedeoCard";
import Youtube from "../api/youtube";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import FakeYoutubeClient from "../api/fakeyoutubeClient";
import YoutubeClient from "../api/youtubeClient";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], async () => {
    return fetch(`/videos/${keyword ? "search" : "popular"}.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return (
    <>
      <div>Videos {keyword ? `🪕${keyword}` : "🛑"} </div>;
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🉑</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
          {videos.map((video) => (
            <ViedeoCard key={video.id} video={video}></ViedeoCard>
          ))}
        </ul>
      )}
    </>
  );
}
