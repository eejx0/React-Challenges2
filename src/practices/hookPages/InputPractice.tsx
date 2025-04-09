import styled from "styled-components"
import { useInput } from "../hooks/useInput";

function handleSubmit(message: string) {
    alert(message)
}

export const InputPractice = () => {
    const [value, handleChange, handleClick] = useInput("", handleSubmit);

    return (
        <Wrapper>
            <h1>useInput</h1>
            <InputWrapper>
                <input value={value} onChange={handleChange} type="text" placeholder="값을 입력해주세요" />
                <button onClick={handleClick}>확인</button>
            </InputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    > h1 {
        font-size: 50px;
        font-weight: 600;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;