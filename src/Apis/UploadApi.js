import { AxiosConfig } from './AxiosConfig'

export const UploadApi = {
    single: (body) => {
        return AxiosConfig.post('/common/upload-file', body)
    },
}
