<template>
    <div v-bind:class="$style.container">
        <v-card
            v-bind:class="$style.applicationWrapper"
            class="mx-auto"
            max-width="50rem"
            width="100%"
            height="37.5rem"
        >
            <div>
                <v-card-title v-bind:class="[
                        $style.title,
                        'title font-weight-regular justify-space-between'
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
                    <v-card-text v-bind:class="$style.stepOneTextFiledContainer">
                        <span v-bind:class="$style.stepOneQuestionGroup">
                            <v-text-field
                                label="First Name"
                                placeholder="Joe"
                            />
                            <v-text-field
                                label="Last Name"
                                placeholder="Black"
                            />
                        </span>
                        <span v-bind:class="$style.stepOneQuestionGroup">
                            <v-text-field
                                label="Email"
                                placeholder="joeblack@split.com"
                            />
                            <v-text-field
                                label="Phone Number"
                                placeholder="222-333-4444"
                            />
                        </span>
                        <span v-bind:class="$style.stepOneDateOfBirthWrapper">
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                v-bind::close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="dateFormatted"
                                        placeholder="MM/DD/YYYY format"
                                        label="Date of Birth"
                                        persistent-hint
                                        v-on:blur="date = parseDate(dateFormatted)"
                                        v-on="on"
                                    />
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    no-title
                                    v-on:input="menu1 = false"
                                />
                            </v-menu>
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
                        v-bind:text="step === 1"
                        v-bind:depressed="step > 1"
                        v-on:click="step--"
                        color="secondary"
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
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: null,
            menu1: false,
        }),

        computed: {
            currentTitle () {
                switch (this.step) {
                    case 1: return 'Personal Information'
                    case 2: return 'Create a password'
                    default: return 'Account created'
                }
            },

            computedDateFormatted () {
                return this.formatDate(this.date);
            },
        },

        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },

        methods: {
            formatDate (date) {
                if (!date) {
                    return null
                }

                const [year, month, day] = date.split('-');

                return `${month}/${day}/${year}`;
            },

            parseDate (date) {
                if (!date) {
                    return null;
                }

                const [month, day, year] = date.split('/');

                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
        background: url('http://splitridesv2.wpengine.com/wp-content/uploads/2019/12/getridetoday.png') no-repeat center;
        background-size: cover;
        background-position: 30%;
        height: 85%;
        transform: skew(0deg, 5deg);
        margin-top: -11rem;
        opacity: .9;
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
        padding: 2rem;
    }

    .title {
        color: #00CDAC;

        > span {
            font-size: 1.75rem;
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

    .stepOneTextFiledContainer {
        display: flex;
        flex-direction: column;
    }

    .stepOneQuestionGroup {
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

    .stepOneDateOfBirthWrapper {
        width: 50%;
        padding-right: 1.5rem;
        margin-top: 1rem;
    }
</style>