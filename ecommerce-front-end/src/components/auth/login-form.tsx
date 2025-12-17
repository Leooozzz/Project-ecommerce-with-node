"use client"
import { useAuthStore } from '@/stores/auth'
import { ChangeEvent, FormEvent, useState, useTransition } from 'react'
import z, { email } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { login } from '@/actions/login'
import { setAuthCookies } from '@/actions/set-auth-cookies'
import { redirect } from 'next/navigation'


const schema=z.object({
    email:z.email({message:"E-mail invalido"}),
    password:z.string().min(8,{message:"A senha deve ter no minimo 8 caracteres "})
})
type ErrorStructure={
    email?:string,
    password?:string,
    form?:string
}
export const LoginForm=()=>{
    const [form,setForm]=useState({email:'',password:''})
    const [error,setError]=useState<ErrorStructure>({});
    const [pending,startTransition]=useTransition()
    const authStore=useAuthStore(state=>state)

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setForm(form=>({...form,[e.target.name]:e.target.value}))
        setError(error=>({...error,[e.target.name]:undefined,form:undefined}))
    }

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        const result=schema.safeParse(form)
        if(!result.success){
            const fieldError:any={}
            result.error.issues.forEach(err=>{
                if(err.path[0]){
                    fieldError[err.path[0]]=err.message
                }
            })
            setError(fieldError)
            return
        }
        setError({})
        startTransition(async()=>{
            const res= await login(form)
            if(res.error){
                setError({form: res.error})

            }else if(res.token){
                await setAuthCookies(res.token)
                authStore.setToken(res.token)
                redirect('/')
            }
        })
    }

    return(
        <form onSubmit={handleSubmit} className='p-8 border border-gray-200 rounded-md '>
            <h2 className='text-2xl font-bold mb-4 flex justify-center items-center'>Login</h2>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>E-mail</label>
                    <Input type='email' name='email' value={form.email} onChange={handleChange} autoFocus className='w-full p-5' disabled={pending}/>
                    {error.email && <div className='text-red-500 text-sm mt-1'>{error.email}</div>}
            </div>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>Senha</label>
                    <Input type='password' name='password' value={form.password} onChange={handleChange} className='w-full p-5' disabled={pending}/>
                    {error.password && <div className='text-red-500 text-sm mt-1'>{error.password}</div>}
            </div>
            <Button type='submit' className='w-full bg-black text-white p-5' disabled={pending}>
            {pending ? 'Entrando...' : 'Entrar'}
            </Button>
            {error.form && <div className='text-red-500 text-sm mt-1'>{error.form}</div>}
            <Link href={'/register'} className='flex justify-center text-gray-400 text-sm mt-5'>Ainda não tem conta? Se cadastre</Link>
        </form>
    )
}