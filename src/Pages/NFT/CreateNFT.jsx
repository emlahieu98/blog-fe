import React, { useRef, useState } from 'react'
import 'react-markdown-editor-lite/lib/index.css'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { UploadApi } from 'Apis/UploadApi'
import { useWeb3Store } from '../../store/web3Store'
import { UserApi } from 'Apis/UserApi'
import { useNavigate } from 'react-router-dom'
import MainLayout from 'Layouts/HomeLayout'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const schema = yup.object({
    image_url: yup.mixed().required('Please upload image'),
    name: yup.string().required('Name must be filled out'),
    external_link: yup.string().required('External link must be filled out'),
    description: yup.string().required('Description must be filled out'),
    // attributes: yup.array(),
})
export default function CreateNFTPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const { walletAddress, connect } = useWeb3Store()
    const navigation = useNavigate()
    const [preview, setPreview] = useState()
    console.log('errors', errors)
    const submitForm = async (data) => {
        try {
            const body = new FormData()
            body.append('file', data.image_url[0])
            const image = await UploadApi.singlePinataService(body)
            const image_url = `https://gateway.pinata.cloud/ipfs/${image.data.IpfsHash}`
            data.image_url = image_url
            data.wallet_address = walletAddress
            data.attributes = []
            const result = await UserApi.createNFT(data)
            toast.success('Create new NFT success !')
            setTimeout(() => {
                navigation('/')
            }, 1000)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <MainLayout>
            <section
                className={clsx('bg-white z-50 transition-all duration-700 ')}
            >
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="w-full flex flex-col items-center"
                >
                    <div className="container w-full h-full place-content-center mx-auto grid  sm:grid-cols-2 sm:gap-10 lg:gap-20 px-5 lg:px-10">
                        <input
                            type="file"
                            accept="image/*"
                            name=""
                            id="upload_image"
                            className="hidden"
                            {...register('image_url', {
                                onChange: (e) => {
                                    setPreview(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                },
                            })}
                        />

                        <div>
                            <h2 className="font-semibold text-lg pb-4">
                                Preview
                            </h2>
                            <label htmlFor="upload_image">
                                <div
                                    className="bg-gray-100 px-10 pt-10 cursor-pointer bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${preview})`,
                                    }}
                                >
                                    <p className="text-base text-center pb-5">
                                        Image{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <p className="text-center text-orange-500 pb-20">
                                        Choose your image
                                    </p>
                                </div>
                            </label>
                            <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                {errors.file?.message}
                            </p>
                            <div>
                                <p className="pt-3 pb-3">
                                    Name <span className="text-red-500">*</span>
                                </p>
                                <div>
                                    <input
                                        type="input"
                                        placeholder="Item name"
                                        {...register('name')}
                                        className="block border-[1px] w-full p-2 "
                                    />
                                </div>
                                <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                    {errors.name?.message}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="pt-3 pb-3">External link</p>
                                <input
                                    type="input"
                                    {...register('external_link')}
                                    className="block border-[1px] w-full p-2"
                                />
                                <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                    {errors.external_link?.message}
                                </p>
                            </div>
                            <div>
                                <p className="pt-3 pb-3">Description</p>
                                <input
                                    type="input"
                                    {...register('description')}
                                    className="block border-[1px] w-full p-2"
                                />
                                <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                    {errors.description?.message}
                                </p>
                            </div>
                            <div>
                                <p className="pt-3 pb-3">Properties</p>
                                <input
                                    type="input"
                                    {...register('attributes')}
                                    className="block border-[1px] w-full p-2"
                                />
                                <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                    {errors.attributes?.message}
                                </p>
                            </div>
                            <>
                                {walletAddress ? (
                                    <button
                                        className="text-white rounded-lg bg-green-600 py-2 px-4 mt-7"
                                        type="submit"
                                    >
                                        Create NFT
                                    </button>
                                ) : (
                                    <button
                                        className="text-white rounded-lg bg-green-600 py-2 px-4 mt-7"
                                        type="button"
                                        onClick={connect}
                                    >
                                        Connect wallet
                                    </button>
                                )}
                            </>
                        </div>
                    </div>
                </form>
            </section>
        </MainLayout>
    )
}
