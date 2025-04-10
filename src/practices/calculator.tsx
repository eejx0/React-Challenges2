import { useState } from "react"
import styled from "styled-components"

// 기본 사칙연산 가능: +, -, ×, ÷
// 숫자 버튼, 연산자 버튼, = 버튼, C 버튼(초기화)
// 버튼 누르면 위쪽에 입력값 및 결과가 보여야 함
// 상태 관리 잘해야 됨: 현재 입력값 / 이전값 / 연산자 등등

export const Calculator = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const operators = ['+', '-', 'x', '÷'] as const;
    const [currentValue, setCurrentValue] = useState<string>(''); // 화면에 보여지는 숫자 저장
    const [previousValue, setPreviousValue] = useState<string>(''); // 연산자 버튼을 누르면 여기로 옮겨서 저장
    const [operatorValue, setOperatorValue] = useState<'+' | '-' | 'x' | '÷' | null>(null); // 무슨 연산자가 선택되었는지 저장

    const handleNumberClick = (number: string) => {
        setCurrentValue((prev) => prev + number);
    }

    const handleOperatorClick = (operator: '+' | '-' | 'x' | '÷') => {
        setPreviousValue(currentValue);
        setOperatorValue(operator)
        setCurrentValue('');
    }

    const handleEqualsClick = () => {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

        if (isNaN(prev) || isNaN(current) || operatorValue === null) return;

        let result = 0;

        if (operatorValue === '+') {
            result = prev + current
        } else if (operatorValue === '-') {
            result = prev - current
        } else if (operatorValue === 'x') {
            result = prev * current
        } else if (operatorValue === '÷') {
            result = prev / current
        }

        setCurrentValue(result.toString());
        setPreviousValue('');
        setOperatorValue(null);
    }

    const handleResetClick = () => {
        setCurrentValue('');
        setPreviousValue('')
        setOperatorValue(null);
    }

    return (
        <Wrapper>
            <ValueWrapper>
                <Value>{currentValue}</Value>
            </ValueWrapper>
            <CalculatorButtonWrapper>
                <CalculatorNumbers>
                    {numbers.map((number) => (
                        <button key={number} onClick={() => handleNumberClick(number.toString())}>{number}</button>
                    ))}
                    <button onClick={handleResetClick}>C</button>
                    <button onClick={handleEqualsClick}>=</button>
                </CalculatorNumbers>
                <CalculatorOperators>
                    {operators.map((operator) => (
                        <button key={operator} onClick={() => handleOperatorClick(operator)}>{operator}</button>
                    ))}
                </CalculatorOperators>
            </CalculatorButtonWrapper>
        </Wrapper>
    )
} 

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
`;

const ValueWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
`;

const Value = styled.div`
    display: flex;
    align-self: flex-end;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
`;

const CalculatorButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const CalculatorNumbers = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
`;

const CalculatorOperators = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;