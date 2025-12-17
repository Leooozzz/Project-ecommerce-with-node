"use client"
import { useAuthStore } from '@/stores/auth'
import { ChangeEvent, FormEvent, useState, useTransition } from 'react'
import z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { login } from '@/actions/login'
import { setAuthCookies } from '@/actions/set-auth-cookies'
import { redirect } from 'next/navigation'
import { register } from '@/actions/register'


const schema=z.object({
    name:z.string().min(2,{message:"Nome deve ter no minimo 2 caracteres"}),
    email:z.email({message:"E-mail invalido"}),
    password:z.string().min(8,{message:"A senha deve ter no minimo 8 caracteres "}),
    confirmPassword:z.string()

}).refine(data=> data.password === data.confirmPassword,{message:"As senhas não coincidem",path:['confirmPassword']})
type ErrorStructure={
    name?:string,
    email?:string,
    password?:string,
    confirmPassword?:string,
    form?:string
}
export const RegisterForm=()=>{
    const [form,setForm]=useState({name:'',email:'',password:'',confirmPassword:''})
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
            const res= await register(form)
            if(res.error){
                setError({form: res.error})

            }else {
                redirect('/login')
            }
        })
    }

    return(
        <form onSubmit={handleSubmit} className='p-8 border border-gray-200 rounded-md '>
            <h2 className='text-2xl font-bold mb-4 flex justify-center items-center'>Cadastro</h2>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>Nome</label>
                    <Input type='text' name='name' value={form.name} onChange={handleChange} autoFocus className='w-full p-5' disabled={pending}/>
                    {error.name && <div className='text-red-500 text-sm mt-1'>{error.name}</div>}
            </div>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>E-mail</label>
                    <Input type='email' name='email' value={form.email} onChange={handleChange}  className='w-full p-5' disabled={pending}/>
                    {error.email && <div className='text-red-500 text-sm mt-1'>{error.email}</div>}
            </div>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>Senha</label>
                    <Input type='password' name='password' value={form.password} onChange={handleChange} className='w-full p-5' disabled={pending}/>
                    {error.password && <div className='text-red-500 text-sm mt-1'>{error.password}</div>}
            </div>
            <div className='mb-4'>
                    <label htmlFor="" className='mb-1'>Confirmar senha</label>
                    <Input type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} className='w-full p-5' disabled={pending}/>
                    {error.confirmPassword && <div className='text-red-500 text-sm mt-1'>{error.confirmPassword}</div>}
            </div>
            <Button type='submit' className='w-full bg-black text-white p-5' disabled={pending}>
            {pending ? 'Cadastrar...' : 'Cadastrando'}
            </Button>
            {error.form && <div className='text-red-500 text-sm mt-1'>{error.form}</div>}
            <Link href={'/login'} className='flex justify-center text-gray-400 text-sm mt-5'>Ja tem conta? faça login!</Link>
        </form>
    )
}