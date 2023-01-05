import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { FacebookSelector } from '@charkour/react-reactions'
import DefaultLayout from 'Layouts/DefaultLayout'
import SyntaxHighlight from 'Components/SyntaxHighlight'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'react-query'
import { PostApi } from 'Apis/PostApi'
import { Link, useParams } from 'react-router-dom'
import DayJs from 'Utils/DayJs'
import ActionPosts from './ActionPosts'
import MarkdownIt from 'markdown-it'
export default function PostsPage() {
    const { slug } = useParams()
    const { data: Posts } = useQuery(['posts', slug], async () =>
        PostApi.getPostsBySlug(slug)
    )

    return (
        <>
            <DefaultLayout>
                <main className="container mx-auto px-4 lg:px-6 md:flex gap-10">
                    <section className="pb-5 md:w-3/12 lg:w-2/12 relative">
                        <ActionPosts />
                    </section>
                    <section className="pb-5 md:w-9/12 md:py-5 lg:w-8/12">
                        <h1 className="text-xl sm:text-2xl font-bold pb-4">
                            {Posts?.title}
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://res.cloudinary.com/tuyndev/image/upload/v1654309152/default/avatars-000424500066-nchc3n-t500x500_dwtmmw.jpg"
                                    alt=""
                                />
                                <div>
                                    <h3 className="font-semibold tex-sm capitalize">
                                        {Posts?.user_name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        <span className="pr-4">
                                            {DayJs.from(Posts?.createdAt)}
                                        </span>
                                        <span>
                                            {Posts?.view_count || 10} lượt xem
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex gap-x-3 gap-y-2 pt-4 flex-wrap">
                            {/* {Posts?.tags.map((tag, index) => (
                                <p
                                    className="px-3 py-1 text-black text-sm cursor-pointer bg-gray-200"
                                    key={index}
                                >
                                    {tag.label}
                                </p>
                            ))} */}
                        </div>
                        <div className="tuyn-custom-markdown pt-4 pb-6 sm:pt-5 sm:pb-7 leading-10">
                            <ReactMarkdown
                                children={Posts?.content}
                                components={SyntaxHighlight}
                            />
                        </div>
                        <div className="border-b-2 border-red-500 pt-5 pb-7">
                            <h1 className="font-semibold text-lg pb-4">
                                Category
                            </h1>
                            <ul className="p-1 list-disc">
                                <div>
                                    <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-bell-off mr-2"
                                        >
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                            <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
                                            <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
                                            <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                                            <line
                                                x1="1"
                                                y1="1"
                                                x2="23"
                                                y2="23"
                                            ></line>
                                        </svg>
                                        Blockchain
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className="mt-7">
                            <h1 className="text-xl font-semibold pb-5">
                                Featured Posts
                            </h1>
                        </div>
                        <div className="pt-5">
                            <h1 className="text-xl font-semibold pb-5">
                                Recommended tags
                            </h1>
                            <ul className="p-1 list-disc">
                                <div>
                                    <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-arrow-right mr-2"
                                        >
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            ></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                        Front end
                                    </div>
                                    <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-archive mr-2"
                                        >
                                            <polyline points="21 8 21 21 3 21 3 8"></polyline>
                                            <rect
                                                x="1"
                                                y="3"
                                                width="22"
                                                height="5"
                                            ></rect>
                                            <line
                                                x1="10"
                                                y1="12"
                                                x2="14"
                                                y2="12"
                                            ></line>
                                        </svg>
                                        Rust
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </section>
                </main>
            </DefaultLayout>
        </>
    )
}
