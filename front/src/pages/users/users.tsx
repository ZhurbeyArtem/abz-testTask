import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { notify } from '../../hooks/notification'
import { usersApi } from './store'
import { Wrapper } from '../../components/wrapper';
import { StyledList, StyledListItem } from '../../components/list';
import { BlinkingButton, CustomButtonProps, StyledButton, StyledDisabledButton } from '../../components/btn';
import { logOut } from '../../services/userSlicer';

export const UsersApp = () => {
  const [limit, setLimit] = useState(6)
  const { data: users, isLoading } = usersApi.useGetAllQuery(limit)
  const [generateLink] = usersApi.useGenerateMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state: any) => state.user);

  const generate = async () => {
    const result: any = await generateLink()
    if (result.error.data === 'success') {
      notify("Success")
      setLimit(limit + 45)
    }
    else if (result.error.status === 400) notify(result.error.data.message[0])
    else notify(result.error.data.message)
  }

  const CustomButton: React.FC<CustomButtonProps> = ({ currentLimit, onClick }) => {
   const count:any = users?.count
    if (currentLimit > count) {
      return <StyledDisabledButton>Load More</StyledDisabledButton>;
    }
    return <StyledButton onClick={onClick}>Load More</StyledButton>;

  };

  return (
    isLoading ? <div>Loading</div>
      :
      <>
        {isAuth ? <StyledButton onClick={() => {
          dispatch(logOut())
          navigate('/auth')
        }
        }>LogOut</StyledButton> : <BlinkingButton onClick={() => navigate('/auth')}> Login </BlinkingButton>}
        <Wrapper>
          {
            users?.users !== undefined ?
              <>
              <StyledButton onClick={generate}>Generate 45 users</StyledButton>
                <StyledList>
                  {users?.users.map((el: any) =>
                    <StyledListItem key={el.id}>
                      <img src={`${process.env.REACT_APP_BASE_URL}/${el.avatar}`}></img>
                      <p style={{ margin: '0 30px', width: "100px" }}>{el.name}</p>
                      <p>{el.email}</p>
                    </StyledListItem>
                  )}
                </StyledList>
                <CustomButton currentLimit={limit} onClick={() => setLimit(limit + 6)} />
              </>
              : <p>You need auth or here no data</p>
          }
        </Wrapper >
      </>

  )
}