import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../../Alert/Alert";

type FetchAPIProps = {
    fetchAPI: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchAPI }: FetchAPIProps) {
    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: "",
    });
    const [alert, setAlert] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(search).includes("")) {
            setAlert("Todos los campos son obligatorios");
            return;
        }

        fetchAPI(search);

        setSearch({
            city: "",
            country: "",
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ingresar ciudad"
                    onChange={handleChange}
                    value={search.city}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Pais</label>
                <select name="country" id="country" value={search.country} onChange={handleChange}>
                    <option value="">-- Seleccione País --</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className={styles.submit} type="submit">
                Buscar clima
            </button>
        </form>
    );
}
