import { useState, useRef, useCallback } from 'react'
import { ToastContainer, toast, Bounce, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = '!@#$%^&*(){}[]/._-=+%'


function App() {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const passwordRef = useRef(null);

  const notify = useCallback((message, hasError = false) => {

    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } else {
      toast.success('Password copied to clipboard!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
    }

  }, [])


  //callback function to handle the generation of the password
  const handleGeneratePassword = useCallback(() => {
    //if no option are selected, show an error notification
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must select at least one option', true)
      return
    }
    //initialize an empty character list
    let characterList = ''
    //add selected character sets to the empty character list
    if (includeUppercase) {
      characterList += upperCaseLetters
    } if (includeLowercase) {
      characterList += lowerCaseLetters
    } if (includeNumbers) {
      characterList += numbers
    } if (includeSymbols) {
      characterList += specialCharacters
    }

    //genetate the password and update the state
    setPassword(createPassword(characterList))
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordLength, notify])
  //function to generate password of the 
  const createPassword = useCallback((characterList) => {
    let password = ''
    const characterListLength = characterList.length
    //randomly select characters 
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength)
      password += characterList.charAt(characterIndex)
    }
    return password
  }, [passwordLength])

  //callback function to copy the clipboard password to the cliboard using useRef
  const copyToClipboard = useCallback(() => {
    //select the text in the input element using useRef
    passwordRef.current.select();
    passwordRef.current?.select()
    passwordRef.current?.setPasswordLength;
    window.navigator.clipboard.writeText(password);
    //show a success notification
    notify('password copied to clipboard')

  }, [password, notify])


  return (

    <div className='min-h-screen bg-[#09cfb588] flex justify-center items-center'>
      <div className='w-80'>
        <div className='bg-[#0c899a] rounded shadow-lg p-5 opacity-0.3'>
          <h2 className='text-center text-white mb-5'>Password Generator</h2>
          <div className='relative bg-[#000000] bg-opacity-25 p-3 text-white h-12 mb-4 '>
            <input
              type="text"
              ref={passwordRef}
              value={password}
              readOnly
              className='w-full bg-transparent border-none text-white outline-none cursor-default'
            />
            <button
              onClick={copyToClipboard}
              className='absolute bg-[#00fabb88] text-white border-none h-10 p-2 cursor-pointer top-1 right-1 '>
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Password-Length">PasswordLength</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id='Password Length'
              name='Password Strength'
              max='20'
              min='5'
              className='text-black w-16'
            />
          </div>
          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Include Uppercase Letters">Include Uppercase Letter</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id='Uppercase Letters'
              name='Uppercase Letters'
              className='text-black w-16'
            />
          </div>
          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Lowercase Letters">Include Lowercase Letter</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id='Lowercase Letters'
              name='Lowercase Letters'
              className='text-black w-16'
            />
          </div>
          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id='Numbers'
              name='Numbers'
              className='text-black w-16'
            />
          </div>
          <div className='flex justify-between text-white mb-4'>
            <label htmlFor="Symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id='Symbols'
              name='Symbols'
              className='text-black w-16'
            />
          </div>
          <button
            onClick={handleGeneratePassword}
            className='text-white bg-[#00fabb88] w-full p-2 text-lg cursor-pointer rounded'>
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
/>
        </div>
      </div>
    </div>
  )
}

export default App
