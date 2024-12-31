"use client"

import React, { useCallback, useState } from 'react'
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion'
import CustomInput from '@/components/CustomInput'
import HouseImgContainer from '@/components/InitHouseImage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'


export default function LoginPage() {
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const router = useRouter()

    // 클라이언트에서 input data 한 번 더 검증하기
    const validateFormData = () => {
        return formData.username.length > 3 && formData.password.length > 3
    }


    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateFormData()) {
            console.log(router)
            router?.push("/reservation")
        } else {
            alert('틀렸어요! 다시 시도해주세요')

            setFormData({
                username: '',
                password: '',
            })
        }
    }
    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }, [])

    return (
        <div className='h-screen flex-center'>
            <Header />
            <div className='flex-center relative'>
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -80 }}
                    transition={{
                        duration: 0.5,
                    }}
                    onAnimationComplete={() => setIsAnimationComplete(true)}
                >
                    <HouseImgContainer />
                </motion.div>


                {isAnimationComplete && (
                    <motion.form
                        onSubmit={formSubmitHandler}
                        initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1, y: 160 }}
                        transition={{ duration: 0.5 }}
                        className='absolute z-10 flex-center flex-col gap-5'
                    >
                        <CustomInput label='아이디' name='username'
                            value={formData.username}
                            onChange={onChangeHandler} />
                        <CustomInput label='패스워드'
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={onChangeHandler} />
                        <Button label='확인' type="submit" />
                    </motion.form>
                )}
            </div>
            <Footer />

        </div>

    )
}
