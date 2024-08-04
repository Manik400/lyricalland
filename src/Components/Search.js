import React, { useState, useContext, useEffect } from "react";
import { TrackContext } from "../Context/Context";
import axios from "axios";
import img1 from "../lirix_banner1.png";

const Search = () => {
    const [state, setState, search, setSearch] = useContext(TrackContext);
    const [userInput, setUserInput] = useState("");
    const [trackTitle, setTrackTitle] = useState("");

    useEffect(() => {
        if (trackTitle !== "") {
            axios.get(`/api/track-search?trackTitle=${trackTitle}`)
                .then(res => {
                    const data = JSON.parse(res.data);
                    setState({ track_list: data.message.body.track_list, heading: "Search Results" });
                })
                .catch(err => console.log(err));
        }
    }, [trackTitle]);

    const findTrack = (e) => {
        e.preventDefault();
        setSearch(true);
        setTrackTitle(userInput);
    };

    const onChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="flex justify-around bg-black">
            <img src={img1} className="w-2/5" />
            <div className="flex justify-start items-center flex-col min-h-80 px-32 mx-16 text-white">
                <h1 className="pt-8 pb-16 text-3xl text-center">
                    <span>Search For A Song</span>
                </h1>
                <div className="text-center">
                    <p>Get the lyrics for any song</p>
                    <form onSubmit={findTrack} className="mt-12 mb-8">
                        <input
                            type="text"
                            className="w-full p-4 rounded-sm text-black"
                            placeholder="Search"
                            name="userInput"
                            value={userInput}
                            onChange={onChange}
                        />
                        <button type="submit" className="bg-red-600 hover:bg-red-800 text-white py-2 px-6 my-4">
                            Get Track Lyrics
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Search;
