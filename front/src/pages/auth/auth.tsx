import { useState } from "react";

import { useDispatch, } from "react-redux";

import { StyledInput } from "../../components/input";
import { authApi } from "./store";
import { IAuth } from "./interface";
import { notify } from "../../hooks/notification";
import { Wrapper } from "../../components/wrapper";
import { StyledButton } from "../../components/btn";
import { setCredentials } from "../../services/userSlicer";
import { useNavigate } from "react-router-dom";


export const Auth = () => {
  const dispatch = useDispatch()
  const [logUser] = authApi.useLoginMutation()
  const [regUser] = authApi.useRegistrationMutation()
  const [page, setPage] = useState('log')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState('str')
  const navigate = useNavigate()
  const login = async (data: IAuth) => {
    const result: any = await logUser(data)
    if (result.error !== undefined) {
      notify(result.error.data.message)
      return;
    }
    dispatch(setCredentials({ token: result.data.token }))
    notify("Success")
    navigate('/links')
  }

  const registration = async (data: any) => {
    const formData = new FormData()

    formData.append('avatar', file)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const result: any = await regUser(formData)
    if (result.error !== undefined) {
      notify(result.error.data.message)
      return;
    }

    dispatch(setCredentials({ token: result.data.token }))
    notify("Success")
    navigate('/links')

  }

  return <Wrapper >
    {
      page === 'log' ? <>
        <StyledInput type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <StyledButton type="submit" onClick={() => login({ email, password })} >Login</StyledButton>
        <StyledButton type="submit" onClick={() => setPage('reg')} >On registration page</StyledButton>
      </>
        : <>
          <StyledInput type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <StyledInput type='text' onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <StyledInput type='file' name='avatar' onChange={(e:any) => setFile(e.target.files[0])} />
          <StyledButton type="submit" onClick={() => registration({ email, password, name })}>Registration</StyledButton>
          <StyledButton type="submit" onClick={() => setPage('log')} >On login page</StyledButton>

        </>
    }


  </Wrapper>;
}

