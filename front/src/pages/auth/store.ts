import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { User, IAuth } from "./interface"

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '${process.env.REACT_APP_BASE_URL}/auth' }),
  endpoints: (build) => ({
    login: build.mutation<User, IAuth>({
      query: (data) => ({
          url: '/log',
          method: "POST",
          body: data,
      })
    }),
    registration: build.mutation<User, any>({
      query(data) {
        return {
          url: '/reg',
          method: "POST",
          body: data,
        }
      }
    })


  })
})
