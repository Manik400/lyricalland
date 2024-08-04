import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const Lyrics = () => {
    const { id } = useParams();
    const [track, setTrack] = useState({});
    const [lyrics, setLyrics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lyricsRes = await axios.get(`/api/track-lyrics?trackId=${id}`);
                const lyricsData = JSON.parse(lyricsRes.data);
                setLyrics(lyricsData.message.body.lyrics);

                const trackRes = await axios.get(`/api/track-details?trackId=${id}`);
                const trackData = JSON.parse(trackRes.data);
                setTrack(trackData.message.body.track);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <>
                <Link to="/" className="bg-gray-800 text-white p-4 text-lg block w-2/6 mx-auto my-8">
                    Go Back
                </Link>
                <div className="track">
                    <h1 className="text-center text-4xl mb-4">{track.track_name} by{" "} <span className="text-red-600">{track.artist_name}</span></h1>
                    <div className="lyrics text-center">
                        <p className="text-lg">{lyrics.lyrics_body}</p>
                    </div>
                    <ul className="mt-8">
                        <li className="text-lg"><strong>Album ID:</strong> {track.album_id}</li>
                        <li className="text-lg"><strong>Song Genre:</strong> {track.primary_genres.music_genre_list.length === 0 ? "NO GENRE AVAILABLE" : track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li>
                        <li className="text-lg"><strong>Explicit Words:</strong> {track.explicit === 0 ? "No" : "Yes"}</li>
                        <li className="text-lg"><strong>Release Date:</strong> <span className="text-red-600">{track.first_release_date}</span></li>
                    </ul>
                </div>
            </>
        );
    }
};

export default Lyrics;
