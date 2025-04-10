import { useState } from "react";
import styled from "styled-components"

// 탭은 세 개: 공지사항, 과제, 자료실
// 각각 탭을 클릭하면 아래에 해당 내용 렌더링
// 클릭한 탭은 스타일 강조
// 상태 관리는 useState 사용

export const Tap = () => {
    const [activeTap, setActiveTap] = useState<'공지사항' | '과제' | '자료실'>('공지사항');

    const handleClick = (tap: '공지사항' | '과제' | '자료실') => {
        setActiveTap(tap);
    }

    const taps = ['공지사항', '과제', '자료실'] as const;

    return (
        <Wrapper>
            <TapWrapper>
                {taps.map((tap) => (
                    <Menu key={tap} $isActive={activeTap === `${tap}`} onClick={() => handleClick(tap)}>{tap}</Menu>
                ))}
            </TapWrapper>
            {activeTap === '공지사항' && <Content>공지사항 내용</Content>}
            {activeTap === '과제' && <Content>과제 내용</Content>}
            {activeTap === '자료실' && <Content>자료실 내용</Content>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TapWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

const Menu = styled.p<{$isActive: boolean}>`
    cursor: pointer;
    font-weight: ${({$isActive}) => $isActive ? 700 : 500};
`;

const Content = styled.p`
    margin-top: 30px;
`;