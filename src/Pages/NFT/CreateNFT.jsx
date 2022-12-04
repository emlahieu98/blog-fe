import React, { useRef, useState } from 'react'
import 'react-markdown-editor-lite/lib/index.css'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { UploadApi } from 'Apis/UploadApi'
import axios from 'axios'
import { UserApi } from 'Apis/UserApi'
import { useNavigate } from 'react-router-dom'
import slug from 'slug'
import MainLayout from 'Layouts/HomeLayout'

export default function CreateNFTPage() {
    const navigation = useNavigate()
    const [preview, setPreview] = useState()
    const formData = useRef({
        title: '',
        content: '',
        image: '',
        tags: [],
        description: '',
        user_name: '',
    })

    const handlePreview = async (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        formData.current.image = e.target.files[0]
    }

    const handleEditorChange = ({ html, text }) => {
        console.log(text)
        formData.current.content = text
    }

    const handleChange = (newValue, actionMeta) => {
        formData.current.tags = newValue.map((val) => {
            return { label: val.label }
        })
    }
    const submitForm = async () => {
        try {
            const body = new FormData()
            body.append('file', formData.current.image)
            const image = await UploadApi.single(body)
            formData.current.image = image.url
            formData.current.slug = slug(formData.current.title)
            const result = await UserApi.addPost(formData.current)
            toast.success('Create new NFT success !')
            setTimeout(() => {
                navigation('/')
            }, 1000)
        } catch (error) {
            toast.error(error)
        }
    }
    const onImageUpload = async (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const body = new FormData()
                body.append('image', file)
                const result = await UploadApi.single(body)
                resolve(result.url)
            } catch (error) {
                reject(error)
            }
        })
    }

    return (
        <MainLayout>
            <section
                className={clsx('bg-white z-50 transition-all duration-700 ')}
            >
                <div className="container w-full h-full place-content-center mx-auto grid  sm:grid-cols-2 sm:gap-10 lg:gap-20 px-5 lg:px-10">
                    <input
                        type="file"
                        accept="image/*"
                        name=""
                        id="upload_image"
                        onChange={handlePreview}
                        className="hidden"
                    />
                    <div>
                        <h2 className="font-semibold text-lg pb-4">Preview</h2>
                        <label htmlFor="upload_image">
                            <div
                                className="bg-gray-100 px-10 pt-10 cursor-pointer bg-center bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${preview})` }}
                            >
                                {/* <img src={preview} alt='' /> */}
                                <p className="text-base text-center pb-5">
                                    Image{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <p className="text-center text-orange-500 pb-20">
                                    Choose your image
                                </p>
                            </div>
                        </label>
                        <div>
                            <p className="pt-3 pb-3">
                                Name <span className="text-red-500">*</span>
                            </p>
                            <div>
                                <input
                                    type="input"
                                    onChange={(e) => {
                                        formData.current.user_name =
                                            e.target.value
                                    }}
                                    placeholder="Item name"
                                    className="block border-[1px] w-full p-2 "
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="pt-3 pb-3">External link</p>
                            <input
                                type="input"
                                onChange={(e) => {
                                    formData.current.user_name = e.target.value
                                }}
                                className="block border-[1px] w-full p-2"
                            />
                        </div>
                        <div>
                            <p className="pt-3 pb-3">Description</p>
                            <input
                                type="input"
                                onChange={(e) => {
                                    formData.current.user_name = e.target.value
                                }}
                                className="block border-[1px] w-full p-2"
                            />
                        </div>
                        <button
                            className="text-white rounded-lg bg-green-600 py-2 px-4 mt-7"
                            onClick={submitForm}
                        >
                            Create NFT
                        </button>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
