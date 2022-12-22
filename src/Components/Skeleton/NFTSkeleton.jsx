import Posts from 'Components/Blog/Posts'
import React from 'react'

export default function NFTSkeleton() {
    return (
        <>
            {Array.from(new Array(3)).map((val, index) => (
                <div class="max-w-md bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 p-2 ">
                    <div class="p-2"></div>
                    <div class="p-1">
                        <div class="flex justify-center items-center space-x-4 ">
                            <h1 class="text-lg text-gray-900 font-bold"></h1>
                        </div>
                        <div class="flex justify-center pt-3 space-x-6 items-center bg-gray-100 rounded-full">
                            <div class="flex space-x-2 items-center ">
                                <span class="text-gray-700 font-semibold"></span>
                                <span></span>
                            </div>
                            <div class="flex space-x-2 items-center pr-4">
                                <span class="text-gray-700 font-semibold"></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
