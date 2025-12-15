"use client"

import Image from "next/image"
import { useState } from "react"

type Props ={
    images:string[]
}
export const ImageSlider = ({images}:Props) =>{
    const [selectedImageIndex,setSelectedImageIndex]=useState(0)

    const handleTumbnailClick = (index:number)=>{
        setSelectedImageIndex(index)
    }

    return(
        <div className="max-w-sm mx-auto md:mx-0">
           <div className="border border-gray-300 p-3">
            <Image src={images[selectedImageIndex]} alt={""} width={400} height={400} className="max-w-full rounded-md"/>
           </div>
           <div className="grid grid-cols-4 gap-6 mt-8">
               {images.map((images,index)=>(
                <div key={index} 
                onClick={()=>handleTumbnailClick(index)}
                className={`cursor-pointer border rounded-md  ${index ===  selectedImageIndex ? 'border-black' : 'border-gray-400'}`}>
                    <Image src={images} alt={""} width={120} height={120} className="rounded-md" />
                </div>
               ))}
           </div>
        </div>
    )
}