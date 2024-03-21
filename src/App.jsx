import { useState, useCallback, useEffect , useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const[number, setNumber]  = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  //useRef
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() =>  {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(number){
      str+="0123456789"
    }
    if(charAllowed){
      str+="@$%&*!~"
    }
    for (let i = 1; i <= length; i++){
     let char = Math.floor(Math.random() * str.length+1)
     pass+= str.charAt(char)
1     
    }

    setPassword(pass)

  }, [length,number,charAllowed , setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },  [length, number, charAllowed, passwordGenerator])
 
  return (
    <>
      <h1 className='text-4xl text-white text-center py-5 px-5'> Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-7  py-5 my-8 text-orange-500 bg-gray-500'> 
       <div className='flex shadow rounded-lg overflow-hidden mb-6 mt-2'>
        <input 

        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        
        />
        <button 
        onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
       </div>
       <div className='flex text-sm gap-x-2 '>
        <div className='flex text-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'

        onChange={(e) => {setLength(e.target.value)}}
           />

          <label  className='font-semibold text-base text-red-800'>Length: {length}</label>


        </div>
        <div className='flex text-center gap-x-1'> 
        <input 
        type="checkbox" 
        defaultChecked = {number}
        id='numberInput'
        onChange={() => {
          setNumber((prev) => !prev);
        }}
        />
        <label className='font-semibold text-base text-red-800' htmlFor="numberInput">Number</label>
        </div>

        <div className='flex text-center gap-x-1'> 
        <input 
        type="checkbox" 
        defaultChecked = {charAllowed}
        id='characterInput'
        onChange={() => {
          setCharAllowed((prev) => !prev);
        }}
        />
        <label className='font-semibold text-base text-red-800' htmlFor="characterInput">Character</label>
        </div>
       </div>
      </div>
      
    </>
  )
}

export default App
