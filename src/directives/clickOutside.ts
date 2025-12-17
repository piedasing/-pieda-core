type TElement = HTMLElement & {
    clickOutsideHandler: (event: MouseEvent) => void;
};

type TBinding = {
    value: (event: MouseEvent) => void;
};

export const vClickOutside = {
    mounted(el: TElement, binding: TBinding) {
        el.clickOutsideHandler = (event: MouseEvent) => {
            console.log(el.contains(event.target as Node));
            if (el.contains(event.target as Node)) {
                return;
            }
            binding.value?.(event);
        };
        document.addEventListener('click', el.clickOutsideHandler);
    },
    unmounted(el: TElement) {
        document.removeEventListener('click', el.clickOutsideHandler);
    },
};
