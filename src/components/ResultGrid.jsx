import { useSelector, useDispatch } from "react-redux";
import {
  fetchKlipyGifs,
  fetchPexelsVideos,
  fetchUnsplashImages,
} from "../api/mediaApi";
import { setError, setResults } from "../Redux/features/searchSlice";
import React, { useEffect } from "react";

const ResultGrid = () => {
  const { results, error, loading, activeTab, query } = useSelector(
    (store) => store.search,
  );

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      let data = [];

      if (!query) {
        dispatch(setResults([]));
        return;
      }

      if (activeTab === "gifs") {
        data = await fetchKlipyGifs(query);
      } else if (activeTab === "videos") {
        data = await fetchPexelsVideos(query);
      } else if (activeTab === "photos") {
        data = await fetchUnsplashImages(query);
      }

      const safeData = Array.isArray(data)
        ? data
        : data?.data || data?.results || [];

      dispatch(setResults(safeData));
    } catch (err) {
      console.error(err);
      dispatch(setError("Failed to fetch results.", err.message));
    }
  };

  useEffect(() => {
    getData();
  }, [activeTab, query]);

  
  const handleDownload = async (url, title = "file") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(url, "_blank"); 
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      {/* STATUS */}
      {loading && <p className="text-center text-lg text-white">Loading...</p>}

      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p className="text-center text-lg text-gray-300">No results found.</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Array.isArray(results) &&
          results.map((item, index) => {
            const imageUrl =
              activeTab === "photos"
                ? item?.urls?.regular
                : activeTab === "gifs"
                  ? item.file.hd.gif.url
                  : item?.image || item?.video_pictures?.[0]?.picture;

            const videoUrl = item?.video_files?.[0]?.link;

            const title = item?.title || item?.alt_description || "Untitled";

            return (
              <div
                key={index}
                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md group"
              >
                {/* IMAGE / GIF */}
                {(activeTab === "photos" || activeTab === "gifs") && (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full aspect-square object-cover cursor-pointer"
                    onClick={() => window.open(imageUrl, "_blank")}
                  />
                )}

                {/* VIDEO */}
                {activeTab === "videos" && (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full aspect-square object-cover"
                  />
                )}

                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-white text-sm truncate">{title}</p>
                </div>

                {/* SAVE BUTTON */}
                <button
                  onClick={() =>
                    handleDownload(
                      activeTab === "videos" ? videoUrl : imageUrl,
                      title,
                    )
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                >
                  Save
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ResultGrid;
