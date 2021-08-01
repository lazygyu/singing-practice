export function cEl<T extends HTMLElement>(tag: string, attrs: {[key: string]: any}, children?: string | HTMLElement | HTMLElement[]): T {
    const el = document.createElement(tag);

    Object.keys(attrs).forEach(key => {
        if (key === 'class') {
            let classes = attrs[key];
            if (!Array.isArray(classes)) {
                classes = [classes];
            }
            el.classList.add(attrs[key]);
        } else {
            el.setAttribute(key, attrs[key]);
        }
    });

    if (typeof children === 'string') {
        const textNode = document.createTextNode(children);
        el.appendChild(textNode);
    } else if (Array.isArray(children)) {
        children.forEach(ch => { el.appendChild(ch); });
    } else if (children !== undefined) {
        el.appendChild(children);
    }

    return el as T;
}