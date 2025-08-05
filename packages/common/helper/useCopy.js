/**
 * 备注：如果在iframe中使用，在添加iframe标签时，必须同步添加属性 allow="clipboard-read;clipboard-write"
 */

import {ref} from "vue";

export function useCopy(onSuccess = null) {
    const isCopied = ref(false);

    const copyText = async (_text) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(_text);
                isCopied.value = true;
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = _text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                isCopied.value = true;
            }
            onSuccess && onSuccess(isCopied.value)
        } catch (err) {
            console.error('复制失败', err);
        }
    };

    return {
        copyText
    }
}
