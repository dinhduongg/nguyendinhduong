'use client'

import data from '@/data/data.json'
import FilterBar from './components/FilterBar'
import ResultItem from './components/ResultItem'
import { useState } from 'react'
import CandleStickChart from './components/CandleStickChart'

interface searchValue {
  cityCode: string
  wardCode: string
  price: {
      from: number
      to: number
  }
  acreage: {
      from: number
      to: number
  }
}

interface result {
  title: string
  thumbnail: string
  price: number
  area: number
  city: string
  district: string
  content: string
}

export default function Home() {
  const [datas, setDatas] = useState<result[]>(data)

  const getData = (value: searchValue) => {
    let newData = data
    if (value.cityCode !== 'default' || value.acreage.to !== 0 || value.price.to !== 0 || value.wardCode !== 'default') {
      if (value.cityCode) {
        newData = newData.filter(data => data.city === value.cityCode.toString())
      }

      if (value.wardCode) {
        newData = newData.filter(data => data.district === value.wardCode.toString())
      }

      if (value.price) {
        newData = newData.filter(data => value.price.from < data.price && data.price < value.price.to)
      }

      if (value.acreage) {
        newData = newData.filter(data => value.acreage.from < data.area && data.area < value.acreage.to)
      }
    }

    setDatas(newData)
  }

  return (
    <div className='container mx-auto'>
      <FilterBar getData={getData} />
      <div className='w-2/4 mx-auto mt-10 space-y-2'>
        {
          datas.map((result, index) => {
            return <ResultItem key={index} result={result} />
          })
        }
        { datas.length === 0 && <div className='border p-4'>Không có kết quả được tìm thấy</div> }
      </div>
      <div>
        <CandleStickChart />
      </div>
    </div>
  )
}
