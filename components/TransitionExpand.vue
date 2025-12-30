<template>
    <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    >
        <div
            v-show="showContent"
            class="transition-expand"
        >
            <slot></slot>
        </div>
    </transition>
</template>
 
<script lang="ts" setup>
// source: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
 
interface Props {
    showContent: boolean
}
 
withDefaults(defineProps<Props>(), {
    showContent: false
});
 
const forceRepaintTriggerAnimation = (element: HTMLElement, height: string): void => {
    const el = element;
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(el).height;
    requestAnimationFrame(() => {
        el.style.height = height;
    });
};
 
const enter = (element: HTMLElement): void => {
    const el = element;
    const width = getComputedStyle(element).width;
 
    el.style.width = width;
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.height = 'auto';
 
    const height = getComputedStyle(el).height;
 
    el.style.width = '';
    el.style.position = '';
    el.style.visibility = '';
    el.style.height = '0';
 
    forceRepaintTriggerAnimation(el, height);
};
 
const afterEnter = (element: HTMLElement): void => {
    const el = element;
    el.style.height = 'auto';
};
 
const leave = (element: HTMLElement): void => {
    const el = element;
    const height = getComputedStyle(el).height;
 
    el.style.height = height;
 
    forceRepaintTriggerAnimation(el, '0');
};
</script>
 
<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 0.5s ease-in-out;
    overflow: hidden;
}
 
.expand-enter-from,
.expand-leave-to {
    height: 0;
}
</style>