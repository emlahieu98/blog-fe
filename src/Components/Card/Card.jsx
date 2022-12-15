import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { IoMdStats } from 'react-icons/io'
import { useWeb3Store } from '../../store/web3Store'
import { ethers } from 'ethers'

const Card = ({ nft }) => {
    const { walletAddress, marketplaceContract, nftContract } = useWeb3Store()
    const handleBuyNFT = async (nft) => {
        // e.preventDefault()
        const gasLimit = await marketplaceContract.estimateGas.buyNft(
            nftContract.address,
            nft.tokenId,
            { value: ethers.utils.parseEther(nft.price) }
        )
        console.log(1)
        const txn = await marketplaceContract.buyNft(
            nftContract.address,
            nft.tokenId,
            { gasLimit, value: ethers.utils.parseEther(nft.price) }
        )
        await txn.wait()
    }

    return (
        <>
            <section className="rounded-md shadow-md border transform transition duration-300 hover:-translate-y-1">
                <div class="max-w-md bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 p-2 ">
                    <div class="p-2">
                        <img
                            class="rounded-xl object-cover w-80 h-60 mx-auto"
                            src={nft.image_url}
                            alt=""
                        />
                    </div>
                    <div class="p-1">
                        <div class="flex justify-center items-center space-x-4">
                            <h1 class="text-lg text-gray-900 font-bold">
                                {nft.name}
                            </h1>
                        </div>
                        <div class="flex justify-between p-3 items-center bg-gray-100 rounded-full">
                            <div class="flex space-x-2 items-center ">
                                <span class="text-gray-700 font-semibold">
                                    {nft.level}
                                </span>
                                <span>
                                    <AiFillStar />
                                </span>
                            </div>
                            <div class="flex space-x-2 items-center">
                                <span class="text-gray-700 font-semibold">
                                    {nft.stars}
                                </span>
                                <span>
                                    <IoMdStats />
                                </span>
                            </div>
                            <div class="flex space-x-2 justify-center items-center bg-green-400 rounded-full p-1 ">
                                <span class="text-gray-700 font-semibold">
                                    {nft.price}
                                </span>
                                <span>
                                    <img
                                        className="rounded-xl h-5 w-5"
                                        src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png"
                                    />
                                </span>
                            </div>
                            {walletAddress === nft.seller ? (
                                <></>
                            ) : (
                                <>
                                    <button
                                        className="px-4 py-2 rounded-full bg-orange-500 text-white"
                                        onClick={() => handleBuyNFT(nft)}
                                    >
                                        Buy
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Card
