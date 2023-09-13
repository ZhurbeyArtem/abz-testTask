import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../../services/store";

interface User {
  id:number,
  name:string,
  email:string,
  password:string,
  avatar:string
}

interface Users {
  users: User[],
  count: number
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}/users` ,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAll: builder.query<Users, number>({
      query(limit){
        return {
          url:'',
          params: {
            limit,
          }
        }
      },
      providesTags: ['Users']
    }),

    generate: builder.mutation<string, void>({
      query() {
        return {
          url: '/generate',
          method: "POST"
        }
      },
      invalidatesTags: ['Users']
    }),
   
  })


})