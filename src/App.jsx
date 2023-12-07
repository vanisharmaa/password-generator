import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 35%;
  text-align: center;
  padding: 1rem;
  margin: 1rem;
  position: absolute;
  top: 40%;
  left: 32%;
  border-radius: 5px;
`
const StyledTextInput = styled.input`
  width: 80%;
  padding: 0.25rem 0.5rem;
  border-radius: 5px 0 0 5px;
  margin-bottom: 1rem;
  /* color: ; */
  background-color: antiquewhite;
`
const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
  width: 20%;
  margin-bottom: 1rem;
  background-color: #006bcf;
  color: #fff;
  border-radius: 0 5px 5px 0;
`
const StyledRange = styled.input`
  padding: 0 0.5rem;
  cursor: pointer;
`

const StyledLabel = styled.label`
  margin: 0 1rem 0 0.5rem;
`

const StyledCheckbox = styled.input`
  cursor: pointer;
`
function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass="";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}|:<>?_+-=[]\\;',./";
    for(let i = 0; i < length; i++){
      const ind = Math.floor(Math.random()*str.length);
      pass+=str[ind];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]) // setPassword for optimization

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length); // by default it will select from 0 to length only
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator]) // passwordGenerator for optimization

  return (
    <>
      <StyledDiv className="bg-gray-800 text-orange-500">
          <h1 className='text-2xl mb-3 text-orange'>Password Generator</h1>

          <div>
            <StyledTextInput type="text" value={password} placeholder='password' ref={passwordRef}/>
            <StyledButton onClick={copyPasswordToClipboard}>copy</StyledButton>
          </div>

          <div>
            <StyledRange type="range" min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <StyledLabel>Length({length})</StyledLabel>
            <StyledCheckbox type="checkbox" name="numbers" onChange={()=>{setNumberAllowed((prevState)=>!prevState)}} />
            <StyledLabel>Numbers</StyledLabel>
            <StyledCheckbox type="checkbox" name="characters" onChange={()=>{setCharAllowed((prevState)=>!prevState)}}/>
            <StyledLabel>Characters</StyledLabel>
          </div>
      </StyledDiv>
    </>
  )
}

export default App
