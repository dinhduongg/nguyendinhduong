import quanHuyen from '@/data/quan_huyen.json'

export const getWardName = (code: string) => {
    const wards = []

    for (const [key, value] of Object.entries(quanHuyen)) {
        wards.push(value)
    }

    const ward = wards.find(w => w.code === code)

    return ward?.path_with_type
}

export const vietnameseCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
}