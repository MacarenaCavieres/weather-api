import axios from "axios";
import { SearchType } from "../types";
import { z } from "zod";
import { useMemo, useState } from "react";

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    }),
});

export type Weather = z.infer<typeof Weather>;

const initialState = {
    name: "",
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
};

export const useWeather = () => {
    const [weather, setWeather] = useState<Weather>(initialState);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAPI = async (search: SearchType) => {
        const apikey = import.meta.env.VITE_API_KEY;
        setLoading(true);
        setWeather(initialState);

        try {
            const apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apikey}`;

            const { data } = await axios.get(apiCall);

            if (!data[0]) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const wheatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

            const { data: weatherResult } = await axios.get(wheatherUrl);

            const result = Weather.safeParse(weatherResult);

            if (result.success) {
                setWeather(result.data);
            } else {
                console.log("Respuesta mal formada");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const hasWeatherData = useMemo(() => weather.name, [weather]);

    return {
        notFound,
        fetchAPI,
        weather,
        loading,
        hasWeatherData,
    };
};
