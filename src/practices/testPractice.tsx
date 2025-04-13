import { useState } from "react";
import styled from "styled-components"

// ✅ 1. 문자열 압축 예시
// 입력: "aaabbccccd"
// 출력: "a3b2c4d1"

// ✅ 2. 중복 없는 가장 긴 부분 문자열
// 문자열에서 중복 없는 가장 긴 연속 부분 문자열의 길이 구하기
// 입력: "abcabcbb"
// 출력: 3 ("abc")


export const TestPractice = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [compressedValue, setCompressedValue] = useState<string>('');
    const [longestValue, LongestValue] = useState<string>('');

    const handleCompressedClick = (value: string) => {
        let split = Array.from(inputValue);
        let result = '';
        let count = 1;

        for (let i = 1; i <= split.length; i++) {
            if (split[i] === split[i-1]) {
                count++;
            } else {
                result += split[i-1] + count;
                count = 1;
            }
        }
        setCompressedValue(result);
    }

    const handleLongestClick = (value: string) => {
        let charSet = new Set(); // 현재 보고 있는 문자열을 기억할 셋
        let start = 0; // 시작 인덱스
        let maxLength = 0; // 가장 긴 길이 저장 
  

    }

    
    
    return (
        <Wrapper>
            <Box>
                <InputWrapper>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"/>
                    <button onClick={() => handleCompressedClick(inputValue)}>압축</button>
                </InputWrapper>
                <p>{compressedValue}</p>
            </Box>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`; 

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;