import { useEffect, useRef, useState } from "react";
import styled from "styled-components"

export const Chatting = () => {
    const [messages, setMessages] = useState<{type: 'user' | 'bot', text: string}[]>([]);
    const [input, setInput] = useState<string>("");
    const chatEndRef = useRef<HTMLDivElement>(null); 

    const botReplies = [
        '안녕하세요!',
        '무엇을 도와드릴까요?'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setMessages(prev => [...prev, {type: 'user', text: input}]);
            setInput('');
        }
    }

    const handleSendClick = () => {
        setMessages(prev => [...prev, {type: 'user', text: input}]);
        setInput('');
    }

    useEffect(() => {
        const last = messages[messages.length - 1];
        if (last?.type === 'user') {
            const timer = setTimeout(() => {
                const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
                setMessages(prev => [...prev, {type: 'bot', text: reply}])
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messages])

    useEffect(() => {
        chatEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return (
        <Wrapper>
            <ContentWrapper>
                {messages.map((msg, idx) => 
                    msg.type === 'user' ? (
                        <MyWrapper key={idx}>{msg.text}</MyWrapper>
                    ): (
                        <OtherWrapper key={idx}>{msg.text}</OtherWrapper>
                    )
                )}
                <div ref={chatEndRef} />
            </ContentWrapper>
            <InputWrapper>
                <input value={input} onKeyDown={handleKeyDown} onChange={handleInputChange} placeholder="답을 입력하세요"/>
                <button onClick={handleSendClick}>보내기</button>
            </InputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const ContentWrapper = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    > button {
        width: 5%;
        padding: 10px 15px 10px 15px;
        border-radius: 30px;
        border: none;
        background-color: #5353ff;
        color: white;
        cursor: pointer;
        font-weight: 700;
    }
    > input {
        width: 91%;
        padding: 10px 15px 10px 15px;
        border-radius: 30px;
        border: none;
        outline: none;
        box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.1);
    }
`;

const MyWrapper = styled.div`
    align-self: flex-end;
    padding: 10px 15px;
    border-radius: 20px;
    margin-bottom: 10px;
    background-color: #5353ff;
    color: white;
`;

const OtherWrapper = styled.div`
  align-self: flex-start;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  background-color: #eaeaea;
  color: black;
`;