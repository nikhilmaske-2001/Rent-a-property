import React, { useState, useEffect, createContext } from 'react';

import { housesData } from '../data';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
    const [houses, setHouses] = useState(housesData);
    const [country, setCountry] = useState('Location (any)');
    const [countries, setCountries] = useState([]);
    const [property, setProperty] = useState('Property (any)');
    const [properties, setProperties] = useState([]);
    const [price, setPrice] = useState('Price (any)');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const allCountries = houses.map((house) => {
            return house.country;
        });

        const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

        setCountries(uniqueCountries);
    }, [])

    useEffect(() => {
        const allProperties = houses.map((house) => {
            return house.type;
        });

        const uniqueProperties = ['Location (any)', ...new Set(allProperties)];
        console.log(allProperties)
        setProperties(uniqueProperties);
    }, [])

    return (
        <HouseContext.Provider value={{
            country,
            setCountry,
            countries,
            property,
            setProperty,
            properties,
            price,
            setPrice,
            houses,
            loading,
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseContextProvider;