import React, { useState } from "react";
import { Button } from "@mui/material";
const VideoList = () => {
    const [videos, setVideos] = useState([
        {
            _id: 1,
            title: "AWS Cloud Traning",
            description: "Description ",
            thumbnail: "./src/assets/KhoaHoc_img/AWS.jpg",
            subVideos: [
                {
                    _id: 11,
                    title: "Sub Video 1",
                    description: "Description of Sub Video 1",
                    thumbnail: "./src/assets/KhoaHoc_img/AWS.jpg",
                },
                {
                    _id: 12,
                    title: "Sub Video 2",
                    description: "Description of Sub Video 2",
                    thumbnail: "./src/assets/KhoaHoc_img/AWS.jpg",
                },
            ],
        },
        {
            _id: 2,
            title: "Video 2",
            description: "Description of Video 2",
            thumbnail: "src/assets/LogoUIT.svg",
            subVideos: [
                {
                    _id: 21,
                    title: "Sub Video 3",
                    description: "Description of Sub Video 3",
                    thumbnail: "thumbnail21.jpg",
                },
                {
                    _id: 22,
                    title: "Sub Video 4",
                    description: "Description of Sub Video 4",
                    thumbnail: "thumbnail22.jpg",
                },
            ],
        },
    ]);

    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleCloseSubVideos = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="flex flex-wrap justify-center">
            {videos.map((video) => (
                <div key={video._id} className="p-4 max-w-xs">
                    <div className="border border-gray-300 rounded-lg p-4">
                        <img src={video.thumbnail} alt={video.title} className="w-full mb-4" />
                        <h3 className="text-lg font-medium">{video.title}</h3>
                        <p className="text-gray-600">{video.description}</p>
                        <Button
                            onClick={() => handleVideoClick(video)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Bắt đầu!
                        </Button>
                    </div>
                </div>
            ))}
            {selectedVideo && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4">
                        <Button
                            onClick={handleCloseSubVideos}
                            className="absolute top-[100px] right-2 text-black-600 fixed"
                        >
                            Close
                        </Button>
                        <h2 className="text-xl font-medium">{selectedVideo.title}</h2>
                        <p className="text-gray-600">{selectedVideo.description}</p>
                        <div className="flex flex-wrap justify-center mt-4">
                            {selectedVideo.subVideos.map((subVideo) => (
                                <div key={subVideo._id} className="p-2">
                                    <div className="border border-gray-300 rounded-lg p-2">
                                        <img
                                            src={subVideo.thumbnail}
                                            alt={subVideo.title}
                                            className="w-32 h-24 object-cover mb-2"
                                        />
                                        <h3 className="text-md font-medium">{subVideo.title}</h3>
                                        <p className="text-gray-600">{subVideo.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoList;