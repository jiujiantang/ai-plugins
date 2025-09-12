// 定义后端结构
export interface PageApiData {
    user_info:{
        user_id: number;
        nick_name: string;
        user_img: string;
    },
    nav_list: {
        nav_id: number;
        nav_name: string;
        product_list: {
            product_id: number;
            product_name: string;
        }[]
    }[]
}

// 定义前端需要的结构
export interface Page {
    user_info:{
        user_id: number;
        nick_name: string;
        user_img: string;
    },
    side: {
        key: number;
        name: string;
        tab: {
            key: number;
            name: string;
        }[]
    }[]
}

// 类型转换函数：将后端结构转换为前端所需结构
export function adaptPage(data: PageApiData): Page {
    return {
        user_info: { ...data.user_info },
        side: data.nav_list.map((nav, index) => ({
            key: nav.nav_id,
            name: nav.nav_name,
            tab: nav.product_list.map(({ product_id, product_name }, index) => ({
                key: product_id,
                name: product_name,
            }))
        }))
    };
}

