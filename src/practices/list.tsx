import { useState } from "react";
import styled from "styled-components"

// 이름 입력 후 추가 버튼을 누르면 리스트에 이름이 추가됨
// 현재 입력된 이름 리스트를 가나다순으로 자동 정렬해서 보여줄 것
// 만약 같은 이름이 중복되면 추가되지 않도록 막을 것
// 입력창이 비어있거나 공백만 있을 때는 추가 안 되도록 처리

export const List = () => {
    const [name, setName] = useState<string>('');
    const [nameList, setNameList] = useState<{id: number, name: string}[]>([]);
    const [isSame, setIsSame] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleAddButton = () => {
        if (!name.trim()) return

        const isDuplicate = nameList.some((prop) => prop.name === name)
        if (isDuplicate) {
            setIsSame(true);
            return;
        } else {
            const newName = {name: name, id: Date.now()};
            setNameList([...nameList, newName].sort((a, b) => a.name.localeCompare(b.name)));
            setName('');
            setIsSame(false);
        }
    }

    return (
        <Wrapper>
            <InputWrapper>
                <input value={name} type="text" placeholder="이름을 입력하세요" onChange={handleInputChange} />
                {isSame && (<p>이미 있는 이름입니다</p>)}
                <button onClick={handleAddButton}>추가</button>
            </InputWrapper>
            {nameList.map((names) => (
                <p key={names.id}>{names.name}</p>
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;