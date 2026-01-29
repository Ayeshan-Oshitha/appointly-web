import { useState } from "react";
import InputField from "./components/shared/InputField";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <p className="text-2xl text-center mt-20">Welcome to Appointly</p>
      <InputField
        label="Email"
        type="email"
        value={name}
        onChange={setName}
        placeholder="Enter your email"
      />
    </>
  );
}

export default App;
