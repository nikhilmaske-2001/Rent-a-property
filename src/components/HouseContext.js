import React, { useState, useEffect, createContext } from 'react';
import dayjs from 'dayjs';

import { housesData } from '../data';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
    const [houses, setHouses] = useState(housesData);
    const [country, setCountry] = useState('Location (any)');
    const [countries, setCountries] = useState([]);
    const [property, setProperty] = useState('Property (any)');
    const [properties, setProperties] = useState([]);
    const [price, setPrice] = useState('Price (any)');
    const [bookingDate, setBookingDate] = useState();
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
        setProperties(uniqueProperties);
    }, [])

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = mm + '/' + dd + '/' + yyyy;
        setBookingDate(dayjs(formattedToday));
    }, [])

    const handleClick = () => {
        setLoading(true);
        // check the string if includes '(any)'
        const isDefault = (str) => {
            return str.split(' ').includes('(any)');
        };

        const isAvailable = (booked_from, booked_till, bookingDate) => {
            const booked_from_date = new Date(booked_from);
            const booked_till_date = new Date(booked_till);
            let date = (bookingDate.$M + 1) + '/' + bookingDate.$D + '/' + bookingDate.$y;
            const bookingDate_date = new Date(date);
            // if (!(date > booked_from && date < booked_till)) {
            //     console.log("Available");
            // } else {
            //     console.log('Not Available')
            // }
            return (!(bookingDate_date > booked_from_date && bookingDate_date < booked_till_date));
        }

        // get first string (price) and parse it to number
        const minPrice = parseInt(price.split(' ')[0]);
        // get last string (price) and parse it to number
        const maxPrice = parseInt(price.split(' ')[2]);

        const newHouses = housesData.filter((house) => {
            const housePrice = parseInt(house.price);
            console.log(bookingDate);
            // all values are selected
            if (
                house.country === country &&
                isAvailable(house.booked_from, house.booked_till, bookingDate) &&
                house.type === property &&
                housePrice >= minPrice &&
                housePrice <= maxPrice
            ) {
                return house;
            }
            // all values are default
            if (isDefault(country) && isDefault(property) && isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                return house;
            }
            // country is not default
            if (!isDefault(country) && isDefault(property) && isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                return house.country === country;
            }
            // property is not default
            if (!isDefault(property) && isDefault(country) && isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                return house.type === property;
            }
            // price is not default
            if (!isDefault(price) && isDefault(country) && isDefault(property) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house;
                }
            }
            // country and property is not default
            if (!isDefault(country) && !isDefault(property) && isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                return house.country === country && house.type === property;
            }
            // country and price is not default
            if (!isDefault(country) && isDefault(property) && !isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.country === country;
                }
            }
            // property and price is not default
            if (isDefault(country) && !isDefault(property) && !isDefault(price) && isAvailable(house.booked_from, house.booked_till, bookingDate)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.type === property;
                }
            }
        });

        setTimeout(() => {
            return (
                newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
                setLoading(false)
            );
        }, 1000);
    }

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
            handleClick,
            bookingDate,
            setBookingDate
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseContextProvider;