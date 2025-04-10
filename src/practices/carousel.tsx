import styled from "styled-components"
import test1 from "./assets/테스트1.jpg";
import test2 from "./assets/테스트2.jpg";
import test3 from "./assets/테스트3.jpg";
import test4 from "./assets/테스트4.jpg";
import test5 from "./assets/테스트5.jpg";
import { useEffect, useState } from "react";

// 좌우 화살표로 이미지 넘기기
// 현재 인덱스 표시 (예: 2 / 5)
// 이미지 배열은 미리 준비된 5개 mock 이미지 URL
// 애니메이션은 없어도 됨, 핵심은 상태 관리!

export const Carousel = () => {
    const imgs = [test1, test2, test3, test4, test5];
    const imgNum = imgs.length;
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleRightClick = () => {
        if (currentIndex < imgNum - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handleLeftClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imgs.length);
        }, 3000)
        return () => clearInterval(interval);
    }, [])
    
    return (
        <Wrapper>
            <ContentWrapper>
                <button onClick={handleLeftClick}>&lt;</button>
                <Image src={imgs[currentIndex]} alt="" />
                <button onClick={handleRightClick}>&gt;</button>
            </ContentWrapper>
            <p>{currentIndex + 1}/{imgNum}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
        margin-top: 10px;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    > button {
        background-color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }
`;

const Image = styled.img`
    display: flex;
    width: 500px;
    height: 400px;
`;