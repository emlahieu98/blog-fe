import DefaultLayout from 'Layouts/DefaultLayout'
import React, { useEffect, useMemo, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import clsx from 'clsx'
import * as yup from 'yup'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify'
import { UploadApi } from 'Apis/UploadApi'
import axios from 'axios'
import { PostApi } from 'Apis/PostApi'
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createLanguageService } from 'typescript'
const mdParser = new MarkdownIt()

const schema = yup.object({
    title: yup.string().required('Title must be filled out'),
    content: yup.string().required('Content must be filled out'),
})
const options = [
    { value: 'javascript', label: 'javascript' },
    { value: 'reactjs', label: 'reactjs' },
    { value: 'nodejs', label: 'nodejs' },
]

export default function EditPostPage() {
    const { slug } = useParams()
    const { data: Post } = useQuery(['post', slug], async () =>
        PostApi.getPostsBySlug(slug)
    )
    const navigation = useNavigate()
    const [preview, setPreview] = useState()
    const [isShow, setShow] = useState(false)

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(schema),
    })

    const handleEditorChange = ({ html, text }) => {
        setValue('content', text)
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
    const submitForm = async (data) => {
        try {
            await PostApi.editPostsBySlug(slug, data)
            setTimeout(() => {
                navigation(`/blog`)
            }, 1000)
            toast.success('Edit post success !')
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <DefaultLayout>
            {Post && (
                <>
                    <form onSubmit={handleSubmit(submitForm)} className="">
                        <section
                            className={clsx(
                                'fixed inset-0 bg-white z-50 transition-all duration-700',
                                { hidden: !isShow }
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute right-5 top-4 cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="gray"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="container w-full h-full place-content-center mx-auto grid  sm:grid-cols-2 sm:gap-10 lg:gap-20 px-5 lg:px-10">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name=""
                                    id="upload_image"
                                    // onChange={handlePreview}
                                    className="hidden"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg pb-4">
                                        Preview
                                    </h2>
                                    <label htmlFor="upload_image">
                                        <div
                                            className="bg-gray-100 px-10 pt-10 cursor-pointer bg-center bg-cover bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${Post.image})`,
                                            }}
                                        >
                                            {/* <img src={preview} alt='' /> */}
                                            <p className="text-base text-center pb-5">
                                                Avatar Image
                                            </p>
                                            <p className="text-center text-orange-500 pb-20">
                                                Choose your image
                                            </p>
                                        </div>
                                    </label>
                                    <div>
                                        <p className="text-xl py-3 font-semibold ">
                                            Title
                                        </p>
                                        <input
                                            className="block outline-none border-b-[1px] w-full py-3"
                                            disabled
                                            value={watch('title')}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xl py-3 font-semibold ">
                                            Slug
                                        </p>
                                        <input
                                            className="block outline-none border-b-[1px] w-full py-3"
                                            disabled
                                            placeholder={Post?.slug}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="pb-3">Tags</p>
                                    <div>
                                        <CreatableSelect
                                            isMulti
                                            // onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
                                    <p className="pt-3 pb-3">Category</p>
                                    <div>
                                        <CreatableSelect
                                            isMulti
                                            // onChange={handleChange}
                                            options={options}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="text-white rounded-lg bg-green-600 py-2 px-4 mt-7"
                                    >
                                        Edit post
                                    </button>
                                </div>
                            </div>
                        </section>
                        <section className={clsx({ hidden: isShow })}>
                            <div className="w-full flex justify-end pr-8 translate-y-3 sticky top-[57px] p-2 bg-white z-30">
                                <button
                                    type="button"
                                    className="px-4 p-1 bg-orange-500 text-white font-medium rounded-full"
                                    onClick={() => {
                                        setShow(true)
                                    }}
                                >
                                    Publish
                                </button>
                            </div>
                            <input
                                type="text"
                                className="w-full text-2xl font-medium p-7 outline-0"
                                defaultValue={Post.title}
                                {...register('title')}
                            />
                            <section className="tuyn-editor px-2 lg:px-6">
                                <MdEditor
                                    style={{
                                        minHeight: '780px',
                                        border: 'none',
                                        position: 'relative',
                                    }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    onImageUpload={onImageUpload}
                                    imageAccept=".jpg,.png"
                                    defaultValue={Post.content}
                                    value={getValues('root.content')}
                                />
                            </section>
                        </section>
                    </form>
                </>
            )}
        </DefaultLayout>
    )
}
