<template>
    <div v-bind:class="$style.container">
        <a href="http://www.takesplit.com">
            <g-image
                v-bind:class="$style.logo"
                src="https://splitridesv2.wpengine.com/wp-content/uploads/2019/12/logo-white.png"
            />
        </a>
        <v-card
            v-bind:class="$style.applicationWrapper"
        >
            <span v-bind:class="$style.headlineContainer">
                <p
                    v-bind:class="$style.headline"
                    v-bind:style="'margin-bottom: 0;'"
                >
                    Split Driver Application
                </p>
                <v-btn
                    outlined
                    class="white--text"
                    v-on:click="descriptionModalIsOpen = true"
                >
                    Job Description
                </v-btn>
                <v-dialog
                    v-model="descriptionModalIsOpen"
                    height="100%"
                    width="100%"
                    max-width="56rem"
                >
                    <v-card
                        v-bind:class="$style.descriptionModal"
                    >
                        <p>Split is an on-demand ride sharing platform transforming the transportation space with our low-cost and fast vehicles (Splits). Customers can get to their destination up to 50% faster then Uber or Lyft at 30% lower pricing.</p>
                        <p>Split is looking for experienced motorcycle drivers to safely get our passengers from point A to B. Earn up to $2,400/month being a Split driver.</p>
                        <span><strong>Responsibilities</strong></span>
                        <ul>
                            <li>Navigate to pick up &amp; drop off passengers</li>
                            <li>Provide feedback on improving the product</li>
                            <li>Educate new passengers on how to use the service</li>
                        </ul>
                        <span><strong>Requirements</strong></span>
                        <ul>
                            <li>At least 25 years of age</li>
                            <li>Valid motorcycle (M1) license</li>
                            <li>Pass an in-person interview</li>
                            <li>Clean driving record
                                <ul>
                                    <li>One or less minor moving violation in past 3 years (ie -&nbsp;accidents, traffic violations)</li>
                                    <li>One or less major moving violation in past 5 years (ie -&nbsp;driving on suspended license, reckless driving)</li>
                                    <li>No DUI or drug-related violations in past 10 years</li>
                                    <li>No serious-related driving convictions in past 10 years&nbsp;</li>
                                </ul>
                            </li>
                            <li>Available to work at least 10&nbsp;hours per week</li>
                        </ul>
                        <span><strong>Preferred Qualifications</strong></span>
                        <ul>
                            <li>Previous related experience</li>
                            <li>Ability to work various shifts as needed</li>
                            <li>Knowledge of local area geography and street layout</li>
                        </ul>
                        <p>We here at Split strive to build a workforce comprised of individuals with diverse backgrounds, abilities, minds, and identities that will help us to grow, not only as a company, but also as individuals. Split is an Equal Opportunity Employer.</p>
                        <v-btn
                            color="primary"
                            v-on:click="descriptionModalIsOpen = false"
                        >
                            Close Description
                        </v-btn>
                    </v-card>
                </v-dialog>
            </span>
            <div v-bind:class="$style.questionsWrapper">
                <div>
                    <v-card-title v-bind:class="$style.title">
                        <span>
                            {{ currentTitle }}
                        </span>
                    </v-card-title>
                    <span
                        v-if="step === 1"
                        v-bind:class="$style.message"
                    >
                        Want to earn $15/hr + tip by becoming a Split driver? Begin the application below and click the Next to continue and show your application progress.
                    </span>
                    <v-window v-model="step">
                        <v-window-item v-bind:value="1">
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
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        v-bind:return-value.sync="contactForm.date"
                                        persistent
                                        width="29rem"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-bind:class="$style.question"
                                                v-model="contactForm.date"
                                                placeholder="What is Your Dat of Birth? *"
                                                v-on="on"
                                            />
                                        </template>
                                        <v-date-picker
                                            v-model="contactForm.date"
                                            v-bind:landscape="$mq !== 'xs' && $mq !== 'sm'"
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
                                                v-on:click="$refs.dialog.save(contactForm.date)"
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
                        </v-window-item>
                        <v-window-item v-bind:value="3">
                            <span v-bind:class="$style.caption">Select the days and times you prefer to work:</span>
                            <div v-bind:class="$style.availability">
                                <div v-bind:class="$style.timeOfday">
                                    <span>Morning</span>
                                    <span>Afternoon</span>
                                    <span>Evening</span>
                                </div>
                                <v-data-table
                                    v-bind:class="$style.availabilityTable"
                                    v-bind:headers="days"
                                    v-bind:items="selections"
                                    v-bind:mobile-breakpoint="0"
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
                            <span v-bind:class="$style.questionGroup">
                                <v-select
                                    v-bind:class="$style.question"
                                    v-bind:items="['none', '0 - 1 years', '3 - 5 years', '5+ years']"
                                    placeholder="What's your motorcycle driving experience? *"
                                />
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    v-bind:return-value.sync="startDate"
                                    persistent
                                    width="29rem"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-bind:class="$style.question"
                                            v-model="startDate"
                                            placeholder="When would you be able to start driving? *"
                                            v-on="on"
                                        />
                                    </template>
                                    <v-date-picker
                                        v-model="startDate"
                                        v-bind:landscape="$mq !== 'xs' && $mq !== 'sm'"
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
                                            v-on:click="$refs.dialog.save(startDate)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </span>
                        </v-window-item>
                        <v-window-item v-bind:value="4">
                            <div v-bind:class="$style.uploadContainer">
                                <span v-bind:class="$style.caption">Split requires drivers to maintain an active motorcycle [M1] endorsement.</span>
                                <span v-bind:class="$style.uploadContent">
                                    <span>Drivers License [Front Picture] *</span>
                                    <v-btn
                                        depressed
                                        color="primary"
                                    >
                                        Front Picture
                                    </v-btn>
                                </span>
                                <span v-bind:class="$style.uploadContent">
                                    <span>Drivers License [Back Picture] *</span>
                                    <v-btn
                                        depressed
                                        color="primary"
                                    >
                                        Back Picture
                                    </v-btn>
                                </span>
                                <span v-bind:class="$style.uploadContent">
                                    <span>Drivers License [Front Picture]:</span>
                                    <v-btn
                                        depressed
                                        color="primary"
                                    >
                                        Please upload a resume
                                    </v-btn>
                                </span>

                            </div>
                        </v-window-item>
                        <v-window-item v-bind:value="5">
                            <div v-bind:class="$style.completedApplication">
                                <g-image
                                    v-bind:class="$style.completedLogo"
                                    src="https://fountain-uploads.s3-us-west-1.amazonaws.com/uploads/accounts/brand/square_logo/3883/Variation_1.png?X-Amz-Expires=604800&X-Amz-Date=20200204T095814Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJQOABKUE66R2SJPQ/20200204/us-west-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5cc0b877e668747b2f4adc455c0105d278f063aae263c607610a68f4d60eab85"
                                />
                                <h3 v-bind:class="$style.messageHeadline">You've successfully filled out your application!</h3>
                                <span v-bind:class="$style.message">
                                    Please verify all of your information prior to submitting.
                                </span>
                                <v-btn
                                    v-bind:class="$style.submitButton"
                                    depressed
                                    color="primary"
                                    rounded
                                >
                                    Submit Your Application
                                </v-btn>
                            </div>
                        </v-window-item>
                    </v-window>
                </div>
                <div>
                    <v-card-actions v-bind:class="$style.bottomContainer">
                        <v-btn
                            v-bind:disabled="step === 1"
                            v-bind:text="step === 1"
                            v-bind:depressed="step > 1"
                            v-on:click="formProgression(false)"
                            outlined
                            color="primary"
                        >
                            Back
                        </v-btn>
                        <v-progress-linear
                            v-show="$mq !== 'xs' && $mq !== 'sm'"
                            v-bind:class="[
                                $style.progressBar,
                                (step > 3 ? 'white--text' : null),
                            ]"
                            v-model="skill"
                            background-opacity=".1"
                            color="primary"
                            height="39"
                            striped
                        >
                            <template v-slot="{ value }">
                                <p v-bind:class="$style.progressBarMessage">Your Application Progres: <strong>{{ Math.ceil(value) }}%</strong></p>
                            </template>
                        </v-progress-linear>
                        <v-btn
                            v-bind:disabled="step === 5"
                            depressed
                            color="primary"
                            v-on:click="formProgression"
                        >
                            Next
                        </v-btn>
                    </v-card-actions>
                </div>
            </div>
        </v-card>
        <p v-bind:class="$style.footer">&copy; 2020 Split Rides, LLC.</p>
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
            descriptionModalIsOpen: false,
            step: 1,
            modal: false,
            skill: 0,
            contactForm: {
                fname: null,
                lname: null,
                email: null,
                phoneNumber: null,
                date: null,
            },
            startDate: null,
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
        }),

        computed: {
            currentTitle () {
                switch (this.step) {
                    case 1: return 'Hello, nice to meet you!'
                    case 2: return 'Just a Couple Questions...'
                    case 3: return 'Availabiliy & Experience'
                    case 4: return 'Uploads Needed'
                }
            },
        },

        methods: {
            formProgression (nextStep = true) {
                if (nextStep) {
                    this.step += 1;
                    this.skill += 100/4;

                    return;
                }

                this.step -= 1;
                this.skill -= 100/4;
            }
        }
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

        @media only screen and (max-width: 567px) {
            height: auto;
            margin: 0 1rem;
        }
    }

    .questionsWrapper {
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

        @media only screen and (max-width: 567px) {
            flex-direction: column;
        }
    }

    .headline {
        color: #fff;
        font-size: 1.25rem;
        font-weight: 900;

        @media only screen and (max-width: 567px) {
            padding-bottom: .5rem;
        }
    }

    .descriptionModal {
        background: #fff;
        padding: 2rem 3rem;

        @media only screen and (max-width: 567px) {
            padding: 1.5rem;
        }
    }

    .logo {
        margin-top: 2rem;
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

            @media only screen and (max-width: 567px) {
                font-size: 1rem;
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

    .uploadContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .caption {
            margin-bottom: 1.5rem;
        }
    }

    .uploadContent {
        display: flex;
        justify-content: space-between;
        max-width: 34rem;
        margin: 1rem auto;
        width: 100%;

        > span {
            color: rgba(0, 0, 0, .5);
            font-size: .9rem;
        }

        @media only screen and (max-width: 567px) {
            flex-direction: column;

            > span {
                margin-bottom: .5rem;
            }
        }
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

    .messageHeadline {
        color: rgba(0, 0, 0, .75);
        font-size: 2rem;
        font-weight: 300;
    }

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

    .caption {
        color: rgba(0, 0, 0, .5);
        display: flex;
        font-size: .9rem;
        font-weight: 300;
        justify-content: center;
        padding: .25rem 0 0;
    }

    .availability {
        display: flex;
        margin-bottom: 1rem;
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

    .availabilityTable {
        margin-top: 1rem;
        width: 100%;
    }

    .completedApplication {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .completedLogo {
        margin: 2rem;
        width: 5rem;
        height: 5rem;
    }

    .submitButton {
        margin-top: 1.5rem;
    }

    .footer {
        color: rgba(0, 0, 0, .3);
        font-size: .8rem;
    }
</style>