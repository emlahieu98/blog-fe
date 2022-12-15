import React, { useState, useEffect } from 'react'
import Card from '../../Components/Card/Card'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useWeb3Store } from '../../store/web3Store'
import Loading from '../../Components/Loading/Loading'
import { ethers } from 'ethers'

const Marketplace = () => {
    const handlePageClick = () => {}
    const [nfts, setNfts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { marketplaceContract, nftContract, isInit, init } = useWeb3Store()
    useEffect(() => {
        loadNFTs()
    }, [marketplaceContract])

    async function loadNFTs() {
        if (!isInit) {
            init()
        } else {
            const listings = await marketplaceContract.getListedNfts()

            // Iterate over the listed NFTs and retrieve their metadata
            const nfts = await Promise.all(
                listings &&
                    listings.map(async (i) => {
                        try {
                            const tokenURI = await nftContract.tokenURI(
                                ethers.utils.formatUnits(i.tokenId, 0)
                            )
                            const meta = await axios.get(tokenURI)

                            const nft = {
                                price: ethers.utils.formatEther(i.price) || 0,
                                tokenId:
                                    ethers.utils.formatUnits(i.tokenId, 0) ||
                                    999,
                                seller: i.seller,
                                owner: i.buyer,
                                image_url:
                                    meta.data.image_url ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0zKknEf_ExsMDMYCkGnkF4bvK-dRrBJb9FdYBJOO0vy5H15IsJSpMBSlVDz7bt6BKCk&usqp=CAU',
                                name: meta.data.name || '',
                                description: meta.data.description || '',
                                level: meta.data.attributes[0].value || 1,
                                stars: meta.data.attributes[1].value || 1,
                            }
                            return nft
                        } catch (err) {
                            console.log(err)
                            return null
                        }
                    })
            )
            setNfts(nfts.filter((nft) => nft !== null))
        }
    }

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
                {/* {isLoading ? (
                    <Loading />
                ) : ( */}
                {/* <> */}
                {nfts &&
                    nfts.map((nft) => (
                        <>
                            <Card nft={nft} />
                        </>
                    ))}
                {/* </> */}
                {/* )} */}
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
