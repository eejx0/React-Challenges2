import { useState, useEffect } from "react";
import styled from "styled-components"

// 이름과 메시지를 입력하는 input 2개가 있어야 함
// 저장 버튼을 누르면 아래 리스트에 추가됨
// 방명록 항목에는: 이름 (굵게), 메시지, 등록 시간 (예: 2025-04-08 16:23)
// 삭제 버튼도 있어서 항목 삭제 가능
// 최신 등록된 게 위로 오도록
// 메시지 20자 이상이면 “너무 길어요!” 경고
// 삭제 시 "정말 삭제할까요?" 확인 모달 띄우기
// 이름을 안 썼으면 "이름을 입력해주세요" 알림 띄우기

// 1. 🔍 검색 기능
// 상단에 input 하나 추가해서, 이름이나 메시지 중에 해당 키워드가 포함된 항목만 보여주기
// 검색어가 없으면 전체 목록 보여줘야 함
// 2. 📅 정렬 기능 (최신순 / 오래된순 토글)
// "정렬" 버튼 추가
// 클릭하면 최신순 <-> 오래된순 토글되도록 (기본은 최신순)
// 3. 🎨 선택된 정렬 상태 표시
// 지금 어떤 정렬 상태인지 텍스트로 보여주기 (예: 정렬: 최신순)

export const GuestBook = () => {
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [infos, setInfos] = useState<{id: number, name: string, message: string, time: string | number}[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [filteredInfos, setFilteredInfos] = useState<{id: number, name: string, message: string, time: string | number}[]>([])
    const [sort, setSort] = useState<'new' | 'old'>('new');

    useEffect(() => {
        const sorted = infos
            .filter(info => info.name.includes(search) || info.message.includes(search)) 
            .sort((a, b) => sort === 'new' ? b.id - a.id : a.id - b.id);
        setFilteredInfos(sorted);
    }, [search, infos, sort]);

    const handleSaveButton = () => {
        if (name.trim() === "") {
            alert('이름을 입력해주세요');
            return;
        }
    
        const time = new Date().toLocaleString();
        const newInfo = { id: Date.now(), name, message, time };
        const newInfos = [newInfo, ...infos];
        setInfos(newInfos);
    
        const sorted = newInfos
            .filter(info => info.name.includes(search) || info.message.includes(search)) 
            .sort((a, b) => sort === 'new' ? b.id - a.id : a.id - b.id);
        setFilteredInfos(sorted);
    
        setName('');
        setMessage('');
    }

    const handleDeleteButton = (id: number) => {
        setDeleteId(id);
        setIsOpen(true);
    }

    const handleRealDelete = () => {
        if (deleteId !== null) {
            setInfos(infos.filter((info) => info.id !== deleteId))
            setIsOpen(false);
            setDeleteId(null);
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMessage = e.target.value
        if (newMessage.length <= 20) {
            setMessage(e.target.value);
        } else {
            alert('너무 길어요!');
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleFilter = () => {
        const newSort = sort === 'new' ? 'old' : 'new';
        setSort(newSort);

        const sortedList = [...infos]
            .filter(info => info.name.includes(search) || info.message.includes(search)) 
            .sort((a, b) => newSort === 'new' ? b.id - a.id : a.id - b.id);

        setFilteredInfos(sortedList);
    }

    return (
        <>
            <Wrapper>
                <DetailWrapper>
                    <p>검색: </p>
                    <input 
                        value={search} 
                        onChange={handleSearchChange} 
                        type="text" 
                    />
                    <button onClick={handleFilter}>정렬</button>
                </DetailWrapper>
                <p>{sort === 'new' ? '최신순' : '오래된순'}</p>
                <InputWrapper>
                    <p>이름: </p>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <p>메세지: </p>
                    <input value={message} onChange={handleMessageChange} type="text" />
                    <button onClick={handleSaveButton}>저장</button>
                </InputWrapper>
                <InfoListWrapper>
                    {filteredInfos.map((info) => (
                        <InfoList key={info.id}>
                            <p style={{fontWeight: 700}}>{info.name}</p>
                            <p>{info.message}</p>
                            <p>{info.time}</p>
                            <button onClick={() => handleDeleteButton(info.id)}>삭제</button>
                        </InfoList>
                    ))}
                </InfoListWrapper>
            </Wrapper>
            {isOpen &&
                <Modal>
                    <ModalBox>
                        <h3>정말 삭제할까요?</h3>
                        <ButtonWrapper>
                            <button onClick={() => setIsOpen(false)}>취소</button>
                            <button onClick={handleRealDelete}>삭제</button>
                        </ButtonWrapper>
                    </ModalBox>
                </Modal>
            }
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

const InfoListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 30px;
`;

const InfoList = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

const DetailWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;