import { PostApi } from 'Apis/PostApi'
import Posts from 'Components/Blog/Posts'
import PostsSkeleton from 'Components/Skeleton/PostsSkeleton'
import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function Blog() {
    const RefInView = useRef()
    const { data, fetchNextPage, hasNextPage, isSuccess } = useInfiniteQuery(
        ['posts'],
        PostApi.getAllPost,
        {
            getNextPageParam: (lastPage, pages) => {
                if (pages.length < 2) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
        }
    )

    useEffect(() => {
        const follow = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage()
            }
        })
        follow.observe(RefInView.current)
    }, [])

    return (
        <main className="lg:px-8">
            <h2 className="text-3xl font-extrabold mb-4">Featured Posts</h2>
            <p className="text-sm mb-8 lg:mb-16"></p>
            <section className="flex gap-8 justify-between flex-wrap lg:flex-nowrap">
                <div className="w-full order-2 lg:order-1 lg:w-8/12">
                    {isSuccess ? (
                        data?.pages.map((posts, index) => (
                            <div key={index}>
                                {posts.map((post, index) => (
                                    <Posts posts={post} key={post._id} />
                                ))}
                            </div>
                        ))
                    ) : (
                        <PostsSkeleton />
                    )}
                    <div className="scroll-call-api" ref={RefInView}></div>
                    {!hasNextPage && (
                        <p className="text-center text-orange-500 animate-bounce py-4">
                            No more results to show ^_^
                        </p>
                    )}
                </div>
                <div className="w-full order-1 lg:order-2  lg:w-4/12 lg:px-4">
                    <h3 className="text-gray-500 uppercase font-medium mb-5">
                        Recommended tags
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        <p className="text-sm px-3 py-2 font-medium rounded-full bg-gray-200">
                            Nodejs / Express{' '}
                        </p>
                        <p className="text-sm px-3 py-2 font-medium rounded-full bg-gray-200">
                            Solidity
                        </p>
                        <p className="text-sm px-3 py-2 font-medium rounded-full bg-gray-200">
                            ReactJs / NextJs
                        </p>
                        <p className="text-sm px-3 py-2 font-medium rounded-full bg-gray-200">
                            Others
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
