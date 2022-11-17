import React from 'react'
import { Link } from 'react-router-dom'

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
                <section className="flex gap-8 flex-wrap lg:flex-nowrap">
                    <div className="flex justify-between lg:justify-start p-5 gap-6 rounded-xl border-2 w-full lg:w-auto">
                        <div className="w-auto lg:max-w-[320px]">
                            <h2 className="text-2xl font-extrabold mb-4">
                                Savvy Fitness
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Trang web cung cấp các bài tập miễn phí cho các
                                học viên , ngoài ra còn sử dụng AI để phân tích
                                và đánh giá độ chính xác của các bài tập, cơ chế
                                to earn để giúp học viên có thêm thu nhập ...
                            </p>
                            <Link to="savvy-fitness">
                                <button className="text-white py-2 px-4  w-full text-center sm:w-auto rounded-full font-semibold bg-orange-500">
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                        <div className="w-[125px] h-[125px] hidden sm:block rounded-full border-4 border-orange-500 flex-shrink-0">
                            <img
                                className="object-cover rounded-full w-full h-full"
                                src="https://static.standard.co.uk/2022/09/20/10/Fitness.jpg?width=968&auto=webp&quality=50&crop=968%3A645%2Csmart"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex justify-between  lg:justify-start p-5 gap-6 rounded-xl border-2 w-full lg:w-auto">
                        <div className="w-auto lg:max-w-[320px]">
                            <h2 className="text-2xl font-extrabold mb-4">
                                Savvy Ecosystem
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Xây dựng hệ sinh thái Savvy token bao gồm token,
                                sàn dex, marketplace, bridge, game to earn, tham
                                gia xây dựng và phát triển đóng gói module, giải
                                pháp kĩ thuật , các bài toán về blockchain layer
                                1, wallet ...
                            </p>
                            <Link to="savvy-fitness">
                                <button className="text-white w-full text-center sm:w-auto py-2 px-4 rounded-full font-semibold bg-orange-500">
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                        <div className="w-[125px] h-[125px] hidden sm:block  rounded-full border-4 border-orange-500 flex-shrink-0">
                            <img
                                className="object-cover rounded-full w-full h-full"
                                src="https://masterthecrypto.com/wp-content/uploads/2018/06/wsi-imageoptim-eco1-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex justify-between  lg:justify-start p-5 gap-6 rounded-xl border-2 w-full lg:w-auto">
                        <div className="w-auto lg:max-w-[320px]">
                            <h2 className="text-2xl font-extrabold mb-4">
                                Odii Plashform
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Xây dựng web cung cấp các giải pháp bán hàng ,
                                chọn nguồn hàng rẻ nhất, tư vấn , chăm sóc khách
                                hàng , quản lý sản phẩm trên các sàn thương mại
                                điện tử như Shopee, Lazada, Tiki...
                            </p>
                            <Link to="savvy-fitness">
                                <button className="text-white w-full text-center sm:w-auto py-2 px-4 rounded-full font-semibold bg-orange-500">
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                        <div className="w-[125px] h-[125px] hidden sm:block  rounded-full border-4 border-orange-500 flex-shrink-0">
                            <img
                                className="object-cover rounded-full w-full h-full"
                                src="data:image/png;base64,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"
                                alt="odii"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
