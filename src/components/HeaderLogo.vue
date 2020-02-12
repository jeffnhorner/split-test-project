<template>
    <a
        v-bind:class="$style.logoLink"
        href="http://www.takesplit.com"
    >
        <g-image
            v-bind:class="$style.logo"
            src="https://splitridesv2.wpengine.com/wp-content/uploads/2019/12/logo-white.png"
        />
    </a>
</template>

<style lang="scss" module>
    .logoLink {
        margin-top: 2rem;
    }
</style>