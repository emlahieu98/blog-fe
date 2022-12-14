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
import { AiFillStar } from 'react-icons/ai'
import { IoMdStats } from 'react-icons/io'
import CounterInput from 'react-counter-input'
// import Tippy from '@tippyjs/react/headless'
import Loading from '../../Components/Loading/Loading'
const schema = yup.object({
    image_url: yup.mixed().required('Please upload image'),
    name: yup.string().required('Name must be filled out'),
    external_link: yup.string(),
    description: yup.string().required('Description must be filled out'),
})
export default function CreateNFTPage() {
    const [isMenu, setIsMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const { walletAddress, connect } = useWeb3Store()
    const [level, setLevel] = useState(1)
    const [stars, setStars] = useState(1)
    const navigation = useNavigate()
    const [preview, setPreview] = useState()
    const submitForm = async (data) => {
        try {
            if (data.image_url.length === 0) {
                toast.error('Please upload image')
                return
            }
            setIsLoading(true)
            const body = new FormData()
            body.append('file', data.image_url[0])
            const image = await UploadApi.singlePinataService(body)
            const image_url = `https://gateway.pinata.cloud/ipfs/${image.data.IpfsHash}`
            data.image_url = image_url
            data.wallet_address = walletAddress
            data.attributes = [
                {
                    trait_type: 'level',
                    value: level,
                },
                {
                    trait_type: 'stars',
                    value: stars,
                },
            ]
            await UserApi.createNFT(data)
            setIsLoading(false)
            setTimeout(() => {
                navigation(`/@${walletAddress}`)
            }, 1000)
            toast.success('Create new NFT success !')
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
                    className="w-full flex flex-col items-center justify-center h-full"
                >
                    {isLoading ? (
                        <Loading />
                    ) : (
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
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
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
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                        Name{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                        type="input"
                                        placeholder="Item name"
                                        {...register('name')}
                                        className="block border-[1px] w-full p-2 "
                                    />
                                    <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                        {errors.name?.message}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="pt-3 pb-3">
                                        External link{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                        type="input"
                                        {...register('external_link')}
                                        className="block border-[1px] w-full p-2"
                                        placeholder="http://example.com"
                                    />
                                    <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                        {errors.external_link?.message}
                                    </p>
                                </div>

                                <div className="flex w-full justify-center items-center">
                                    <div class="relative inline-block text-left pt-3 pb-3">
                                        <div>
                                            <div
                                                class="inline-flex rounded-md border border-gray-300 bg-white px-4 py-2  text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                                onClick={() =>
                                                    setIsMenu(!isMenu)
                                                }
                                            >
                                                Properties
                                                <svg
                                                    class="-mr-1 ml-2 h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                isMenu
                                                    ? 'absolute right-0 z-10 p-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div class="py-1 flex ">
                                                <div className="flex justify-center items-center">
                                                    <AiFillStar className="m-2" />
                                                </div>
                                                <div className="border">
                                                    <CounterInput
                                                        min={2}
                                                        max={5}
                                                        count={1}
                                                        onCountChange={(
                                                            count
                                                        ) => setLevel(count)}
                                                    />
                                                </div>
                                            </div>
                                            <div class="py-1 flex ">
                                                <div className="flex justify-center items-center">
                                                    <IoMdStats className="m-2" />
                                                </div>
                                                <div className="border">
                                                    <CounterInput
                                                        min={2}
                                                        max={5}
                                                        count={1}
                                                        onCountChange={(
                                                            count
                                                        ) => setStars(count)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="pt-3 pb-3">
                                        Description{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                        type="input"
                                        {...register('description')}
                                        className="block border-[1px] w-full p-2"
                                    />
                                    <p className="sm:ml-[-35%] pb-2 text-sm text-right text-red-500 font-medium">
                                        {errors.description?.message}
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
                    )}
                </form>
            </section>
        </MainLayout>
    )
}
