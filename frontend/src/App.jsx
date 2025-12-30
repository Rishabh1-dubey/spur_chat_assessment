import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <>
      <div className="h-screen bg-gray-100 mx-auto text-center pt-6 font-primary ">
        <h1 className="text-3xl font-semibold text-blue-500">
          Spur Assessment
        </h1>
        <div className="flex items-center justify-center mt-4">
          {" "}
          <ChatWindow />
        </div>
      </div>
    </>
  );
}

export default App;
