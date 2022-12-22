// import { AuthApi } from 'Apis/AuthApi'
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from './index'
import { useWeb3Store, CHAIN_ID } from '../../store/web3Store'
import { BiWallet } from 'react-icons/bi'
import { ethers } from 'ethers'
export default function UserModal() {
    const { walletAddress, disconnect } = useWeb3Store()
    const [isModal, setModal] = useState(false)

    const [chainId, setChainId] = useState()

    useEffect(() => {
        if (!window.ethereum) {
            return
        }
        setChainId(window.ethereum.chainId)
    }, [ethers])

    const changeNetwork = async () => {
        if (!chainId) {
            toast('Please install Metamask')
        }
        if (window.ethereum.networkVersion !== chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: CHAIN_ID }],
                })
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    return (
        <>
            <div className="relative ww-auto h-auto">
                <div
                    className="px-4 py-2 rounded-full bg-orange-500 text-white flex justify-between align-center cursor-pointer"
                    onClick={() => {
                        setModal(true)
                    }}
                >
                    <span className="text-3xl pr-2">
                        <BiWallet />
                    </span>
                    <div className="pt-1">
                        {walletAddress.substring(0, 3).concat('...') +
                            walletAddress.slice(-3)}
                    </div>
                    <div className="p-2">
                        <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                <div
                    className={clsx(
                        'p-4 absolute bottom-0 right-0 translate-y-[calc(100%+8px)] z-[100] transition-all duration-700 bg-white w-72 shadow-2xl border-[1px] rounded-lg',
                        {
                            hidden: !isModal,
                            block: isModal,
                        }
                    )}
                >
                    <div className="flex items-center gap-3 pb-3 border-b-[1px]">
                        <img
                            src={
                                'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
                            }
                            className="h-14 w-14 rounded-full"
                            alt=""
                        />
                        <div>
                            <h2 className="font-semibold">
                                {chainId && chainId === CHAIN_ID ? (
                                    <>
                                        <span>Chain : </span>
                                        <span className="bg-orange-500 p-1 rounded-md">
                                            {'BSC Testnet'}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="bg-red-500 p-2 rounded-md">
                                            {'Wrong Network'}
                                        </span>
                                        <div
                                            className=" bg-orange-500 pt-2 text-center cursor-pointer text-white"
                                            onClick={() => changeNetwork()}
                                        >
                                            Change
                                        </div>
                                    </>
                                )}
                            </h2>
                        </div>
                    </div>
                    <Link to={`/me/${walletAddress}`}>
                        <h3 className="cursor-pointer text-[14px] p-2 text-gray-700">
                            My profile
                        </h3>
                    </Link>
                    <Link to={`/new-nft`}>
                        <h3 className="cursor-pointer text-[14px] p-2 text-gray-700">
                            Create NFT free
                        </h3>
                    </Link>
                    <h3
                        className="cursor-pointer text-[14px] p-2 text-gray-700"
                        onClick={disconnect}
                    >
                        Disconnect
                    </h3>
                </div>
            </div>
            <Modal isModal={isModal} setModal={setModal} isBackground></Modal>
        </>
    )
}
