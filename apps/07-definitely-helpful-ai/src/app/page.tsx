import Chat from "./components/Chat";

export default function Home() {
  return (
    <>
      <header className="header">
        <h1>Definitely Helpful AI</h1>
      </header>
      <main>
        <Chat />
      </main>
    </>
  );
}
