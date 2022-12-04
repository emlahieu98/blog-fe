import React from 'react'
import Card from '../../Components/Card/Card'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

const Marketplace = () => {
    const handlePageClick = () => {}

    return (
        <div>
            <div className="space-y-4 mb-4">
                <Link to={`/new-nft`}>
                    <button className="px-4 py-2 rounded-full bg-orange-500 text-white">
                        Create NFT free
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={10}
                previousLabel="<<"
                containerClassName="flex justify-center items-center space-x-2 mt-4 p-4 rounded"
                activeClassName="bg-gray-900 text-white p-2"
                pageClassName="bg-gray-200 text-center aspect-square w-10 p-2"
                previousClassName="bg-gray-200 text-center p-2 rounded"
                nextClassName="bg-gray-200 text-center p-2 rounded"
            />
        </div>
    )
}

export default Marketplace
