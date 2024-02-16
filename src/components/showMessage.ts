const styleContent = /*css*/ `
    #message-container {
        width: 80vw;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
        background-color: transparent;
        z-index: 1000;
    }
    .message-element1 {
        width: auto;
        opacity: 0;
        margin-top: 10px;
        padding: 16px;
        background-color: #f4f4f5;
        color: #909399;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: message-animation 3s ease;
        transition: all 0.2s ease;
    }
    @keyframes message-animation {
        0% {
            transform: translateY(-100%);
            opacity: 0.6
        }
        10% {
            transform: translateY(0);
            opacity: 1;
        }    
        90% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
`;

export function createMessage(message1: string, message2: string) {
    if (!document.head.querySelector('#message-style')) {
        const styleEle = document.createElement('style');
        styleEle.id = 'message-style';
        styleEle.textContent = styleContent;
        document.head.appendChild(styleEle);
    }

    let container = document.querySelector('#message-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'message-container';
        document.body.appendChild(container);
    }

    const messageEle = document.createElement('div');
    messageEle.classList.add('message-element1');
    messageEle.innerHTML = `<div>${message1}</div><div>${message2}</div>`;
    container.appendChild(messageEle);
    /**
     * 这里思路是，提示框出现消失动画，和因为上一个提示框消失而不得不上移的动画分开做
     * 出现消失就用一个keyframes完成3秒的动画，随后虽然透明度为零了，但是还占着位置
     * 然后透明度为零的时候，把这个的高度归零，由于设置了0.2s的过渡，所以下面提示框会用0.2s完成这个上移动画
     * 等高度归零之后，再移除，这时候看起来就没有瞬移了。
     * 挺取巧的方法，估计那些个ui库是直接用js做的，更强大流畅，我这么做是做不到的
     */
    messageEle.addEventListener('animationend', () => {
        messageEle.style.height = '0';
        messageEle.style.marginTop = '0';
        messageEle.style.padding = '0';
        setTimeout(() => {
            messageEle.remove();
            // 当容器没有子元素时，移除容器和样式
            if (container && container.childElementCount === 0) {
                container.remove();
                document.head.querySelector('#message-style')?.remove();
            }
        }, 200);
    });
}
