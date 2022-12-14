const ethers = require('ethers')

const BSC_provider = new ethers.providers.JsonRpcProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
)

const getGasPrice = async () => {
    return (await BSC_provider.getGasPrice()) * 5
}

export const optionsTx = async () => {
    return {
        gasPrice: await getGasPrice(),
        gasLimit: 300000,
    }
}
