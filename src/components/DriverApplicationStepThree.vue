<template>
    <section v-if="isReady">
        <span
            v-bind:class="$style.caption"
        >
            Select the days and times you prefer to work *
        </span>
        <div
            v-if="!isMobile"
            v-bind:class="$style.availability"
        >
            <div v-bind:class="$style.timeOfday">
                <span>Morning</span>
                <span>Afternoon</span>
                <span>Evening</span>
            </div>
            <VDataTable
                v-bind:class="$style.availabilityTable"
                v-bind:headers="days"
                v-bind:items="selections"
                v-bind:mobile-breakpoint="414"
                v-bind:disable-sort="isMobile"
                hide-default-footer
            >
                <template
                    v-slot:item.Monday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Monday"
                        color="primary"
                        v-on:input="setAvailability('Monday')"
                    />
                </template>
                <template
                    v-slot:item.Tuesday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Tuesday"
                        color="primary"
                        v-on:input="setAvailability('Tuesday')"
                    />
                </template>
                <template
                    v-slot:item.Wednesday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Wednesday"
                        color="primary"
                        v-on:input="setAvailability('Wednesday')"
                    />
                </template>
                <template
                    v-slot:item.Thursday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Thursday"
                        color="primary"
                        v-on:input="setAvailability('Thursday')"
                    />
                </template>
                <template
                    v-slot:item.Friday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Friday"
                        color="primary"
                        v-on:input="setAvailability('Friday')"
                    />
                </template>
                <template
                    v-slot:item.Saturday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Saturday"
                        color="primary"
                        v-on:input="setAvailability('Saturday')"
                    />
                </template>
                <template
                    v-slot:item.Sunday="{ item }"
                >
                    <VSimpleCheckbox
                        v-model="item.Sunday"
                        color="primary"
                        v-on:input="setAvailability('Sunday')"
                    />
                </template>
            </VDataTable>
        </div>
        <div
            v-else
            v-bind:class="$style.availabilityMobile"
        >
            <VExpansionPanels
                tile
                hover
            >
                <VExpansionPanel
                    v-for="(available, index) in availability"
                    v-bind:key="index"
                >
                    <VExpansionPanelHeader>
                        {{ available.time }}
                    </VExpansionPanelHeader>
                    <VExpansionPanelContent
                        v-for="(day, index) in available.days"
                        v-bind:key="index"
                    >
                        <v-checkbox
                            v-bind:label="day.split('-')[0]"
                            v-on:change="setMobileAvailability(day, available)"
                            v-model="mobileAvailability[day]"
                            color="primary"
                        />
                    </VExpansionPanelContent>
                </VExpansionPanel>
            </VExpansionPanels>
        </div>
        <span v-bind:class="$style.questionGroup">
            <VSelect
                v-bind:class="$style.question"
                v-bind:items="['none', '0 - 1 years', '3 - 5 years', '5+ years']"
                v-model="phaseQuestions3.experience"
                v-on:change="$v.phaseQuestions3.experience.$touch()"
                v-on:rules="validationRule($v, 'experience', 'This field is required', 'phaseQuestions3')"
                placeholder="What's your motorcycle driving experience? *"
            />
            <VTextField
                v-bind:class="$style.question"
                v-model="phaseQuestions3.startDate"
                v-on:input="$v.phaseQuestions3.startDate.$touch()"
                v-bind:rules="validationRule($v, 'startDate', 'You must select a start date', 'phaseQuestions3')"
                placeholder="When would you be able to start driving? *"
                v-on:click="$store.commit('setStartDateModalIsOpenState', true)"
            />
            <VDialog
                ref="startDateModal"
                v-model="$store.state.startDateModalIsOpen"
                v-bind:return-value.sync="phaseQuestions3.startDate"
                persistent
                width="29rem"
            >
                <VDatePicker
                    v-model="phaseQuestions3.startDate"
                    v-bind:landscape="!isMobile"
                    scrollable
                    reactive
                >
                    <VSpacer />
                    <VBtn
                        text color="primary"
                        v-on:click="$store.commit('setStartDateModalIsOpenState', false)"
                    >
                        Cancel
                    </VBtn>
                    <VBtn
                        text color="primary"
                        v-on:click="$refs.startDateModal.save(phaseQuestions3.startDate)"
                    >
                        OK
                    </VBtn>
                </VDatePicker>
            </VDialog>
        </span>
    </section>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators';

    export default {
        /**
         * Initial Vue component reactive data.
         *
         * @link https://vuejs.org/v2/api/#Options-Data
         */
        data: () => ({
            phaseQuestions3: {
                startDate: null,
                experience: null,
                selectedAvailability: [],
            },
            mobileAvailability: [],
            isReady: false,
            days: [
                {
                    text: 'Mon',
                    value: 'Monday',
                    checkbox: false,
                },
                {
                    text: 'Tue',
                    value: 'Tuesday',
                    checkbox: false,
                },
                {
                    text: 'Wed',
                    value: 'Wednesday',
                    checkbox: false,
                },
                {
                    text: 'Thur',
                    value: 'Thursday',
                    checkbox: false,
                },
                {
                    text: 'Fri',
                    value: 'Friday',
                    checkbox: false,
                },
                {
                    text: 'Sat',
                    value: 'Saturday',
                    checkbox: false,
                },
                {
                    text: 'Sun',
                    value: 'Sunday',
                    checkbox: false,
                },
            ],
            selections: [
                {
                    Monday: false,
                    Tuesday: false,
                    Wednesday: false,
                    Thursday: false,
                    Friday: false,
                    Saturday: false,
                    Sunday: false,
                },
                {
                    Monday: false,
                    Tuesday: false,
                    Wednesday: false,
                    Thursday: false,
                    Friday: false,
                    Saturday: false,
                    Sunday: false,
                },
                {
                    Monday: false,
                    Tuesday: false,
                    Wednesday: false,
                    Thursday: false,
                    Friday: false,
                    Saturday: false,
                    Sunday: false,
                },
            ],
            availability: [
                {
                    time: 'Morning',
                    days: [
                        'Monday-1',
                        'Tuesday-1',
                        'Wedesnday-1',
                        'Thursday-1',
                        'Friday-1',
                        'Saturday-1',
                        'Sunday-1',
                    ]
                },
                {
                    time: 'Afternoon',
                    days: [
                        'Monday-2',
                        'Tuesday-2',
                        'Wedesnday-2',
                        'Thursday-2',
                        'Friday-2',
                        'Saturday-2',
                        'Sunday-2',
                    ]
                },
                {
                    time: 'Evening',
                    days: [
                        'Monday-3',
                        'Tuesday-3',
                        'Wedesnday-3',
                        'Thursday-3',
                        'Friday-3',
                        'Saturday-3',
                        'Sunday-3',
                    ]
                },
            ],
        }),

        /**
         * Vue computed properties are cached, and only re-computed on reactive dependency changes.
         *
         * @link https://vuejs.org/v2/api/#computed
         */
        computed: {
            isMobile () {
                return this.$mq === 'xs' || this.$mq === 'sm'
            },
        },

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
                // Set the global state's validationObject to the validations being defined in this
                // component's vuelidate validation object below.
                if (this.$store.state.applicationPhase === 3) {
                    this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);
                }
            });
        },

        /**
         * Non-cached Vue methods.
         *
         * @link https://vuejs.org/v2/api/#methods
         */
        methods: {
            /**
             * Set's the User's selected availability.
             *
             * @param  {String}  day The day that the user is selecting availability for.
             */
            async setAvailability (day) {
                // Since Vuetify data tables don't include a vertical header, in order to build the
                // selectedAvailability array, we need to go outside of Vue's reactivity & shadow DOM and
                // use some good ole plain javascript.

                // Select all of the the table options
                const tableOptions = document.querySelectorAll('td i');
                let timeOfDay = null;
                let tableOptionIndex = null

                // We need to use Vue's $nextTick helper to wait for the next DOM tick in order to
                // see if any of the table options have been update with the .mdi-checkbox-mark class
                // which let's us know the user has selected that option.
                // see https://vuejs.org/v2/api/#vm-nextTick
                await this.$nextTick(() => {
                    tableOptions.forEach((option, index) => {
                        // If the table option has the active class & doesn't have a unique identifier,
                        // set the table option index the user just selected.
                        if (option.className.includes('mdi-checkbox-mark') && !option.hasAttribute('identifier')) {
                            tableOptionIndex = index;
                        }
                    });

                    // This essentially let's us know what time of the day the user is selecting.
                    // The first table row is morning, second row is afternoon, and the third is
                    // the evening.
                    timeOfDay = tableOptionIndex <= 6
                        ? 'Morning'
                        : tableOptionIndex > 6 && tableOptionIndex <= 13
                            ? 'Afternoon'
                            : 'Evening'

                    // This will let us identify if we're trying to add any duplicated selected day/time to the
                    // selectedAvailability array.
                    const timeSlotAlreadyAdded = this.phaseQuestions3.selectedAvailability.find(selection => selection === day + timeOfDay);

                    // As long as the time/day hasn't already been added & there's a day defined, push the selected
                    // day/time into the selectedAvailability array.
                    if (!timeSlotAlreadyAdded && (tableOptionIndex || tableOptionIndex === 0)) {
                        this.phaseQuestions3.selectedAvailability.push(day + timeOfDay);
                        // We'll sent a unique attribute on the table option's html element so we can remove it
                        // on a later check.
                        tableOptions[tableOptionIndex].setAttribute('identifier', day + timeOfDay);
                        // We must reset the day after the selected day/time is pushed into the array.
                    } else {
                        // Here we'll search to see if any of the table options have the identifier without the active
                        // class given to the table options when they are checked. If they have the identifier without
                        // the active class, we know we need to remove it from the selectedAvailability array.
                        tableOptions.forEach(option => {
                            if (option.hasAttribute('identifier') && !option.className.includes('mdi-checkbox-mark')) {
                                const uncheckedInput = option.getAttribute('identifier');
                                // Remove the unique identifier
                                option.removeAttribute('identifier');

                                this.phaseQuestions3.selectedAvailability = this.phaseQuestions3.selectedAvailability.filter(id => id !== uncheckedInput);
                            }
                        })
                    }
                });
            },

            /**
             * Set's the User's selected availability on mobile.
             *
             * @param  {String}  day  The day the user is selecting.
             * @param  {String}  time The destructured time value from the static selectedAvailability array.
             */
            setMobileAvailability (day, { time }) {
                if (
                    this.mobileAvailability[day]
                    && !this.phaseQuestions3.selectedAvailability.includes(day + time)
                ) {
                    // Format the day so the mobile selections match the desktop selections and the API receives
                    // the same formatted availability.
                    day = day.split('-')[0];

                    this.phaseQuestions3.selectedAvailability.push(day + time);
                } else {
                    this.phaseQuestions3.selectedAvailability = this.phaseQuestions3.selectedAvailability
                        .filter(selectedDay => day.split('-')[0] + time !== selectedDay);
                }
            }
        },

        /**
         * Vuelidate validation object for validating explicit form fields.
         *
         * @link https://vuelidate.js.org/#getting-started
         * @link https://vuelidate.js.org/#validators
         */
        validations: {
            phaseQuestions3: {
                experience: {
                    required,
                },
                startDate: {
                    required,
                },
                selectedAvailability: {
                    required,
                    minLength: minLength(1),
                },

            },
            validationGroup: ['phaseQuestions3'],
        }
    }
</script>

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

    .timeOfday {
        color: rgba(0, 0, 0, .5);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 4.75rem;
        padding-bottom: 1rem;
        margin-right: 1rem;
        margin-bottom: .2rem;
        text-align: right;
        font-size: .75rem;
        font-weight: 700;
    }

    .availability {
        display: flex;
        margin-bottom: 1rem;
    }

    .availabilityTable {
        margin-top: 1rem;
        width: 100%;
    }

    .availabilityMobile {
        margin: 2rem 0 1.5rem;
    }

    .dataTableValidatonError {
        color: #ff5252;
        font-size: .9rem;
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