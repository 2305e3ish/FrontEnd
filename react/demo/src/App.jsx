//functional component
//entitlement,roles,tokens
//jsx - javascript xml
import "./App.css";
import {useState} from "react";
const App = () => {
  const [val1,setval1] = useState("")
  const [val2,setval2] = useState("")
  const [result,setResult] = useState(null)
  const handleAdd = () => {
    setResult(parseInt(val1)+parseInt(val2))
  }
    return (

        <div>
            <h1>My React App!</h1>
            <input type="text" placeholder="number1" onChange={(e)=> setval1(e.target.value)}/>
            <input type="text" placeholder="number2" onChange={(e)=> setval2(e.target.value)}/>
            <button onClick={handleAdd}>+</button>
            <p>Result:{result}</p>    
        </div>
    );
}
export default App;
