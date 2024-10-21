import styles from "./App.module.css";
import Form from "./components/Form/Form";
import { useWeather } from "./hooks/useWeather";

function App() {
    const { fetchAPI } = useWeather();
    return (
        <>
            <h1 className={styles.title}>Clima</h1>
            <div className={styles.container}>
                <Form fetchAPI={fetchAPI} />
            </div>
        </>
    );
}

export default App;
