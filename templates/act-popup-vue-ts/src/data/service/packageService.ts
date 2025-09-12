import { getPackageData } from '@/data/api/package';
import { adaptPackage, Package, PackageApiData } from '@/data/adapter/packageData';

export async function getPackage(product_id: number): Promise<Package|null> {
    try {
        const response = await getPackageData({ product_id });
        const {status, data, msg} = response.data;
        if (status === 1) {
            return adaptPackage(data as PackageApiData);
        }else {
            window.easyPop.open({type: "toast", content: msg});
            return null;
        }
    } catch (error) {
        console.warn('接口异常');
        return null;
    }
}
