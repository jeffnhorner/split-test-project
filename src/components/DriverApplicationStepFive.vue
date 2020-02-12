<template>
    <div v-bind:class="$style.completedApplication">
        <g-image
            v-bind:class="$style.completedLogo"
            src="https://fountain-uploads.s3-us-west-1.amazonaws.com/uploads/accounts/brand/square_logo/3883/Variation_1.png?X-Amz-Expires=604800&X-Amz-Date=20200211T150457Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJQOABKUE66R2SJPQ/20200211/us-west-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=906756741fb6851fdba3bfc8e3d01cc7f0b6a317298d183552bcb8a271b1a6a0"
        />
        <h3 v-bind:class="$style.messageHeadline">You've successfully
            <span v-if="!hasBeenSubmitted || isSubmitting">filled out</span>
            <span
                v-else-if="hasBeenSubmitted && !isSubmitting"
                v-bind:class="$style.submitted"
            >
                submitted
            </span> your application!
        </h3>
        <span v-bind:class="$style.message">
            Please verify all of your information prior to submitting.
        </span>
        <v-btn
            v-if="!isSubmitting"
            v-bind:class="$style.submitButton"
            v-bind:disabled="hasBeenSubmitted"
            v-on:click="submitApplication"
            depressed
            color="primary"
            rounded
            large
        >
            <span
                v-if="!hasBeenSubmitted"
            >
                Submit Your Application
            </span>
            <span
                v-else
            >
                Submitted
            </span>
        </v-btn>
        <span
            v-else-if="isSubmitting"
            v-bind:class="$style.loader"
        >
            <v-progress-circular
                v-bind:size="50"
                color="primary"
                indeterminate
            />
            <p>Submitting your application...</p>
        </span>
    </div>
</template>

<script>
    export default {
        /**
         * Initial Vue component reactive data.
         *
         * @link https://vuejs.org/v2/api/#Options-Data
         */
        data: () => ({
            isSubmitting: false,
            hasBeenSubmitted: false,
        }),

        /**
         * Non-cached Vue methods.
         *
         * @link https://vuejs.org/v2/api/#methods
         */
        methods: {
            /**
             * Submitsthe application data payload.
             *
             */
            submitApplication () {
                this.isSubmitting = true;
                this.hasBeenSubmitted = true;

                // This is where the try/catch will be when the make the POST
                // request to the API.

                // Temporary until the API is set up.
                return setTimeout(() => {
                    this.isSubmitting = false;
                    console.log(this.$store.state.driverApplicationPayload);
                }, 1000);
            }
        }
    }
</script>

<style lang="scss" module>
    .completedApplication {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .completedLogo {
        margin: 2rem;
        width: 5rem;
        height: 5rem;
    }

    .messageHeadline {
        color: rgba(0, 0, 0, .75);
        font-size: 2rem;
        font-weight: 300;
        text-align: center;
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

    .loader {
        text-align: center;
        margin-top: 2rem;

        > div {
            margin-bottom: 1.5rem;
        }

        > p {
            color: #595959;
            font-weight: 700;
        }
    }

    .submitted {
        color: rgba(0, 0, 0, .7);
        font-weight: 600;
    }

    @media only screen and (max-width: 567px) {
        .completedApplication {
            margin-bottom: 2rem;
        }

        .completedLogo {
            margin: -1rem 1rem 1rem;
            width: 4rem;
            height: 4rem;
        }

        .messageHeadline {
            font-size: 1.25rem;
            margin-bottom: .5rem;
        }
    }
</style>