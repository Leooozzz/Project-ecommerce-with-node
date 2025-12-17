"use server"

type loginData={
    email:string,
    password:string
}
export const login=async({email,password}:loginData):Promise<{error:string|null,token?:string}>=>{

    return {error:null,token:'exemplo'}

}