import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function TodoList() {
  const [addTodo, setAddTodo] = useState<string>("");
  const [todos, setTodos] = useLocalStorage<{id: number, content: string, complete: boolean}[]>("todo", []);

  const handleAddButton = () => {
    if (addTodo.trim() === "") return;

    const newTodo = {id: Date.now(), content: addTodo, complete: false};
    setTodos([...todos, newTodo]);

    setAddTodo('');
  }

  const handleDeleteButton = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleToggleButton = (id: number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, complete: !todo.complete} : todo
      )
    )
  }

  return (
    <Wrapper>
      <h1>TODO</h1>
      <InputWrapper>
        <input type="text" placeholder='할 일을 입력하세요' value={addTodo} onChange={(e) => setAddTodo(e.target.value)}/>
        <button onClick={handleAddButton}>추가</button>
      </InputWrapper>
      <ContentWrapper>
        {todos.map((todo) => (
          <TodoListWrapper key={todo.id}>
            <Todo $complete={!todo.complete}>{todo.content}</Todo>
            <ButtonWrapper>
              <CheckBox checked={todo.complete} type='checkbox' onClick={() => handleToggleButton(todo.id)} />
              <button onClick={() => handleDeleteButton(todo.id)}>삭제</button>
            </ButtonWrapper>
          </TodoListWrapper>
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 50px;
    font-weight: 800;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  > input {
    box-shadow: 0px 4px 10px 4px rgba(0,0,0,0.1);
    border: none;
    outline: none;
    width: 500px;
    height: 40px;
    border-radius: 30px;
    padding: 0px 30px 0px 30px;
    font-size: 15px;
    font-weight: 500;
  }
  > button {
    width: 60px;
    height: 40px;
    border: none;
    background-color: black;
    border-radius: 10px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const TodoListWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 650px;
  justify-content: space-between;
`;

const Todo = styled.p<{$complete: boolean}>`
  font-size: 15px;
  font-weight: 600;
  text-decoration: ${({$complete}) => $complete ? "none" : "line-through"};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  > button {
    width: 60px;
    height: 40px;
    border: none;
    background-color: red;
    border-radius: 10px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;