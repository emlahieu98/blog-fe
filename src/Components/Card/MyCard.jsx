import { useState, useEffect } from 'react'
import { IoMdStats } from 'react-icons/io'
import { AiFillStar } from 'react-icons/ai'
import { useWeb3Store } from '../../store/web3Store'
import { optionsTx } from '../../config/smart_contract'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyCard = ({ nft }) => {
    const navigate = useNavigate()

    const buttonText = {
        sell: 'Sell',
        approve: 'Approve',
    }
    const { nftContract, marketplaceContract } = useWeb3Store()
    const [isApprovedForAll, setIsApprovedForAll] = useState(false)
    useEffect(() => {
        checkIsApprovedForAll()
    }, [])

    async function checkIsApprovedForAll() {
        const isApproved = await nftContract.getApproved(nft.token_id)

        isApproved === marketplaceContract.address
            ? setIsApprovedForAll(true)
            : setIsApprovedForAll(false)
    }

    const handleSubmit = async (e, nft) => {
        // e.preventDefault()
        if (e.target.innerText === buttonText.sell) {
            const gasLimit = await marketplaceContract.estimateGas.listNft(
                nft.token_address,
                nft.token_id,
                ethers.utils.parseEther('0.01')
            )
            const txn = await marketplaceContract.listNft(
                nft.token_address,
                nft.token_id,
                ethers.utils.parseEther('0.01')
            )
            const txnReceipt = await txn.wait()

            if (txnReceipt.status) {
                toast.success('Selling NFT on the market successfully')
                setTimeout(() => {
                    navigate('/marketplace')
                }, 1000)
            }
        }
        if (e.target.innerText === buttonText.approve) {
            const gasLimit = await nftContract.estimateGas.approve(
                marketplaceContract.address,
                nft.token_id
            )

            const txn = await nftContract.approve(
                marketplaceContract.address,
                nft.token_id,
                { gasLimit }
            )
            const txnReceipt = await txn.wait()

            if (txnReceipt.status) {
                toast.success('Approve NFT on the market successfully')
                window.reload()
            }
        }
    }

    return (
        <div>
            <div class="max-w-md bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 p-2 ">
                <div class="p-2">
                    <img
                        class="rounded-xl object-cover w-80 h-60 mx-auto"
                        src={JSON.parse(nft.metadata).image_url}
                        alt=""
                    />
                </div>
                <div class="p-1">
                    <div class="flex justify-center items-center space-x-4 ">
                        <h1 class="text-lg text-gray-900 font-bold">
                            {JSON.parse(nft.metadata).name}
                        </h1>
                    </div>
                    <div class="flex justify-center pt-3 space-x-6 items-center  bg-gray-100 rounded-full">
                        <div class="flex space-x-2 items-center ">
                            <span class="text-gray-700 font-semibold">
                                {JSON.parse(nft.metadata).attributes[0].value}
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <div class="flex space-x-2 items-center pr-4">
                            <span class="text-gray-700 font-semibold">
                                {JSON.parse(nft.metadata).attributes[1].value}
                            </span>
                            <span>
                                <IoMdStats />
                            </span>
                        </div>
                        <button
                            className="px-4 py-2 rounded-full bg-orange-500 text-white"
                            onClick={(e) => handleSubmit(e, nft)}
                        >
                            {isApprovedForAll
                                ? buttonText.sell
                                : buttonText.approve}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCard
