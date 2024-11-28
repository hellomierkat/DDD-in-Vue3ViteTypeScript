import instance from '../fileRequest'
import instance_download from '../fileDownload'
import {space_file} from '.'


export const UploadFileAsync
    = (input: FormData)
    : Promise<any> => instance.post(`/app/file-group/upload-file`, input);

export const DeleteFileAsync
    = (input: space_file.IDeleteFileInput)
    : Promise<any> => instance.delete(`/app/file-group/file`, {data: input});

export const DownLoadAsync
    = (input: space_file.IFileDownLoadInput)
    : Promise<any> => instance_download.post(`/app/file-group/${input.id}/down-load`);

    