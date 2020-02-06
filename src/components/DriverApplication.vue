<template>
    <div v-bind:class="$style.container">
        <v-card
            v-bind:class="$style.applicationWrapper"
            class="mx-auto"
            max-width="40rem"
            width="100%"
            height="30rem"
        >
            <div>
                <v-card-title class="title font-weight-regular justify-space-between">
                    <span>
                        {{ currentTitle }}
                    </span>
                    <v-avatar
                        color="primary lighten-2"
                        class="subheading white--text"
                        size="24"
                        v-text="step"
                    />
                </v-card-title>

                <v-window v-model="step">
                <v-window-item v-bind:value="1">
                    <v-card-text>
                        <v-text-field
                            label="Email"
                            value="john@vuetifyjs.com"
                        />
                        <span class="caption grey--text text--darken-1">
                            This is the email you will use to login to your Vuetify account
                        </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item v-bind:value="2">
                    <v-card-text>
                        <v-text-field
                            label="Password"
                            type="password"
                        />
                        <v-text-field
                            label="Confirm Password"
                            type="password"
                        />
                        <span class="caption grey--text text--darken-1">
                            Please enter a password for your account
                        </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item v-bind:value="3">
                    <div class="pa-4 text-center">
                        <v-img
                            class="mb-4"
                            contain
                            height="128"
                            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                        />
                        <h3 class="title font-weight-light mb-2">Thanks for submitting an application!</h3>
                        <span class="caption grey--text">
                            Your application will be reviewed within 48 hours and someone will reach out
                        </span>
                    </div>
                </v-window-item>
                </v-window>
            </div>
            <div>
                <v-card-actions>
                    <v-btn
                        v-bind:disabled="step === 1"
                        text
                        v-on:click="step--"
                    >
                        Back
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-bind:disabled="step === 3"
                        depressed
                        v-on:click="step++"
                    >
                        Next
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        components: {
            StepOne: () => import('~/components/StepOne'),
            StepTwo: () => import('~/components/StepTwo'),
            StepThree: () => import('~/components/StepThree'),
            StepFour: () => import('~/components/StepFour'),
        },

        data: () => ({
            progressionStep: 1,
            step: 1,
        }),

        created () {
            console.log(this);
        },

        computed: {
            currentTitle () {
                switch (this.step) {
                case 1: return 'Sign-up'
                case 2: return 'Create a password'
                default: return 'Account created'
                }
            },
        },

        methods: {
            submitForm () {
                console.log('form was submitted');
            }
        },
    }
</script>

<style lang="scss" module>
    .container {
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
    }

    .applicationWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>