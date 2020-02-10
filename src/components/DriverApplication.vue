<template>
    <div v-bind:class="$style.container">
        <HeaderLogo />
        <VCard
            v-bind:class="$style.applicationWrapper"
        >
            <span v-bind:class="$style.headlineContainer">
                <p
                    v-bind:class="$style.headline"
                    v-bind:style="'margin-bottom: 0;'"
                >
                    Split Driver Application
                </p>
                <VBtn
                    v-bind:class="$style.jobDescription"
                    outlined
                    class="white--text"
                    v-on:click="$store.commit('setJobDescriptionModalState', true)"
                >
                    Job Description
                </VBtn>
                <JobDescriptionModal />
            </span>
            <div v-bind:class="$style.application">
                <div>
                    <VCardTitle v-bind:class="$style.title">
                        <span>
                            {{ currentTitle }}
                        </span>
                    </VCardTitle>
                    <VWindow v-model="applicationPhase">
                        <VWindowItem v-bind:value="1">
                            <DriverApplicationStepOne />
                        </VWindowItem>
                        <VWindowItem v-bind:value="2">
                            <DriverApplicationStepTwo />
                        </VWindowItem>
                        <VWindowItem v-bind:value="3">
                            <DriverApplicationStepThree />
                        </VWindowItem>
                        <VWindowItem v-bind:value="4">
                            <DriverApplicationStepFour />
                        </VWindowItem>
                        <VWindowItem v-bind:value="5">
                            <DriverApplicationStepFive />
                        </VWindowItem>
                        <div
                            v-bind:class="$style.validationErrorMessage"
                            v-if="hasInvalidatedFormPhase"
                        >
                            Please fill out all required fields (*)
                        </div>
                    </VWindow>
                </div>
                <div>
                    <VCardActions v-bind:class="$style.bottomContainer">
                        <VBtn
                            v-bind:class="$style.formNavigationButton"
                            v-bind:disabled="applicationPhase === 1"
                            v-bind:text="applicationPhase === 1"
                            v-bind:depressed="applicationPhase > 1"
                            v-on:click="handleFormProgression(false)"
                            outlined
                            color="primary"
                        >
                            Back
                        </VBtn>
                        <VProgressLinear
                            v-show="$mq !== 'xs' && $mq !== 'sm'"
                            v-bind:class="[
                                $style.progressBar,
                                (applicationPhase > 3 ? 'white--text' : null),
                            ]"
                            v-model="progressionPercentage"
                            background-opacity=".1"
                            color="primary"
                            height="39"
                            striped
                        >
                            <template v-slot="{ value }">
                                <p v-bind:class="$style.progressBarMessage">Your Application Progress:
                                    <strong>
                                        {{ Math.ceil(value) }}%
                                    </strong>
                                </p>
                            </template>
                        </VProgressLinear>
                        <span
                            v-show="applicationPhase <= 4 && ($mq === 'xs' || $mq === 'sm')"
                            v-bind:class="$style.progressStep"
                        >
                            <p>step</p>
                            <VAvatar
                                color="primary"
                                class="subheading white--text"
                                size="28"
                                v-text="applicationPhase"
                            />
                            <p>of 4</p>
                        </span>
                        <VBtn
                            v-bind:class="$style.formNavigationButton"
                            v-bind:disabled="applicationPhase === 5"
                            depressed
                            color="primary"
                            v-on:click="handleFormProgression"
                        >
                            Next
                        </VBtn>
                    </VCardActions>
                </div>
            </div>
        </VCard>
        <Footer />
        <div v-bind:class="[$style.skewedBox, $style.overlay]" />
    </div>
</template>

<script>
    export default {
        components: {
            DriverApplicationStepOne: () => import('~/components/DriverApplicationStepOne'),
            DriverApplicationStepTwo: () => import('~/components/DriverApplicationStepTwo'),
            DriverApplicationStepThree: () => import('~/components/DriverApplicationStepThree'),
            DriverApplicationStepFour: () => import('~/components/DriverApplicationStepFour'),
            DriverApplicationStepFive: () => import('~/components/DriverApplicationStepFive'),
            Footer: () => import('~/components/Footer'),
            HeaderLogo: () => import('~/components/HeaderLogo'),
            JobDescriptionModal: () => import('~/components/JobDescriptionModal'),
        },

        data: vm => ({
            progressionPercentage: 0,
        }),

        computed: {
            currentTitle () {
                switch (this.applicationPhase) {
                    case 1: return 'Hello, nice to meet you!'
                    case 2: return 'Just a Couple Questions...'
                    case 3: return 'Availabiliy & Experience'
                    case 4: return 'Uploads Needed'
                }
            },

            applicationPhase () {
                return this.$store.state.applicationPhase;
            },

            hasInvalidatedFormPhase () {
                return this.$store.state.hasInvalidatedFormPhase;
            }
        },

        methods: {
            handleFormProgression (nextStep = true) {
                // If we're trying to go to the next application phase & the current form phase
                // validation is completed properly without validatione errors.
                if (nextStep) {
                    // Update the application window to the next step.
                    this.$store.commit('updateApplicationPhase');
                    // Update the progression percentage for the user to view.
                    this.progressionPercentage += 100/4;
                    // Ensure the global state form validation state to validated.
                    this.$store.commit('setFormPhaseValidationStatus', false);

                    return;
                // Otherwise, as long as we're not on the first application phase, go back to the previous
                // application phase.
                } else if (!nextStep && this.$store.state.applicationPhase !== 0) {
                    const previousStep = this.$store.state.applicationPhase - 1;

                    this.$store.commit('updateApplicationPhase', false);
                    this.progressionPercentage -= 100/4;

                    return;
                }

                // If neither of the conditionals above are true, we'll assume the form isn't properly
                // filled out, therefore, it's invalidated.
                this.$store.commit('setFormPhaseValidationStatus', true);
            },
        },
    }
</script>

<style lang="scss" module>
    .container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        box-shadow: .25rem .25rem .5rem rgba(0, 0, 0, .25);
        display: flex;
        height: 40rem;
        flex-direction: column;
        width: 95%;
        max-width: 56rem;
        margin: 0 auto;
    }

    .application {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem;
    }

    .headlineContainer {
        background: #00CDAC;
        display: flex;
        padding: 1.5rem 2rem;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .headline {
        color: #fff;
        font-size: 1.25rem;
        font-weight: 900;
    }

    .title {
        color: #595959;
        font-weight: 300;
        justify-content: center;
        padding-top: .5rem;
        text-align: center;
        width: 100%;

        > span {
            font-size: 2rem;
        }
    }

    .validationErrorMessage {
        color: #ff5252;
        font-size: .9rem;
        margin: 1rem 0 0;
        text-align: center;
        width: 100%;
    }

    .bottomContainer {
        padding: 0;
    }

    .progressBar {
        margin: 0 3rem;

        > div {
            > p {
                margin-bottom: 0;
            }
        }
    }

    .progressBarMessage {
        font-size: .9rem;
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


    // Mobile only styles
    @media only screen and (max-width: 567px) {
        .container {
            height: 100%;
        }

        .applicationWrapper {
            height: auto;
            margin: 2rem 1rem;
        }

        .application {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            padding: 2rem;
        }

        .headlineContainer {
            flex-direction: column;
        }

        .headline {
            padding-bottom: 1.25rem;
        }

        .jobDescription {
            margin-bottom: .5rem;
        }

        .title {
            > span {
                font-size: 1.25rem;
            }
        }

        .bottomContainer {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
        }

        .formNavigationButton {
            width: 20%;
        }

        .progressBarMessage {
            font-size: .9rem;
        }

        .progressStep {
            margin: 0 .5rem
        }
    }
</style>