'use client'

import React, { useEffect, useState } from 'react'

import city from '@/data/tinh_tp.json'
import ward from '@/data/quan_huyen.json'

interface city {
    name: string
    slug: string
    type: string
    name_with_type: string
    code: string
}

interface ward {
    name: string
    type: string
    slug: string
    name_with_type: string
    path: string
    path_with_type: string
    code: string
    parent_code: string
}

interface price {
    id: number
    from: number
    to: number
    label: string
}

interface acreage {
    id: number
    from: number
    to: number
    label: string
}

const prices: price[] = [
    { id: 1, from: 0, to: 1000000, label: 'Dưới 1 triệu' },
    { id: 2, from: 1000000, to: 2000000, label: 'Từ 1 triệu - 2 triệu' },
    { id: 3, from: 2000000, to: 3000000, label: 'Từ 2 triệu - 3 triệu' },
    { id: 4, from: 3000000, to: 5000000, label: 'Từ 3 triệu - 5 triệu' },
    { id: 5, from: 5000000, to: 7000000, label: 'Từ 5 triệu - 7 triệu' },
    { id: 6, from: 7000000, to: 10000000, label: 'Từ 7 triệu - 10 triệu' },
]

const acreages: acreage[] = [
    { id: 1, from: 0, to: 20, label: 'Dưới 20 m2' },
    { id: 2, from: 20, to: 30, label: 'Từ 20 m2 - 30 m2' },
    { id: 3, from: 30, to: 50, label: 'Từ 30 m2 - 50 m2' },
    { id: 4, from: 50, to: 60, label: 'Từ 50 m2 - 60 m2' },
    { id: 5, from: 60, to: 70, label: 'Từ 60 m2 - 70 m2' },
    { id: 6, from: 70, to: 80, label: 'Từ 70 m2 - 80 m2' },
]

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

type Props = {
    getData: (data: searchValue) => void
}

export default function FilterBar({ getData }: Props) {
    const [cities, setCities] = useState<city[]>([])
    const [wards, setWards] = useState<ward[]>([])
    const [searchValue, setSearchValue] = useState<searchValue>({
        cityCode: 'default',
        wardCode: 'default',
        price: {
            from: 0,
            to: 0
        },
        acreage: {
            from: 0,
            to: 0
        }
    })
    const [selectCity, setSelectCity] = useState<string>('')

    useEffect(() => {
        const cities = []

        for (const [key, value] of Object.entries(city)) {
            cities.push(value)
        }

        setCities(cities)
    }, [])

    useEffect(() => {
        const wards = []

        for (const [key, value] of Object.entries(ward)) {
            wards.push(value)
        }

        const newWards = wards.filter(ward => ward.parent_code === selectCity)
        setWards(newWards)
    }, [selectCity])

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectCity(e.target.value)
        setSearchValue((prev: searchValue) => ({
            ...prev,
            cityCode: e.target.value
        }))
    }

    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchValue((prev: searchValue) => ({
            ...prev,
            wardCode: e.target.value
        }))
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchValue((prev: searchValue) => ({
            ...prev,
            price: {
                from: +e.target.value.split('-')[0],
                to: +e.target.value.split('-')[1]
            }
        }))
    }

    const handleAcreageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchValue((prev: searchValue) => ({
            ...prev,
            acreage: {
                from: +e.target.value.split('-')[0],
                to: +e.target.value.split('-')[1]
            }
        }))
    }

    const handleSearch = () => {
        getData(searchValue)
    }

    return (
        <main className='container mx-auto'>
            <div className='flex space-x-4 justify-center py-4'>
                <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tỉnh thành phố</p>
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50' onChange={(e) => handleCityChange(e)} name="city" id="city">
                        <option value="default">Chọn thành phố</option>
                        {
                            cities.map((city: city) => {
                                return <option key={city.code} value={city.code}>{city?.name_with_type}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quận huyện</p>
                    <select disabled={!selectCity} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50' onChange={(e) => handleWardChange(e)} name="ward" id="ward">
                        <option value="default">{selectCity ? 'Chọn tỉnh' : 'Chọn thành phố trước'}</option>
                        {
                            wards.map((ward: ward) => {
                                return <option key={ward.code} value={ward.code}>{ward?.name_with_type}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khoảng giá</p>
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50' onChange={(e) => handlePriceChange(e)} name="ward" id="ward">
                        <option value="default">Chọn gía</option>
                        {
                            prices.map((price: price) => {
                                return <option key={price.id} value={price.from + '-' + price.to}>{price.label}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diện tích</p>
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50' onChange={(e) => handleAcreageChange(e)} name="ward" id="ward">
                        <option value="default">Chọn diện tích</option>
                        {
                            acreages.map((acreage: acreage) => {
                                return <option key={acreage.id} value={acreage.from + '-' + acreage.to}>{acreage.label}</option>
                            })
                        }
                    </select>
                </div>
                <button type='button' className='px-4 bg-orange-200 rounded hover:bg-orange-300 duration-150' onClick={handleSearch}>Lọc tin</button>
            </div>
        </main>
    )
}