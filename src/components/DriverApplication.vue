<template>
    <div v-bind:class="$style.container">
        <v-card
            v-bind:class="$style.applicationWrapper"
            class="mx-auto"
            max-width="60rem"
            width="100%"
            height="35rem"
        >
            <!-- <p
                v-bind:class="$style.headline"
                v-bind:style="'margin-bottom: 0;'"
            >
                Split Driver Application
            </p> -->
            <span>
                <v-progress-linear
                    v-model="skill"
                    color="primary"
                    height="70"
                    reactive
                    style="background: linear-gradient(90deg, #6af3fc 0%, #70fc81 100%)"
                >
                    <template v-slot="{ value }">
                        <p>Split Driver Application Progres: <strong>{{ Math.ceil(value) }}%</strong></p>
                    </template>
                </v-progress-linear>
            </span>

            <div v-bind:class="$style.questionsWrapper">
                <div>
                    <v-card-title v-bind:class="[
                            $style.title,
                            'justify-space-between'
                        ]"
                    >
                        <span>
                            {{ currentTitle }}
                        </span>
                        <span v-bind:class="$style.progressStep">
                            <p>step</p>
                            <v-avatar
                                color="primary"
                                class="subheading white--text"
                                size="28"
                                v-text="step"
                            />
                            <p>of 6</p>
                        </span>
                    </v-card-title>

                    <v-window v-model="step">
                    <v-window-item v-bind:value="1">
                        <v-card-text v-bind:class="$style.stepContainer">
                            <span v-bind:class="$style.questionGroup">
                                <v-text-field
                                    v-bind:class="$style.question"
                                    label="name *"
                                />
                                <v-text-field
                                    v-bind:class="$style.question"
                                    label="last name *"
                                />
                            </span>
                            <span v-bind:class="$style.questionGroup">
                                <v-text-field
                                    v-bind:class="$style.question"
                                    label="email *"
                                />
                                <v-text-field
                                    v-bind:class="$style.question"
                                    label="phone number *"
                                />
                            </span>
                            <span v-bind:class="$style.singleQuestionGroup">
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    v-bind:return-value.sync="date"
                                    persistent
                                    width="29rem"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-bind:class="$style.question"
                                            v-model="date"
                                            label="What is Your Dat of Birth? *"
                                            readonly
                                            v-on="on"
                                        />
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        landscape
                                        scrollable
                                        reactive
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text color="primary"
                                            v-on:click="modal = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text color="primary"
                                            v-on:click="$refs.dialog.save(date)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </span>
                        </v-card-text>
                    </v-window-item>

                    <v-window-item v-bind:value="2">
                        <v-card-text v-bind:class="$style.stepContainer">
                            <span v-bind:class="$style.questionGroup">
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['yes', 'no']"
                                    placeholder="Are you over the age of 25? *"
                                />
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['yes', 'no']"
                                    placeholder="Do you have a valid motorcycle(M1) license? *"
                                />
                            </span>
                            <span v-bind:class="$style.questionGroup">
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['yes', 'no']"
                                    placeholder="Are you able to commute to Marina Del Rey? *"
                                />
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['no experience', 'little experience', 'some experience', 'very experienced']"
                                    placeholder="How experienced are you with lane spliting? *"
                                />
                            </span>
                            <span v-bind:class="$style.singleQuestionGroup">
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['0 - 10', '10 - 20', '20 - 30', '30 - 40']"
                                    placeholder="How many hours per week do you prefer to work? *"
                                />
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
                            v-bind:text="step === 1"
                            v-bind:depressed="step > 1"
                            v-on:click="step--"
                            outlined
                            color="primary"
                        >
                            Back
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-bind:disabled="step === 3"
                            depressed
                            color="primary"
                            v-on:click="step++"
                        >
                            Next
                        </v-btn>
                    </v-card-actions>
                </div>
            </div>
        </v-card>
        <div v-bind:class="[$style.skewedBox, $style.overlay]" />
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

        data: vm => ({
            step: 1,
            date: null,
            modal: false,
            skill: 0,
        }),

        computed: {
            currentTitle () {
                switch (this.step) {
                    case 1: return 'Personal Information'
                    case 2: return 'Just A Couple Questions'
                    default: return 'Account created'
                }
            },
        },
    }
</script>

<style lang="scss" module>
    .container {
        align-items: center;
        display: flex;
        height: 100vh;
        width: 100%;
        z-index: 10;
    }

    .skewedBox {
        background: url('https://takesplit.com/wp-content/uploads/2019/12/request.png') no-repeat center;
        background-size: cover;
        background-position: 50%;
        height: 85%;
        transform: skew(0deg, 5deg);
        margin-top: -11rem;
        position: absolute;
        width: 100%;
        z-index: -1;

        @screen lg {
            @apply -mt-40;
        }

        &.overlay:before {
            background: #6af3fc;
            background: -moz-linear-gradient(90deg, #6af3fc 0%, #70fc81 100%);
            background: -webkit-linear-gradient(90deg, #6af3fc 0%, #70fc81 100%);
            background: linear-gradient(90deg, #6af3fc 0%, #70fc81 100%);
            content: '';
            display: block;
            height: 100%;
            top: 0;
            right: 0;
            opacity: .85;
            position: absolute;
            width: 100%;
        }
    }

    .applicationWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 7rem;
    }

    .questionsWrapper {
        padding: 0 2rem 4rem;
    }

    .headline {
        padding: 1.5rem 3rem;
        background: #00CDAC;
        color: #fff;
        font-size: 1.25rem;
    }

    .title {
        color: #00CDAC;
        font-weight: 700;
        padding: 0 1rem;

        > span {
            font-size: 1.75rem;
        }
    }

    .question {
        font-size: .9rem;
        width: 50%;

        :global(.v-label.theme--light) {
            font-size: .9rem;
        }
    }

    .progressStep {
        display: flex;
        align-items: center;

        > p {
            color: #00CDAC;
            margin: 0;
        }

        > div {
            margin: 0 .3rem;
        }

        > * {
            font-size: 1rem;
        }
    }

    .stepContainer {
        display: flex;
        flex-direction: column;
        padding-top: 0;
    }

    .questionGroup {
        display: flex;
        flex-direction: row;

        > div {
            margin: 1rem 0;

            &:nth-of-type(1) {
                padding-right: 1.5rem;
            }

            &:nth-of-type(2) {
                padding-left: 1.5rem;
            }
        }
    }

    .singleQuestionGroup {
        padding-right: 1.5rem;
        margin-top: 1rem;

        .question {
            padding-right: .75rem;
        }
    }
</style>