import React from 'react'
import { TiTick } from 'react-icons/ti'

const Card = (props) => {
    return (
        <div className="rounded-md shadow-md border transform transition duration-300 hover:-translate-y-1 p-2">
            <img
                className="w-full aspect-square"
                src="https://public.nftstatic.com/static/nft/res/nft-cex/S3/1668345438643_e2dwy1uam1s1fiuav3k4qurzdlnkb8do_400x400.png"
            />
            <div className="flex flex-col space-y-1 p-2">
                <div className="text-lg font-bold"> #1 Tran Hieu</div>
                <div className="flex justify-between">
                    <span className="flex gap-1 items-center text-xs font-semibold text-yellow-600">
                        WIN NFT HERO
                        <span className="text-green-500">
                            <TiTick />
                        </span>
                    </span>

                    <span className="rounded bg-gray-200 text-gray-700 p-1">
                        BSC
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="flex gap-1 items-center">
                        Price
                        <span className="text-green-500">
                            <TiTick />
                        </span>
                    </span>
                    <div>
                        <span className="flex gap-1 items-center">
                            <img
                                src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png"
                                alt=""
                                className="w-5 h-5"
                            />
                            <span className="text-sm font-bold">0.02 BNB</span>
                        </span>
                        <span className="text-right block text-sm text-gray-500">
                            {' '}
                            ~ 99.03 BUSD
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
