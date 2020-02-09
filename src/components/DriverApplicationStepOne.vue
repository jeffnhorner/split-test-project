<template>
    <section>
        <span
            v-if="step === 1"
            v-bind:class="$style.message"
        >
            Want to earn $15/hr + tip by becoming a Split driver? Begin the application below and click the Next to continue and show your application progress.
        </span>
        <v-card-text v-bind:class="$style.stepContainer">
            <span v-bind:class="$style.questionGroup">
                <v-text-field
                    v-bind:class="$style.question"
                    v-model="contactForm.fname"
                    placeholder="First Name *"
                />
                <v-text-field
                    v-bind:class="$style.question"
                    v-model="contactForm.lname"
                    placeholder="Last Name *"
                />
            </span>
            <span v-bind:class="$style.questionGroup">
                <v-text-field
                    v-bind:class="$style.question"
                    v-model="contactForm.email"
                    placeholder="Email *"
                />
                <v-text-field
                    v-bind:class="$style.question"
                    v-model="contactForm.phoneNumber"
                    placeholder="Phone Number *"
                />
            </span>
            <span v-bind:class="$style.singleQuestionGroup">
                <v-text-field
                    v-bind:class="$style.question"
                    v-model="contactForm.date"
                    placeholder="What is Your Date of Birth? *"
                    v-on:click="$store.commit('setDateOfBirthModalState', true)"
                />
                <v-dialog
                    ref="dateOfBirthModal"
                    v-model="$store.state.dateOfBirthModalIsOpen"
                    v-bind:return-value.sync="contactForm.date"
                    persistent
                    width="29rem"
                >
                    <v-date-picker
                        v-model="contactForm.date"
                        v-bind:landscape="$mq !== 'xs' && $mq !== 'sm'"
                        scrollable
                        reactive
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text color="primary"
                            v-on:click="$store.commit('setDateOfBirthModalState', false)"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text color="primary"
                            v-on:click="$refs.dateOfBirthModal.save(contactForm.date)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </span>
        </v-card-text>
    </section>
</template>

<script>
    export default {
        props: {
            step: {
                type: Number,
                required: true,
            }
        },

        data: () => ({
            contactForm: {
                fname: null,
                lname: null,
                email: null,
                phoneNumber: null,
                date: null,
            },
        }),
    }
</script>

<style lang="scss" module>
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

    .stepContainer {
        display: flex;
        flex-direction: column;
        padding: 0;
    }

    .questionGroup {
        display: flex;

        > div {
            margin: 1rem 0;

            &:nth-of-type(1) {
                padding-right: 1.5rem;
            }

            &:nth-of-type(2) {
                padding-left: 1.5rem;
            }
        }

        @media only screen and (max-width: 567px) {
            flex-direction: column;
            width: 100%;

            > div {
                &:nth-of-type(1) {
                    padding-right: 0;
                }

                &:nth-of-type(2) {
                    padding-left: 0;
                }
            }
        }
    }

    .question {
        font-size: .9rem;
        width: 50%;

        :global(.v-label.theme--light) {
            font-size: .9rem;
        }

        @media only screen and (max-width: 567px) {
            width: 100%;
        }
    }

    .singleQuestionGroup {
        padding-right: 1.5rem;
        margin-top: 1rem;

        .question {
            padding-right: .75rem;
        }

        @media only screen and (max-width: 567px) {
            padding-right: 0;

            .question {
                padding-right: 0;
            }
        }
    }
</style>