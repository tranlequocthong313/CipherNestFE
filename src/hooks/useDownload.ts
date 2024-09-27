import HTTP from "../configs/api";

const useDownload = () => {
    return async (api: string, form: FormData, filename: string) => {
        const res = await HTTP.post(api, form, {
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;

        const disposition = res.headers['content-disposition'];

        if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}

export default useDownload
