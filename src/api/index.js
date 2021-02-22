import data from '../data/countries.csv';
import summary from '../data/summary.json';

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// Gets data for every country
const getCountries = async () => {
    const URL = "https://api.covid19api.com/summary";
    return fetch(URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const countries = data.Countries.map(country => {
                    var deathRecoveryRate = country.TotalRecovered/country.TotalDeaths;
                    return country = {
                        "CountryCode": country.CountryCode,
                        "Cases": country.TotalConfirmed,
                        "Deaths": country.TotalDeaths,
                        "Recovered": country.TotalRecovered,
                        "DeathRecoveryRate": deathRecoveryRate
                    };
                });
                // Sorts the data by country code
                countries.sort((a, b) => (a.CountryCode > b.CountryCode) - (a.CountryCode < b.CountryCode));
                return countries;
            };
        })
        .catch((error) => console.log(error));
};

// Gets the lat and longitude of all countries
const getData = async () => {
    // Fetch from .csv file
    return fetch(data)
        .then(response => response.text())
        .then(data => {
            if (data) {
                // Split in rows, then split each row into columns to parse
                var countryCoordinates = [];
                const rows = data.split('\n');
                for (var i = 0; i < rows.length; i++) {
                    var currRow = rows[i].split(',');
                    countryCoordinates.push({
                        "CountryName": currRow[3],
                        "Latitude": currRow[1],
                        "Longitude": currRow[2]
                    });
                };
                return countryCoordinates;
            };
        })
        .catch((error) => console.log(error));
};

// Gets the country cases from json file
const getCountry = async () => {
    const countries = summary.Countries.map(country => {
        // Make sure no division by zero
        var deathRecoveryRate;
        if (country.TotalDeaths != 0) {
            deathRecoveryRate = country.TotalRecovered/country.TotalDeaths;
        } else {
            deathRecoveryRate = 0;
        }

        return country = {
            "CountryCode": country.CountryCode,
            "Cases": country.TotalConfirmed,
            "Deaths": country.TotalDeaths,
            "Recovered": country.TotalRecovered,
            "DeathRecoveryRate": deathRecoveryRate
        };
    });
    // Sorts the data by country code
    countries.sort((a, b) => (a.CountryCode > b.CountryCode) - (a.CountryCode < b.CountryCode));
    return countries;
};

export const combine = async () => {
    // If you have API KEY you can get updated data using getCountries
    // const covidData = await getCountries();
    const covidData = await getCountry();
    const coorData = await getData();
    var countryData = [];
    for (var i = 0; i < coorData.length; i++) {
        countryData.push({
            "CountryName": coorData[i].CountryName,
            "Latitude": coorData[i].Latitude,
            "Longitude": coorData[i].Longitude,
            "Cases": covidData[i].Cases,
            "Deaths": covidData[i].Deaths,
            "Recovered": covidData[i].Recovered,
            "DeathRecoveryRate": covidData[i].DeathRecoveryRate
        });
    };
    return countryData;
};