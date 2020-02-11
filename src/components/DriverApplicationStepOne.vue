<template>
    <section v-if="isReady">
        <span v-bind:class="$style.message">
            Want to earn $15/hr + tip by becoming a Split driver? Begin the application below and click the Next button to continue and show your application progress.
        </span>
        <VCardText v-bind:class="$style.stepContainer">
            <span v-bind:class="$style.questionGroup">
                <VTextField
                    v-bind:class="$style.question"
                    v-model="phaseQuestions1.fname"
                    v-on:input="$v.phaseQuestions1.fname.$touch()"
                    v-bind:rules="validationRule($v, 'fname', 'This field is required', 'phaseQuestions1')"
                    placeholder="First Name *"
                />
                <VTextField
                    v-bind:class="$style.question"
                    v-model="phaseQuestions1.lname"
                    v-on:input="$v.phaseQuestions1.lname.$touch()"
                    v-bind:rules="validationRule($v, 'lname', 'This field is required', 'phaseQuestions1')"
                    placeholder="Last Name *"
                />
            </span>
            <span v-bind:class="$style.questionGroup">
                <VTextField
                    v-bind:class="$style.question"
                    v-model="phaseQuestions1.email"
                    v-on:input="$v.phaseQuestions1.email.$touch()"
                    v-bind:rules="validationRule($v, 'email', 'Please enter a valid email', 'phaseQuestions1')"
                    placeholder="Email *"
                />
                <VTextField
                    v-bind:class="$style.question"
                    v-model="phaseQuestions1.phoneNumber"
                    v-on:input="$v.phaseQuestions1.phoneNumber.$touch()"
                    v-bind:rules="validationRule($v, 'phoneNumber', 'Please enter a valid phone number. Format: 111-222-3333', 'phaseQuestions1')"
                    placeholder="Phone Number *"
                />
            </span>
            <span v-bind:class="$style.singleQuestionGroup">
                <VTextField
                    v-bind:class="$style.question"
                    v-model="phaseQuestions1.date"
                    v-on:input="$v.phaseQuestions1.date.$touch()"
                    v-bind:rules="validationRule($v, 'date', 'You must select a date', 'phaseQuestions1')"
                    placeholder="What is Your Date of Birth? *"
                    v-on:click="$store.commit('setDateOfBirthModalState', true)"
                />
                <VDialog
                    ref="dateOfBirthModal"
                    v-model="$store.state.dateOfBirthModalIsOpen"
                    v-bind:return-value.sync="phaseQuestions1.date"
                    persistent
                    width="29rem"
                >
                    <VDatePicker
                        v-model="phaseQuestions1.date"
                        v-bind:landscape="$mq !== 'xs' && $mq !== 'sm'"
                        scrollable
                        reactive
                    >
                        <VSpacer />
                        <VBtn
                            text color="primary"
                            v-on:click="$store.commit('setDateOfBirthModalState', false)"
                        >
                            Cancel
                        </VBtn>
                        <VBtn
                            text color="primary"
                            v-on:click="$refs.dateOfBirthModal.save(phaseQuestions1.date)"
                        >
                            OK
                        </VBtn>
                    </VDatePicker>
                </VDialog>
            </span>
        </VCardText>
    </section>
</template>

<script>
    import { required, email, minLength } from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            phaseQuestions1: {
                fname: '',
                lname: '',
                email: '',
                phoneNumber: '',
                date: '',
            },
            isReady: false,
        }),

        async created () {
            // Dynamically import the validationRule utility function
            const { default: validationRule } = await import('~/utilities/validationRule.js');

            this.validationRule = validationRule;

            this.isReady = true;

            // Upon component creation, set the global vuelidate object so we can access it
            // within all components.
            this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);

            // Since Vuetify's VWindow component requires the child VWindowItem components to use vue's v-show directive
            // so you don't lose data when you go forward or backward between appliation phases, we must watch the global
            // applicationPhase value and only update the global vuelidate object when the applicationPhase equals the
            // appopriate DriverApplicationStep component. (i.e. this single file component's name is DriverApplicationStepOne,
            // therefore, whenever the globalApplicatonPhase === 1, update the global formValidation object with this
            // components vuelidate validations).
            this.$watch('$store.state.applicationPhase', () => {
                // Set the global state's validationObject to the validations being defined in this component's
                // vuelidate validation object below.
                if (this.$store.state.applicationPhase === 1) {
                    this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);
                }
            });
        },

        validations: {
            phaseQuestions1: {
                fname: {
                    required,
                },
                lname: {
                    required,
                },
                email: {
                    required,
                    email,
                },
                phoneNumber: {
                    required,
                    minLength: minLength(12),
                },
                date: {
                    required,
                },
            },
            validationGroup: ['phaseQuestions1'],
        },
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
    }

    .question {
        font-size: .9rem;
        width: 50%;

        :global(.v-label.theme--light) {
            font-size: .9rem;
        }
    }

    .singleQuestionGroup {
        padding-right: 1.5rem;
        margin-top: 1rem;

        .question {
            padding-right: .75rem;
        }
    }

    // Mobile only styles
    @media only screen and (max-width: 567px) {
        .questionGroup {
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

        .question {
            width: 100%;
        }

        .singleQuestionGroup {
            padding-right: 0;

            .question {
                padding-right: 0;
            }
        }
    }
</style>