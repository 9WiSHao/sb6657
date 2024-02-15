export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        alert('成功复制此条烂梗到剪贴板');
    } catch (error) {
        console.log('复制失败', error);
        alert('复制失败，请检查是否授予浏览器写入剪贴板权限');
    }
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
