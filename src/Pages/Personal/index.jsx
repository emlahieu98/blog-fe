import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from 'Layouts/HomeLayout'
import { useInfiniteQuery } from 'react-query'
import { UserApi } from 'Apis/UserApi'
import NFTSkeleton from 'Components/Skeleton/NFTSkeleton'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { IoMdStats } from 'react-icons/io'
import MyCard from '../../Components/Card/MyCard'
export default function PersonalPage() {
    const RefInView = useRef()
    const { username } = useParams()
    const { data, fetchNextPage, hasNextPage, isSuccess } = useInfiniteQuery(
        ['nfts'],
        () => UserApi.getAllNFT(username),
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
    // useEffect(() => {
    //     const follow = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             fetchNextPage()
    //         }
    //     })
    //     follow.observe(RefInView.current)
    // }, [])

    return (
        <MainLayout>
            <main className="container mx-auto">
                <section className='mb-24 relative bg-[url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000")] w-full pb-[22%] bg-no-repeat bg-cover bg-center rounded-b-2xl'>
                    <div className="flex gap-5 items-end absolute lg:left-12 bottom-0 translate-y-[50%]">
                        <div className="w-40 h-40 rounded-full border-4 border-white">
                            <img
                                className="w-full h-full rounded-full"
                                src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                                alt=""
                            />
                        </div>
                        <h3 className="text-3xl font-bold pb-6">
                            {username.substring(0, 4).concat('...') +
                                username.slice(-4)}
                        </h3>
                    </div>
                </section>
                <section className="px-5 pb-5 gap-5 flex flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-4/12">
                        <div className="p-5 rounded-lg shadow-sm border-[1px]">
                            <h3 className="font-semibold">Description</h3>
                            <p className="py-2 text-center text-sm border-b-[1px]">
                                Stop thinking, start doing!
                            </p>
                            <div className="flex gap-2 items-center mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                <p className="text-sm">
                                    Total NFTs : {data?.pages.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-8/12 p-4 shadow-sm rounded-lg border-[1px]">
                        <h3 className="text-xl font-bold">My NFTs</h3>
                        <p className="py-2 text-center text-sm border-b-[1px]"></p>
                        {isSuccess ? (
                            !data.pages.length > 0 ? (
                                <>
                                    <p className="text-center text-orange-500 animate-bounce py-4">
                                        <Link to={`/new-nft`}>
                                            <button className="px-4 py-2 rounded-full bg-orange-500 text-white">
                                                Create NFT free
                                            </button>
                                        </Link>
                                    </p>
                                </>
                            ) : (
                                data.pages.map((items, index) => (
                                    <div
                                        key={index}
                                        className="md:grid md:grid-cols-2 bg-gray-100 gap-2 p-2"
                                    >
                                        {items.map((nft, index) => (
                                            <>
                                                <MyCard nft={nft} />
                                            </>
                                        ))}
                                    </div>
                                ))
                            )
                        ) : (
                            <NFTSkeleton />
                        )}
                        <div className="scroll-call-api" ref={RefInView}>
                            {!hasNextPage && (
                                <p className="text-center text-orange-500 animate-bounce py-4">
                                    No more results to show ^_^
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}
