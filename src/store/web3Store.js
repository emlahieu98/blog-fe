import create from 'zustand'
import { ethers } from 'ethers'
import {
    NFT_ABI,
    NFT_ADDRESS,
    NFT_MARKETPLACE_ABI,
    NFT_MARKETPLACE_ADDRESS,
} from '../config'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const CHAIN_ID = '0x61'

export const useWeb3Store = create((set, get) => ({
    isConnected: false,
    isInit: false,
    nftContract: null,
    marketplaceContract: null,
    walletAddress: null,
    signer: null,
    setIsConnected: (isConnected) => set({ isConnected }),
    setNftContract: () => {},
    setMarketplaceContract: () => {},
    connect: async () => {
        console.log('connect')
        if (!window.ethereum) {
            toast.error('Please install Metamask')
            return
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        await provider.send('eth_requestAccounts', [])

        const signer = provider.getSigner()

        set({
            isConnected: true,
            walletAddress: await signer.getAddress(),
            nftContract: new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer),
            marketplaceContract: new ethers.Contract(
                NFT_MARKETPLACE_ADDRESS,
                NFT_MARKETPLACE_ABI,
                signer
            ),
        })
    },
    disconnect: () => {
        return set({ isConnected: false })
    },
    init: async () => {
        if (!window.ethereum) {
            toast.error('Please install Metamask')
            return
        }

        const providers = new ethers.providers.Web3Provider(window.ethereum)

        const { provider: ethereum } = providers

        const accounts = await providers.listAccounts()

        if (accounts.length > 0) {
            set({ isConnected: true, walletAddress: accounts[0] })
        }

        //@ts-ignore
        ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length > 0) {
                set({ isConnected: true, walletAddress: accounts[0] })
            } else {
                set({ isConnected: false, walletAddress: null })
            }
        })

        //@ts-ignore
        ethereum.on('chainChanged', () => window.location.reload())

        const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, providers)
        const marketplaceContract = new ethers.Contract(
            NFT_MARKETPLACE_ADDRESS,
            NFT_MARKETPLACE_ABI,
            providers
        )

        return set({
            nftContract,
            marketplaceContract,
            isInit: true,
        })
    },
}))

export const Web3Provider = ({ children }) => {
    const init = useWeb3Store((state) => state.connect)

    useEffect(() => {
        if (!window.ethereum) {
            return
        }
        init()
    }, [ethers])
    return <>{children}</>
}
