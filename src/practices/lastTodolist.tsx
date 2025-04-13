import { useState } from "react";
import styled from "styled-components"
import { useLocalStorage2 } from "./hooks/useLocalStorage2";

// 사용자가 input에 할 일을 입력하고 추가 버튼을 누르면 리스트에 추가
// 할 일 옆에 삭제 버튼이 있어서 누르면 해당 항목이 삭제됨
// 리스트는 화면에 전부 표시되고, 최신 항목이 위에 오도록 정렬
// React로 작성 (Hooks 사용, 함수형 컴포넌트)
// CSS는 최소한만 써도 됨 (스타일은 중요 X)

export const LastTodolist = () => {
    const [addTodo, setAddTodo] = useState<string>('');
    const [todos, setTodos] = useLocalStorage2<{id: number, content: string, isCheck: boolean}[]>("todo", []);

    const handleAddButton = () => {
        if (!addTodo.trim()) return;

        const newTodo = {id: Date.now(), content: addTodo, isCheck: false};
        setTodos([newTodo, ...todos]);
        setAddTodo('');
    }

    const handleDeleteButton = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleToggleButton = (id: number) => {
        setTodos(
            todos.map((todo) => 
                todo.id === id ? {...todo, isCheck: !todo.isCheck} : todo
            )
        )
    }

    return (
        <Wrapper>
            <h1>TODO List</h1>
            <InputWrapper>
                <input value={addTodo} onChange={(e) => setAddTodo(e.target.value)} type="text" placeholder="할 일을 입력하세요"/>
                <button onClick={handleAddButton}>추가</button>
            </InputWrapper>
            <ListWrapper>
                {todos.map((todo) => (
                    <ContentWrapper key={todo.id}>
                        <p>{todo.content}</p>
                        <input onClick={() => handleToggleButton(todo.id)} checked={todo.isCheck} type="checkbox" />
                        <button onClick={() => handleDeleteButton(todo.id)}>삭제</button>
                    </ContentWrapper>
                ))}
            </ListWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;