import Alert from "./Alert/Alert";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import { useWeather } from "./hooks/useWeather";

function App() {
    const { notFound, fetchAPI, weather, hasWeatherData } = useWeather();
    return (
        <>
            <h1 className={styles.title}>Clima</h1>
            <div className={styles.container}>
                <Form fetchAPI={fetchAPI} />

                {hasWeatherData && <WeatherDetail weather={weather} />}
                {notFound && <Alert>Ciudad no encontrada</Alert>}
            </div>
        </>
    );
}

export default App;
