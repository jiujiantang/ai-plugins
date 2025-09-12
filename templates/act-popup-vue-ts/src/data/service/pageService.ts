import { getPageData } from '@/data/api/page';
import { adaptPage, Page, PageApiData } from '@/data/adapter/pageData';

export async function getPage(): Promise<Page|null> {
    try {
        const response = await getPageData();
        const {status, data, msg} = response.data;
        if (status === 1) {
            return adaptPage(data as PageApiData);
        }else {
            window.easyPop.open({type: "toast", content: msg});
            return null;
        }
    } catch (error) {
        console.warn('接口异常');
        return null;
    }
}
