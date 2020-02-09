<template>
    <div v-bind:class="$style.uploadContainer">
        <span v-bind:class="$style.caption">Split requires drivers to maintain an active motorcycle [M1] endorsement.</span>
        <span v-bind:class="$style.uploadContent">
            <span>Drivers License [Front Picture] *</span>
            <VBtn
                depressed
                color="primary"
            >
                Front Picture
            </VBtn>
        </span>
        <span v-bind:class="$style.uploadContent">
            <span>Drivers License [Back Picture] *</span>
            <VBtn
                depressed
                color="primary"
            >
                Back Picture
            </VBtn>
        </span>
        <span v-bind:class="$style.uploadContent">
            <span>Drivers License [Front Picture]:</span>
            <VBtn
                depressed
                color="primary"
            >
                Please upload a resume
            </VBtn>
        </span>
    </div>
</template>

<style lang="scss" module>
    .caption {
        color: rgba(0, 0, 0, .5);
        display: flex;
        font-size: .9rem;
        font-weight: 300;
        justify-content: center;
        padding: .25rem 0 0;
        text-align: center;
    }

    .uploadContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .caption {
            margin-bottom: 1.5rem;
        }
    }

    .uploadContent {
        display: flex;
        justify-content: space-between;
        max-width: 34rem;
        margin: 1rem auto;
        width: 100%;

        > span {
            color: rgba(0, 0, 0, .5);
            font-size: .9rem;
        }
    }

    @media only screen and (max-width: 567px) {
        .uploadContainer {
            margin-bottom: .5rem;

            .caption {
                margin-bottom: .5rem;
            }
        }

        .uploadContent {
            flex-direction: column;

            > span {
                margin-bottom: .5rem;
            }
        }
    }
</style>