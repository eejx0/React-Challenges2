import { Route, Routes,BrowserRouter } from "react-router-dom";
import { InputPractice } from "./practices/hookPages/InputPractice";
import TodoList from "./practices/todolist";
import { LocalStoragePractice } from "./practices/localStoragePractice";
import { Sidebar } from "./practices/sideBar";
import { Debounce } from "./practices/hookPages/debounce";
import { Example } from "./practices/todoListExample";
import { GuestBook } from "./practices/guestBook";
import { Quiz } from "./practices/quiz";
import { Chatting } from "./practices/chatting";
import { List } from "./practices/list";
import { Tap } from "./practices/tap";
import { Timer } from "./practices/timer";
import { Carousel } from "./practices/carousel";
import { Calculator } from "./practices/calculator";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/useInput" element={<InputPractice />}/>
          <Route path="/todolist" element={<TodoList />}/>
          <Route path="/useLocalStorage" element={<LocalStoragePractice />}/>
          <Route path="/sidebar" element={<Sidebar />}/>
          <Route path="/useDebounce" element={<Debounce />}/>
          <Route path="/example" element={<Example />}/>
          <Route path="/guest" element={<GuestBook />}/>
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="/chat" element={<Chatting />}/>
          <Route path="/list" element={<List />}/>
          <Route path="/tap" element={<Tap />}/>
          <Route path="/timer" element={<Timer />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router