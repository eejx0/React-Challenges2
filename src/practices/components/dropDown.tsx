import styled from "styled-components"

interface DropDownType {
    onClose: () => void;
    onSelect: (op: '+' | '-') => void;
}

export const DropDown = ({onClose, onSelect}: DropDownType) => {
    const handleSelect = (op: '+' | '-') => {
        onSelect(op);
        onClose();
    }
    return (
        <Wrapper>
            <p onClick={() => handleSelect('+')}>덧셈</p>
            <Line />
            <p onClick={() => handleSelect('-')}>뺄셈</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 100%;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.1);
    > p {
        cursor: pointer;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.2);
`;