import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router";
import './main.css'

// Decided to created a variable outside the Main react component to serve
// as a structure for the inputs I'd have for the form
const bone = {
    name : '',
    email : '',
    password : '',
    occupation : '',
    state : ''
}

export default function Main(props){
    const [values, setValues] = useState(bone)
    // React state below will only serve to prevent a memory leak in useEffect when retreiving data from API endpoint
    // eslint-disable-next-line
    const [retrieved,setRetrieved] = useState(false)

    // React state below serves to hold the data that is retrieved
    const [apiInfo,setApiInfo] = useState({
        occupations : [],
        states : []
    })
    
    // React state below serves soley for determining if any form input is missing at time of submission
    const [missing,setMissing] = useState(false)
    
    useEffect(()=>{
        // Here we fetch the data from the api and save them in their appropriate states
        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(res=>res.json())
        .then(res=>{
            setApiInfo({occupations:res.occupations,states:res.states})
        })
        // To prevent a memory leak
        return () => {
            setRetrieved(true)
        }

    },[])

    // console.log(retrieved)

    const navigate = useNavigate()

    // This handles the changes in the form and updates them to our appropriate state
    const handleChange = e => {
        setValues((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    // This functions handles sumbit and first tests if all inputs are filled and if not prevents user from submitting
    // Other than than we conduct once again another Fetch but this time we POST onto the api endpoint
    const handleSumbit = (e) => {
        e.preventDefault()
        // console.log(values)
        if(validateInputs(values) === false){
            setMissing(true)
            setTimeout(()=>{
                setMissing(false)
            },2000)
        }else{
            fetch('https://frontend-take-home.fetchrewards.com/form',{
                method: 'POST',
                body:JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                // console.log(res.status)
                // In the case we have succesfully sumbited the form we are redirected to the success page and pass along the values from our state
                // Also we set our react states to their initial values
                if(res.status === 200){
                    navigate('/success',{
                        state: {values}
                    })
                    setValues(bone)
                    setMissing(false)
                }else{
                    console.log('unsucessful')
                }
            })
        }
    }

    // Basic validation check to see if all inputs are filled
    const validateInputs = (uno) => {
        for(let item in uno){
            if(uno[item] === ''){
                return false
            }
        }
        return true
    }

    return (
        <>
            <h1>Simple Sign Up Form</h1>
            <form id='form' onSubmit={handleSumbit}>
                <label>Full Name:</label>
                <input placeholder='Full Name' name='name' onChange={handleChange} value={values.name || ''} />

                <label>Email:</label>
                <input placeholder='Email' type='email' onChange={handleChange} value={values.email || ''} name='email' />

                <label>Password:</label>
                <input placeholder='Password' onChange={handleChange} value={values.password || ''} name='password' />

                <label>Occupation:</label>

                <select onChange={handleChange} value={values.occupation} name='occupation' >
                    <option value='' disabled hidden>Please Choose An Occupation</option>
                    {apiInfo.occupations.map((item)=>(
                        <option value={item} key={item}>{item}</option>
                    ))}
                </select>

                <label>State:</label>
                <select  onChange={handleChange} value={values.state} name='state' >
                    <option value='' disabled hidden>Please Choose An State</option>
                    {apiInfo.states.map((item)=>(
                        <option value={`${item.name} ${item.abbreviation}`} key={item.name}>{item.name} : {item.abbreviation} </option>   
                    ))}
                </select>
                <br />
                <input value='submit' type='submit' id='submit'></input>
                {missing === false ? '' : <h5 id='missing'>Missing Input : Please Complete Form To Submit!</h5>}
            </form>
        </>
    )
}