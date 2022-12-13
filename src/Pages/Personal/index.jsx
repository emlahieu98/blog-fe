import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from 'Layouts/HomeLayout'
import { useInfiniteQuery } from 'react-query'
import { UserApi } from 'Apis/UserApi'
import PostsSkeleton from 'Components/Skeleton/PostsSkeleton'

export default function PersonalPage() {
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
    console.log('data:', data)
    return (
        <MainLayout>
            <main className="container mx-auto">
                <section className='mb-24 relative bg-[url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000")] w-full pb-[22%] bg-no-repeat bg-cover bg-center rounded-b-2xl'>
                    <div className="flex gap-5 items-end absolute left-12 bottom-0 translate-y-[50%]">
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
                                <p className="text-sm">Total NFTs : 5</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-8/12 p-4 shadow-sm rounded-lg border-[1px]">
                        <h3 className="text-xl font-bold">My NFTs</h3>
                        {isSuccess ? (
                            data?.pages.map((items, index) => (
                                <div key={index}>
                                    {items.map((nft, index) => (
                                        <div className="flex flex-wrap sm:flex-nowrap gap-5 py-3 border-b-2">
                                            <div className="w-full sm:w-5/12">
                                                <img
                                                    className="rounded-2xl w-full"
                                                    src={
                                                        JSON.parse(nft.metadata)
                                                            .image_url
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="sm:w-7/12">
                                                <h2 className="font-semibold text-xl mb-3">
                                                    Name
                                                </h2>
                                                <p className="">
                                                    {
                                                        JSON.parse(nft.metadata)
                                                            .name
                                                    }
                                                </p>
                                                <h2 className="font-semibold text-xl mb-3">
                                                    Description
                                                </h2>
                                                <p className="">
                                                    {
                                                        JSON.parse(nft.metadata)
                                                            .description
                                                    }
                                                </p>
                                                <h2 className="font-semibold text-xl mb-3">
                                                    Properties
                                                </h2>
                                                <p className="">
                                                    {JSON.parse(
                                                        nft.metadata
                                                    ).attributes.map((val) => (
                                                        <>
                                                            <p className="">
                                                                {val.trait_type}
                                                                {val.value}
                                                            </p>
                                                        </>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <PostsSkeleton />
                        )}
                        {/* <div className="flex flex-wrap sm:flex-nowrap gap-5 py-3 border-b-2">
                            <div className="w-full sm:w-5/12">
                                <img
                                    className="rounded-2xl w-full"
                                    src="https://i1.sndcdn.com/artworks-X6awhdDN24S59gRR-Vsf9Qw-t500x500.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="sm:w-7/12">
                                <h2 className="font-semibold text-xl mb-3">
                                    Properties
                                </h2>
                                <p className="">
                                    Sở hữu một Terminal hiện đại, mạnh mẽ trong
                                    tùy biến và học cách làm việc với Ubuntu là
                                    một bước quan trọng trên con đường trở thành
                                    một Web Developer.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}
