import { useEffect, useState } from "react";
import styled from "styled-components"

// 시작, 일시정지, 초기화 버튼
// 경과 시간 00:00:00 형식으로 출력 (시:분:초)
// setInterval을 사용해서 1초마다 업데이트
// 일시정지하면 멈추고, 시작 누르면 다시 이어서 진행
// 초기화 누르면 0으로 리셋

export const Timer = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');


    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000)
        } else if (!isRunning && timer) {
            clearInterval(timer);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, [isRunning])

    const handleStartclick = () => {
        setIsRunning(true);
    }

    const handleStopClick = () => {
        setIsRunning(false);
    }

    const handleResetClick = () => {
        setSeconds(0);
    }
    
    return (
        <Wrapper>
            <p>{hour}:{minute}:{sec}</p>
            <ButtonWrapper>
                <button onClick={handleStartclick}>시작</button>
                <button onClick={handleStopClick}>일시정지</button>
                <button onClick={handleResetClick}>초기화</button>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;