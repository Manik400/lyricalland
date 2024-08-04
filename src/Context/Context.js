import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const TrackContext = React.createContext();

const TrackContextProvider = ({children}) => {
    let initialState = {
        track_list: [],
        heading: "Top 10 Songs"
    };

    const [state, setState] = useState(initialState);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        if (!search) {
            axios.get('/api/chart-tracks')
                .then(res => {
                    const data = JSON.parse(res.data);
                    setState({
                        track_list: data.message.body.track_list,
                        heading: "Top 10 Songs"
                    });
                })
                .catch(err => console.log(err));
        }
    }, [search]);

    return (
        <TrackContext.Provider value={[state, setState, search, setSearch]}>
            {children}
        </TrackContext.Provider>
    );
};

export default TrackContextProvider;
