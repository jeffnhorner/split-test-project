<template>
    <div v-bind:class="$style.completedApplication">
        <g-image
            v-bind:class="$style.completedLogo"
            src="https://fountain-uploads.s3-us-west-1.amazonaws.com/uploads/accounts/brand/square_logo/3883/Variation_1.png?X-Amz-Expires=604800&X-Amz-Date=20200211T150457Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJQOABKUE66R2SJPQ/20200211/us-west-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=906756741fb6851fdba3bfc8e3d01cc7f0b6a317298d183552bcb8a271b1a6a0"
        />
        <h3 v-bind:class="$style.messageHeadline">You've successfully filled out your application!</h3>
        <span v-bind:class="$style.message">
            Please verify all of your information prior to submitting.
        </span>
        <v-btn
            v-bind:class="$style.submitButton"
            depressed
            color="primary"
            rounded
        >
            Submit Your Application
        </v-btn>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" module>
    .completedApplication {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 567px) {
            margin-bottom: 2rem;
        }
    }

    .completedLogo {
        margin: 2rem;
        width: 5rem;
        height: 5rem;

        @media only screen and (max-width: 567px) {
            margin: -1rem 1rem 1rem;
            width: 4rem;
            height: 4rem;
        }
    }

    .messageHeadline {
        color: rgba(0, 0, 0, .75);
        font-size: 2rem;
        font-weight: 300;
        text-align: center;

        @media only screen and (max-width: 567px) {
            font-size: 1.25rem;
            margin-bottom: .5rem;
        }
    }

    .message {
        color: rgba(0, 0, 0, .5);
        display: block;
        font-size: .9rem;
        font-weight: 300;
        text-align: center;
        max-width: 32rem;
        margin: 0 auto;
        padding: .25rem 0 0;
        width: 100%;
    }

    .submitButton {
        margin-top: 1.5rem;
    }
</style>