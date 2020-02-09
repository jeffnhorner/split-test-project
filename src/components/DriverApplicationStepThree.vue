<template>
    <section>
        <span v-bind:class="$style.caption">
            Select the days and times you prefer to work:
        </span>
        <div
            v-if="$mq !== 'xs' && $mq !== 'sm'"
            v-bind:class="$style.availability"
        >
            <div v-bind:class="$style.timeOfday">
                <span>Morning</span>
                <span>Afternoon</span>
                <span>Evening</span>
            </div>
            <v-data-table
                v-bind:class="$style.availabilityTable"
                v-bind:headers="days"
                v-bind:items="selections"
                v-bind:mobile-breakpoint="414"
                v-bind:disable-sort="$mq === 'xs' || $mq === 'sm'"
                hide-default-footer
            >
                <template
                    v-slot:item.Monday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Monday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Tuesday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Tuesday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Wednesday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Wednesday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Thursday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Thursday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Friday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Friday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Saturday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Saturday"
                        color="primary"
                    />
                </template>
                <template
                    v-slot:item.Sunday="{ item }"
                >
                    <v-simple-checkbox
                        v-model="item.Sunday"
                        color="primary"
                    />
                </template>
            </v-data-table>
        </div>
        <div
            v-else
            v-bind:class="$style.availabilityMobile"
        >
            <v-expansion-panels
                tile
                hover
            >
                <v-expansion-panel
                    v-for="(available, index) in availability"
                    v-bind:key="index"
                >
                    <v-expansion-panel-header>{{ available.time }}</v-expansion-panel-header>
                    <v-expansion-panel-content
                        v-for="(day, index) in available.days"
                        v-bind:key="index"
                    >
                        <v-checkbox
                            v-bind:label="day"
                            color="primary"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <span v-bind:class="$style.questionGroup">
            <v-select
                v-bind:class="$style.question"
                v-bind:items="['none', '0 - 1 years', '3 - 5 years', '5+ years']"
                placeholder="What's your motorcycle driving experience? *"
            />
            <v-text-field
                v-bind:class="$style.question"
                v-model="startDate"
                placeholder="When would you be able to start driving? *"
                v-on:click="$store.commit('setStartDateModalIsOpenState', true)"
            />
            <v-dialog
                ref="startDateModal"
                v-model="$store.state.startDateModalIsOpen"
                v-bind:return-value.sync="startDate"
                persistent
                width="29rem"
            >
                <v-date-picker
                    v-model="startDate"
                    v-bind:landscape="$mq !== 'xs' && $mq !== 'sm'"
                    scrollable
                    reactive
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        text color="primary"
                        v-on:click="$store.commit('setStartDateModalIsOpenState', false)"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text color="primary"
                        v-on:click="$refs.startDateModal.save(startDate)"
                    >
                        OK
                    </v-btn>
                </v-date-picker>
            </v-dialog>
        </span>
    </section>
</template>

<script>
    export default {
        data: () => ({
            startDate: null,
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
                        'Monday',
                        'Tuesday',
                        'Wedesnday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]
                },
                {
                    time: 'Afternoon',
                    days: [
                        'Monday',
                        'Tuesday',
                        'Wedesnday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]
                },
                {
                    time: 'Evening',
                    days: [
                        'Monday',
                        'Tuesday',
                        'Wedesnday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]
                },
            ],
        })
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