

export const findParent = (target, componentName) => {
    // debugger
    let parent = target.$parent || target.$root;
    let { name } = parent.$options;

    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            /* eslint-disable prefer-destructuring */
            name = parent.$options.name;
        }
    }
    return parent;
};
