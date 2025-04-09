import styled from "styled-components"
import { useState } from "react";

export const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleLogoClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Wrapper $open={open}>
            <Logo onClick={handleLogoClick}/>
            <ListWrapper $open={open}>
                <span>누룽</span>
                <span>누룽이</span>
            </ListWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div<{$open: boolean}>`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    height: 100%;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.1);
    padding: 25px;
    box-sizing: border-box;
    width: ${({$open}) => $open ? "250px" : "100px"};
`;

const Logo = styled.div`
    width: 50px;
    height: 50px;
    background-color: pink;
    border-radius: 10px;
    cursor: pointer;
`;

const ListWrapper = styled.div<{$open: boolean}>`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    gap: 10px;
    > span {
        display: ${({$open}) => $open ? "" : "none"};
    }
`;