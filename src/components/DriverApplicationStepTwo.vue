<template>
    <VCardText
        v-if="isReady"
        v-bind:class="$style.stepContainer"
    >
        <span v-bind:class="$style.questionGroup">
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['yes', 'no']"
                v-model="phaseQuestions2.question1"
                v-on:change="$v.phaseQuestions2.question1.$touch()"
                v-on:rules="validationRule($v, 'question1', 'This field is required', 'phaseQuestions2')"
                placeholder="Are you over the age of 25? *"
            />
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['yes', 'no']"
                v-model="phaseQuestions2.question2"
                v-on:change="$v.phaseQuestions2.question2.$touch()"
                v-on:rules="validationRule($v, 'question2', 'This field is required', 'phaseQuestions2')"
                placeholder="Do you have a valid motorcycle (M1) license? *"
            />
        </span>
        <span v-bind:class="$style.questionGroup">
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['yes', 'no']"
                v-model="phaseQuestions2.question3"
                v-on:change="$v.phaseQuestions2.question3.$touch()"
                v-on:rules="validationRule($v, 'question3', 'This field is required', 'phaseQuestions2')"
                placeholder="Are you able to commute to Marina Del Rey? *"
            />
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['no experience', 'little experience', 'some experience', 'very experienced']"
                v-model="phaseQuestions2.question4"
                v-on:change="$v.phaseQuestions2.question4.$touch()"
                v-on:rules="validationRule($v, 'question4', 'This field is required', 'phaseQuestions2')"
                placeholder="How experienced are you with lane spliting? *"
            />
        </span>
        <span v-bind:class="$style.singleQuestionGroup">
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['0 - 10', '10 - 20', '20 - 30', '30 - 40']"
                v-model="phaseQuestions2.question5"
                v-on:change="$v.phaseQuestions2.question5.$touch()"
                v-on:rules="validationRule($v, 'question5', 'This field is required', 'phaseQuestions2')"
                placeholder="How many hours per week do you prefer to work? *"
            />
        </span>
    </VCardText>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';

    export default {
        /**
         * Initial Vue component reactive data.
         *
         * @link https://vuejs.org/v2/api/#Options-Data
         */
        data: () => ({
            isReady: false,
            phaseQuestions2: {
                question1: null,
                question2: null,
                question3: null,
                question4: null,
                question5: null,
            }
        }),

        /**
         * Vue life-cycle hook called synchronously after the Vue instance is created.
         *
         * @link https://vuejs.org/v2/api/#created
         */
        async created () {
            // Dynamically import the validationRule utility function
            const { default: validationRule } = await import('~/utilities/validationRule.js');

            this.validationRule = validationRule;

            this.isReady = true;

            // Upon component creation, set the global vuelidate object so we can access it
            // within all components.
            this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);

            // Since Vuetify's VWindow component requires the child VWindowItem components to
            // use vue's v-show directive (so you don't lose data when you go forward or backward
            // between appliation phases), we must watch the global applicationPhase value and only
            // update the global vuelidate object when the applicationPhase equals the appropriate
            // DriverApplicationStep component. (i.e. this single file component's name is
            // DriverApplicationStepThree, therefore, whenever the globalApplicatonPhase === 3,
            // this updates the global formValidation object with this component's vuelidate validations).
            // This is required for when the user is navigating the application with the global next and back
            // navigation buttons and we want to ensure they've filled out the required fields before
            // going to the next step.
            this.$watch('$store.state.applicationPhase', () => {
                // Set the global state's validationObject to the validations being defined in this component's
                // vuelidate validation object below.
                if (this.$store.state.applicationPhase === 2) {
                    this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);
                }
            });
        },

        /**
         * Vuelidate validation object for validating explicit form fields.
         *
         * @link https://vuelidate.js.org/#getting-started
         * @link https://vuelidate.js.org/#validators
         */
        validations: {
            phaseQuestions2: {
                question1: {
                    required,
                },
                question2: {
                    required,
                },
                question3: {
                    required,
                },
                question4: {
                    required,
                },
                question5: {
                    required,
                },
            },
            validationGroup: ['phaseQuestions2'],
        },
    }
</script>

<style lang="scss" module>
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