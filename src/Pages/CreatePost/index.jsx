import DefaultLayout from 'Layouts/DefaultLayout'
import React, { useRef, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import clsx from 'clsx'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify'
import { UploadApi } from 'Apis/UploadApi'
import axios from 'axios'
import { UserApi } from 'Apis/UserApi'
import { useNavigate } from 'react-router-dom'
import slug from 'slug'
const mdParser = new MarkdownIt()

const options = [
    { value: 'javascript', label: 'javascript' },
    { value: 'reactjs', label: 'reactjs' },
    { value: 'nodejs', label: 'nodejs' },
]

export default function CreatePostPage() {
    const navigation = useNavigate()
    const [preview, setPreview] = useState()
    const [isShow, setShow] = useState(false)
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
            toast.success('Create new post success!')
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
        <DefaultLayout>
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
                                    Avatar Image
                                </p>
                                <p className="text-center text-orange-500 pb-20">
                                    Choose your image
                                </p>
                            </div>
                        </label>
                        <div>
                            <p className="text-xl py-3 font-semibold ">Title</p>
                            <input
                                className="block outline-none border-b-[1px] w-full py-3"
                                disabled
                                placeholder={formData.current.title}
                            />
                        </div>
                        <div>
                            <p className="text-xl py-3 font-semibold ">Slug</p>
                            <input
                                className="block outline-none border-b-[1px] w-full py-3"
                                disabled
                                placeholder={slug(formData.current.title)}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="pb-3">Tags</p>
                        <div>
                            <CreatableSelect
                                isMulti
                                onChange={handleChange}
                                options={options}
                            />
                        </div>
                        <p className="pt-3 pb-3">Category</p>
                        <div>
                            <CreatableSelect
                                isMulti
                                onChange={handleChange}
                                options={options}
                            />
                        </div>
                        <p className="pt-3 pb-3">Nick name owner</p>
                        <div>
                            <input
                                type="input"
                                onChange={(e) => {
                                    formData.current.user_name = e.target.value
                                }}
                                className="block border-[1px] w-full py-2"
                            />
                        </div>
                        <button
                            className="text-white rounded-lg bg-green-600 py-2 px-4 mt-7"
                            onClick={submitForm}
                        >
                            Create post
                        </button>
                    </div>
                </div>
            </section>
            <section className={clsx({ hidden: isShow })}>
                <div className="w-full flex justify-end pr-8 translate-y-3 sticky top-[57px] p-2 bg-white z-30">
                    <button
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
                    onChange={(e) => {
                        formData.current.title = e.target.value
                    }}
                    className="w-full text-2xl font-medium p-7 outline-0"
                    placeholder="Title"
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
                        placeholder="Writing here..."
                    />
                </section>
            </section>
        </DefaultLayout>
    )
}
