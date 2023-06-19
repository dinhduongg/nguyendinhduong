'use client'

import Image from 'next/image'
import React from 'react'

interface result {
  title: string
  thumbnail: string
  price: number
  area: number
  city: string
  district: string
  content: string
}

type Props = {
    result: result
}

export default function ResultItem({ result }: Props) {
  return (
    <div className='flex items-center space-x-4 border p-2 text-base bg-red-50'>
        <div className='w-[450px] h-[200px]'>
            <Image src={result.thumbnail} alt={result.title} width={450} height={100} className='w-full h-full object-cover' />
        </div>
        <div className='space-y-1'>
            <h1 className='text-red-500 font-bold'>{result.title}</h1>
            <p className='text-green-500 font-semibold'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.price)} / tháng</p>
            <p className='text-gray-500'>Diện tích <span className='text-black font-bold'>{result.area}m2</span></p>
            <p className='text-gray-500'>{result.content}</p>
        </div>
    </div>
  )
}
