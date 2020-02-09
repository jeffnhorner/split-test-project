<template>
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
                placeholder="Do you have a valid motorcycle (M1) license? *"
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
</template>

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