import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [passwordLength, setPasswordLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+'

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length) + 1
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [passwordLength, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [passwordLength, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <h1 className='text-3xl text-white'>Password Generator</h1>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-800'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={passwordLength}
              className='cursor-pointer'
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <label className='text-orange-500'>Length: {passwordLength}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              id='numberInput'
              defaultChecked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              id='charInput'
              defaultChecked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
