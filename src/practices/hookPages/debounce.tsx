import styled from "styled-components"
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";

export const Debounce = () => {
    const [text, setText] = useState<string>("");

    const inputText = useDebounce(text, 500);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <Wrapper>
            <h1>useDebounce</h1>
            <input value={text} type="text" placeholder="키워드를 입력하세요" onChange={handleOnChange}/>
            <h3>{inputText}</h3>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;