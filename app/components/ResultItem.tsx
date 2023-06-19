'use client'

import { getWardName, vietnameseCurrency } from '@/lib/util'
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
        <div className='space-y-2'>
            <h1 className='text-red-500 font-bold'>{result.title}</h1>
            <p className='text-green-500 font-semibold text-lg'>{vietnameseCurrency(result.price)} / tháng</p>
            <div className='text-gray-500 flex space-x-3'>
              <div className='space-x-1'>
                <span>Diện tích</span>
                <span className='text-black font-bold'>{result.area}m2</span>
              </div>
              <div className='space-x-1'>
                <span>Khu vực</span>
                <span className='text-blue-500 font-bold'>{getWardName(result.district)}</span>
              </div>
            </div>
            <p className='text-gray-500'>{result.content}</p>
        </div>
    </div>
  )
}
