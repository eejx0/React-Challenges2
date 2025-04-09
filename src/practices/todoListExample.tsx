import { useState } from "react";
import styled from "styled-components"

// 사용자가 input에 할 일을 입력하고 추가 버튼을 누르면 리스트에 추가
// 할 일 옆에 삭제 버튼이 있어서 누르면 해당 항목이 삭제됨
// 리스트는 화면에 전부 표시되고, 최신 항목이 위에 오도록 정렬
// React로 작성 (Hooks 사용, 함수형 컴포넌트)
// CSS는 최소한만 써도 됨 (스타일은 중요 X)

export const Example = () => {
    const [addTodo, setAddTodo] = useState<string>(""); // addTodo는 추가할 할 일을 나타내고 setAddTodo로 상태를 업데이트 시켜줄 예정
    const [todos, setTodos] = useState<{id: number, content: string, complete: boolean}[]>([]); // todos에 id, content, complete값을 가진 객체를 넣고 배열로 만듦 -> 주로 할일 목록을 띄울 때 사용
    const [editId, setEditId] = useState<number | null>(0); // 수정할 값의 아이디를 이용
    const [editTodo, setEditTodo] = useState<string>("");

    const handleAddButton = () => {
        const newTodo = {id: Date.now(), content: addTodo, complete: false};
        // 새로운 할 일을 만들어주는데 id는 오늘 날짜, 내용은 addTodo로 바꿔주고 complete는 false로 초기화
        setTodos([newTodo, ...todos]);
        // todos를 업데이트 시켜주는 setTodos에 todos 배열을 들고오고 new Todo를 넣어 업데이트 (최신 것부터 정렿해야하니 newTodo를 앞으로)
        // -> setTodos((prev) => [newTodo, ...prev])같이 함수형 업데이트를 사용하면 항상 최신 값이 반영되기 때문에 이런식으로 코드를 작성하는 걸 추천
        // 지금처럼 직접 업데이트를 사용하면 최신값이 반영되지 않을 수 있음
        setAddTodo('')
        // input 초기화
    }

    const handleDeleteButton = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        // todos 배열을 filter를 사용해서 해당 아이디가 아닌 리스트들만 띄우는 형식으로 삭제 구현
    }

    const toggleButton = (id: number) => {
        // todos 배열을 순회하는데 todo.id가 id와 같을 때 complete값을 업데이트해줘야하니까 complete를 현재 값에서 반대 값으로 변환
        setTodos(
            todos.map((todo) => 
                todo.id === id ? {...todo, complete: !todo.complete} : todo
            )
        )
    }

    const handleEditButton = (id: number) => {
        setEditId(prev => (prev === id ? null : id));
        // setEditId로 값을 업데이트 해주는데 이 전의 값이 id와 같으면 null 반환, 다르면 id 반환
    };

    const handleSaveEdit = (id: number) => {
        // setTodos를 이용해서 상태 업데이트를 하는데, content값을 editTodo 값 즉 수정 인풋에 넣은 값으로 업데이트
        setTodos(
            todos.map((todo) => 
                todo.id === id ? {...todo, content: editTodo} : todo
            )
        )
        setEditId(null);
        setEditTodo('');
    }

    return (
        <Wrapper>
            <h3>Todolist</h3>
            <InputWrapper>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAddTodo(e.target.value)}}/>
                {/* onChange를 이용해 setAddTodo의 상태를 인풋에 적힌 문자열로 업데이트 */}
                <button onClick={handleAddButton}>추가</button>
            </InputWrapper>
            <ContentWrapper>
                {todos.map((todo) => (
                    <Content key={todo.id}>
                        {/* 수정할 아이디가 수정 버튼을 클릭한 Id와 같을 때만 input, 저장 버튼을 띄움 */}
                        {editId === todo.id ? (
                            <div>
                                <input 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveEdit(todo.id);
                                    }} 
                                    defaultValue={todo.content} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value)} type="text" 
                                />
                                <button onClick={() => handleSaveEdit(todo.id)}>저장</button>
                            </div>
                        ) : (
                            <>
                                <p>{todo.content}</p>
                                <input onClick={() => toggleButton(todo.id)} type="checkbox" checked={todo.complete}/>
                                <button onClick={() => handleDeleteButton(todo.id)}>삭제</button>
                                <button onClick={() => handleEditButton(todo.id)}>수정</button>
                            </>
                        )}
                        
                    </Content>
                ))}
            </ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;