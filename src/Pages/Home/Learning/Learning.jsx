import React from 'react'
import { listProjects } from '../../../Dummy'
export default function Project() {
    return (
        <>
            <div className=" lg:px-8 xl:px-14 pt-7 pb-10">
                <h1 className="text-3xl font-extrabold mb-3">Sản phẩm</h1>
                <p className="max-w-[840px] text-gray-700 mb-6 lg:mb-14">
                    Các sản phẩm đa dạng về Front end, Back end, Web3 chủ yếu để
                    tìm hiểu thêm kiến thức là trau dồi các kĩ năng lập trình
                    ...
                </p>
                <section className="flex gap-8 flex-wrap lg:grid gap-x-8 gap-y-4 grid-cols-3">
                    {listProjects.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex justify-between lg:justify-start p-5 gap-6 rounded-xl border-2 w-full lg:w-auto"
                        >
                            <div className="w-auto lg:max-w-[320px]">
                                <h2 className="text-2xl font-extrabold mb-4">
                                    {item.name}
                                </h2>
                                <p className="text-gray-700 mb-4 text-justify">
                                    {item.description}
                                </p>
                                <a href={item.url}>
                                    <button className="text-white py-2 px-4  w-full text-center sm:w-auto rounded-full font-semibold bg-orange-500">
                                        Xem chi tiết
                                    </button>
                                </a>
                            </div>
                            <div className="w-[125px] h-[125px] hidden sm:block rounded-full border-4 border-orange-500 flex-shrink-0">
                                <img
                                    className="object-cover rounded-full w-full h-full"
                                    src={item.image_url}
                                    alt=""
                                />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}
