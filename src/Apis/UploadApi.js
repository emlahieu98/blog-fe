import { AxiosConfig } from './AxiosConfig'
import axios from 'axios'
export const UploadApi = {
    single: (body) => {
        return AxiosConfig.post('/common/upload-file', body)
    },
    singlePinataService: async (body) => {
        const image = await axios({
            method: 'POST',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            data: body,
            headers: {
                pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
                pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
                'Content-Type': 'multipart/form-data',
            },
        })

        return image
    },
}
