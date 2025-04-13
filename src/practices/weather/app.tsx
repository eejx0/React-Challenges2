import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";

interface getWeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
}

export const Weather = () => {
    const [weatherData, setWeatherData] = useState<getWeatherData | null>(null);
    const [city, setCity] = useState<string>('Seoul');

    const API_KEY = '1dcab1a39f4a0f2f3c97b03f681ebc5a';

    useEffect(() => {
        const getWeather = async () => {
            try {
                const res = await axios.get<getWeatherData>( "https://api.openweathermap.org/data/2.5/weather", 
                    {
                        params: {
                            q: city,
                            appid: API_KEY,
                            units: "metric",
                            lang: "kr",
                        }
                    },
                );
                setWeatherData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getWeather();
    }, [city])

    return (
        <Wrapper>
            <h1>현재 날씨 정보</h1>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="도시를 입력하세요" />
            {weatherData ? (
                <ContentWrapper>
                    <p>도시: {weatherData.name}</p>
                    <p>온도: {weatherData.main.temp}</p>
                    <p>날씨: {weatherData.weather[0].description}</p>
                </ContentWrapper>
            ) : (
                <div>날씨를 불러오는 중입니다...</div>
            )}
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;