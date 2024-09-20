import Image from "next/image";
import TodoList from './../components/TodoList/index';

export default function Home() {
  return (
    <div className="generalcontainer">
      <TodoList></TodoList>
    </div>
  );
}
