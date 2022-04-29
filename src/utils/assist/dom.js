

/**
 * @desc DOM 元素 offset
 * @param { DomElement } target
 * @returns { Object }
 */
export const getOffset = (target) => {
    let totalLeft = null;
    let totalTop = null;
    let par = target.offsetParent;
    totalLeft += target.offsetLeft;
    totalTop += target.offsetTop;
    while (par) {
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
            // 不是IE8我们才进行累加父级参照物的边框
            totalTop += par.clientTop;
            totalLeft += par.clientLeft;
        }
        totalTop += par.offsetTop;
        totalLeft += par.offsetLeft;
        par = par.offsetParent;
    }
    return { left: totalLeft, top: totalTop };
};

/**
 * @desc DOM 节点的 scrollParent
 * @param { DomElement } node
 * @returns { DomElement }
 */
export const getScrollParent = (node) => {
    if (node === null) {
        return null;
    }
   
    if (node.scrollHeight > node.clientHeight) {
        return node;
    }
    return getScrollParent(node.parentNode);
};

/**
 * @desc 滚动动画
 * @param { DomElement } target
 * @param { Number } destScrollTop
 */
export const scrollTopSmooth = function (target, destScrollTop) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (cb) {
            return setTimeout(cb, 20);
        };
    }
    let { scrollTop } = target;
    const step = function () {
        const distance = destScrollTop - scrollTop;
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            target.scrollTo(0, destScrollTop);
        } else {
            target.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};
