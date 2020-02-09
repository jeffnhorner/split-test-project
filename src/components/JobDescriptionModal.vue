<template>
    <VDialog
        v-model="$store.state.jobDescriptionModalIsOpen"
        height="100%"
        width="100%"
        max-width="56rem"
    >
        <VCard
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
            <br />
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
            <br />
            <span><strong>Preferred Qualifications</strong></span>
            <ul>
                <li>Previous related experience</li>
                <li>Ability to work various shifts as needed</li>
                <li>Knowledge of local area geography and street layout</li>
            </ul>
            <br />
            <p>We here at Split strive to build a workforce comprised of individuals with diverse backgrounds, abilities, minds, and identities that will help us to grow, not only as a company, but also as individuals. Split is an Equal Opportunity Employer.</p>
            <VBtn
                color="primary"
                v-on:click="$store.commit('setJobDescriptionModalState', false)"
            >
                Close Description
            </VBtn>
        </VCard>
    </VDialog>
</template>

<style lang="scss" module>
    .descriptionModal {
        background: #fff;
        padding: 2rem 3rem;

        > * {
            color: rgba(0, 0, 0, .7);
        }

        @media only screen and (max-width: 567px) {
            padding: 1.5rem;
        }
    }
</style>