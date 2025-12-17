import z from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChangeEvent, FormEvent, startTransition, useState, useTransition } from "react";
import { Address } from "@/types/address";
import { Input } from "../ui/input";

const schema=z.object({
    zipcode:z.string().min(1,{message:"Cep e obrigatorio"}),
    street:z.string().min(1,{message:"Edereço obrigatorio"}),
    number:z.string().min(1,{message:'Numero obrigatrio'}),
    city:z.string().min(1,{message:"Cidade obrigatorio"}),
    state:z.string().min(1,{message:"Estado obrigatorio"}),
    country:z.string().min(1,{message:"Pais obrigatorio"}),
    complement:z.string().optional()
})

type Props = {
  opened: boolean;
  onClose: () => void;
  onAdd:(address:Address)=>Promise<void >
};
export const AddRessModal = ({ opened, onClose,onAdd }: Props) => {
  let emptyAddress:Address={zipcode:'',street:'',number:'',city:'',state:'',country:'',complement:''}
  
    const [form,setForm]=useState<Address>(emptyAddress);
    const [error,setError]=useState('')
    const [pending,setPending]=useTransition();

  if (!opened) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault()
    const result= schema.safeParse(form)
    if(!result.success){
      setError(result.error.issues[0]?.message || 'Preencha todos os campos')
    }
    setError('');
    startTransition(async () =>{
      try{
        await onAdd(form )
        setForm(emptyAddress)
      }catch(err:any){
        setError(err?.message || 'Erro ao salvar endereço')
      }
    })
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-black/90 z-50">
      <div className="bg-white p-2 rounded w-full max-w-md">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl font-bold  flex  items-center">Adicionar endereço</CardTitle>
            <CardAction onClick={onClose} className="cursor-pointer text-xl" >X</CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input type="text" name="zipcode" className="p-5" placeholder="Digite o cep" value={form.zipcode} onChange={handleChange} disabled={pending}/>
              <Input type="text" name="street" className="p-5" placeholder="Digite a rua" value={form.street} onChange={handleChange} disabled={pending}/>
              <Input type="text" name="number"  className="p-5" placeholder="Digite o numero" value={form.number} onChange={handleChange} disabled={pending}/>
              <Input type="text" name="city" className="p-5"  placeholder="Digite a cidade" value={form.city} onChange={handleChange} disabled={pending}/>
               <Input type="text" name="state" className="p-5"  placeholder="Digite o estado" value={form.state} onChange={handleChange} disabled={pending}/>
              <Input type="text" name="country" className="p-5" placeholder="Digite o pais" value={form.country} onChange={handleChange} disabled={pending}/>
              <Input type="text" name="complement" className="p-5" placeholder="Digite o complemento" value={form.complement} onChange={handleChange} disabled={pending}/>
              <Button type="submit" className="bg-black p-6" disabled={pending}>
               {pending ? 'Salvando' : 'Adicionar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
