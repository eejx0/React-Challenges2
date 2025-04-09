import styled from "styled-components"
import { DropDown } from "./components/dropDown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 랜덤 문제 출제 (ex: 덧셈, 뺄셈 문제) ✅
// 제한 시간 안에 문제 풀기 (ex: 5초 타이머) ✅
// 맞히면 점수 증가, 틀리면 기회 소진 ✅
// 게임 종료 후 최종 점수 표시 ✅

export const Quiz = () => {
    const [quiz, setQuiz] = useState<{question: string, answer: number} | null>(null);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [operation, setOperation] = useState<'+' | '-'>('+');
    const [answerValue, setAnswerValue] = useState<string | number>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [leftTime, setLeftTime] = useState<number>(10);
    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [questionCount, setQuestionCount] = useState<number>(0);

    const madeQuestion = useCallback (() => {
        const num1 = Math.floor(Math.random() * 101);
        const num2 = Math.floor(Math.random() * 101)
        const question = `${num1} ${operation} ${num2}`;
        const answer = operation === '+' ? num1 + num2 : num1 - num2 
        return {question, answer};
    }, [operation])

    useEffect(() => {
        setQuiz(madeQuestion())
    }, [madeQuestion])

    const handleToggle = () => {
        setShowDropDown((prev) => !prev);
    }

    const handleClose = () => {
        setShowDropDown(false);
    }

    const isCollect = useMemo(() => {
        return Number(answerValue) === quiz?.answer
    }, [answerValue, quiz]);

    const handleSubmit = () => {
        if (gameOver) return;

        if (isCollect) {
            setScore((prev) => prev + 100)
        } else {
            alert('오답입니다')
        }

        const nextCount = questionCount + 1;
        if (nextCount >= 10) {
            setGameOver(true);
            clearInterval(timeRef.current!);
        } else {
            setQuiz(madeQuestion());
            setAnswerValue('');
            setQuestionCount(nextCount);
            setLeftTime(10);
            inputRef.current?.focus();
        }
    }

    const handleKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    useEffect(() => {
        if (gameOver) return;
    
        setLeftTime(10);
        timeRef.current = setInterval(() => {
            setLeftTime((prev) => {
                if (prev === 1) {
                    clearInterval(timeRef.current!);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);

        return () => {
            clearInterval(timeRef.current!)
        }
    }, [quiz, gameOver])

    const resetGame = () => {
        setScore(0);
        setQuestionCount(0);
        setGameOver(false);
        setAnswerValue('');
        setLeftTime(10);
        setQuiz(madeQuestion());
        inputRef.current?.focus();
    };

    return (
        <Wrapper>
            <h1>문제</h1>
            <DropDownWrapper>
                <p onClick={handleToggle} style={{fontWeight: 700, cursor: 'pointer'}}>타입</p>
                {showDropDown && (
                    <DropDown onSelect={setOperation} onClose={handleClose}/>
                )}
            </DropDownWrapper>
            <h3>{quiz?.question ?? '문제 생성중 ...'}</h3>
            <input ref={inputRef} onKeyDown={handleKeyboard} value={answerValue} onChange={(e) => setAnswerValue(e.target.value)} type="text" placeholder="정답 입력"/>
            {!gameOver ? (
                <DetailWrapper>
                    <p>남은 시간: {leftTime}</p>
                    <p>점수: {score}</p>
                </DetailWrapper>
            ) : (
                <ResultWrapper>
                    <p>최종 점수: {score}</p>
                    <button onClick={resetGame}>다시 시작</button>
                </ResultWrapper>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > input {
        width: 300px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 30px;
        box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.1);
        padding: 5px 15px 5px 15px;
        margin-bottom: 30px;
    }
`;

const DropDownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

const DetailWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;