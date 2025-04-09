import { useEffect, useState } from "react";
import styled , { ThemeProvider }from "styled-components";
import { LightTheme, DarkTheme } from "./theme";

export const LocalStoragePractice = () => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    const [theme, setTheme] = useState<"light" | "dark">(savedTheme)

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return (
        <ThemeProvider key={theme} theme={theme === "light" ? LightTheme : DarkTheme }>
            <Wrapper>
                <button onClick={toggleTheme}>테마 변경</button>
                <h3>테마</h3>
            </Wrapper>
        </ThemeProvider>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
`;