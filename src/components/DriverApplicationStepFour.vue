<template>
    <div v-bind:class="$style.uploadContainer">
        <span v-bind:class="$style.caption">
            Split requires drivers to maintain an active motorcycle [M1] endorsement.
        </span>
        <div v-bind:class="$style.uploadContent">
            <span>Drivers License [Front Picture] *</span>
            <v-progress-circular
                v-if="isUploadingImage && selectedFile === 'frontDriverLicense'"
                v-bind:class="$style.uploadingIcon"
                v-bind:size="24"
                color="primary"
                indeterminate
            />
            <div v-else>
                <VBtn
                    v-if="selectedFile !== 'frontDriverLicense' && !uploadedFiles.includes('frontDriverLicense')"
                    depressed
                    color="primary"
                    v-on:click="$refs.frontDriverLicenseFile.click()"
                >
                <input
                    ref="frontDriverLicenseFile"
                    type="file"
                    style="display: none;"
                    v-on:input="updateSelectedFile('frontDriverLicense')"
                >
                    Front Picture
                </VBtn>
                <span
                    v-else-if="!uploadedFiles.includes('frontDriverLicense')"
                    v-bind:class="$style.uploadContainerActions"
                >
                    <VBtn
                        depressed
                        color="primary"
                        v-on:click="uploadSelectedFile"
                    >
                        Upload
                    </VBtn>
                    <VBtn
                        depressed
                        color="primary"
                        outlined
                        v-on:click="phaseQuestions4.frontDriversLicenseUploaded = null; selectedFile = ''"
                    >
                        Reset
                    </VBtn>
                </span>
                <p
                    v-else
                    v-bind:class="$style.successMessage"
                    style="marginBottom: .45rem;"
                >
                    File Uploaded Successfully!
                </p>
            </div>
        </div>
        <div v-bind:class="$style.uploadContent">
            <span>Drivers License [Back Picture] *</span>
            <v-progress-circular
                v-if="isUploadingImage && selectedFile === 'backDriverLicense'"
                v-bind:class="$style.uploadingIcon"
                v-bind:size="20"
                color="primary"
                indeterminate
            />
            <div v-else>
                <VBtn
                    v-if="selectedFile !== 'backDriverLicense' && !uploadedFiles.includes('backDriverLicense')"
                    depressed
                    color="primary"
                    v-on:click="$refs.backDriverLicenseFile.click()"
                >
                <input
                    ref="backDriverLicenseFile"
                    type="file"
                    style="display: none;"
                    v-on:input="updateSelectedFile('backDriverLicense')"
                >
                    Back Picture
                </VBtn>
                <span
                    v-else-if="!uploadedFiles.includes('backDriverLicense')"
                    v-bind:class="$style.uploadContainerActions"
                >
                    <VBtn
                        depressed
                        color="primary"
                        v-on:click="uploadSelectedFile"
                    >
                        Upload
                    </VBtn>
                    <VBtn
                        depressed
                        color="primary"
                        outlined
                        v-on:click="phaseQuestions4.backDriversLicenseUploaded = null; selectedFile = ''"
                    >
                        Reset
                    </VBtn>
                </span>
                <p
                    v-else
                    v-bind:class="$style.successMessage"
                    style="marginBottom: .45rem;"
                >
                    File Uploaded Successfully!
                </p>
            </div>
        </div>
        <div v-bind:class="$style.uploadContent">
            <span>Resume [Optional]:</span>
            <v-progress-circular
                v-if="isUploadingImage && selectedFile === 'resume'"
                v-bind:class="$style.uploadingIcon"
                v-bind:size="20"
                color="primary"
                indeterminate
            />
            <div v-else>
                <VBtn
                    v-if="selectedFile !== 'resume' && !phaseQuestions4.imageData.resume && !uploadedFiles.includes('resume')"
                    depressed
                    color="primary"
                    v-on:click="$refs.resumeFile.click()"
                >
                <input
                    ref="resumeFile"
                    type="file"
                    style="display: none;"
                    v-on:input="updateSelectedFile('resume')"
                >
                    Please upload a resume
                </VBtn>
                <span
                    v-else-if="!uploadedFiles.includes('resume')"
                    v-bind:class="$style.uploadContainerActions"
                >
                    <VBtn
                        depressed
                        color="primary"
                        v-on:click="uploadSelectedFile"
                    >
                        Upload
                    </VBtn>
                    <VBtn
                        depressed
                        color="primary"
                        outlined
                        v-on:click="phaseQuestions4.imageData = {}"
                    >
                        Reset
                    </VBtn>
                </span>
                <p
                    v-else
                    v-bind:class="$style.successMessage"
                    style="marginBottom: .45rem;"
                >
                    File Uploaded Successfully!
                </p>
            </div>
        </div>
    </div>
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
            phaseQuestions4: {
                imageData: {},
                frontDriversLicenseUploaded: null,
                backDriversLicenseUploaded: null,
            },
            isUploadingImage: false,
            selectedFile: '',
            uploadValue: 0,
        }),

        /**
         * Vue computed properties are cached, and only re-computed on reactive dependency changes.
         *
         * @link https://vuejs.org/v2/api/#computed
         */
        computed: {
            uploadedFiles () {
                return this.$store.state.uploadedFiles;
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
                if (this.$store.state.applicationPhase === 4) {
                    this.$store.commit('setCurrentFormPhaseValidationObject', this.$v);
                }
            });

            // Watch the reactive uploadValue property so we can reset it once a file has been uploaded.
            this.$watch('uploadValue', () => {
                if (this.uploadValue === 100) {
                    // Update the vuex uploadedFiles array state with the file type that was just uploaded.
                    this.$store.commit('setUploadedFiles', Object.keys(this.phaseQuestions4.imageData).pop());
                    // Reset the uploading states
                    this.isUploadingImage = false;
                    this.uploadValue = 0;
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
             * This will trigger a click event on the file upload the user is engaging.
             *
             * @param  {String}  ref The value of what ref element is being used.
             */
            instantiateFileUploader (ref) {
                // Open the the native file browser
                ref.click();
            },

            /**
             * This will update the imageData with the current file the user is trying to upload
             *
             * @param  {String}  fileName The file type the user is uploading.
             */
            updateSelectedFile (fileName) {
                // Assign phaseQuestions4.imageData to the first file in the files array list.
                this.phaseQuestions4.imageData[fileName] = event.target.files[0];

                // If the fileName is the front driver's license, validate the upload flag
                if (fileName === 'frontDriverLicense') {
                    this.phaseQuestions4.frontDriversLicenseUploaded = true;
                }

                // If the fileName is the back driver's license, validate the upload flag
                if (fileName === 'backDriverLicense') {
                    this.phaseQuestions4.backDriversLicenseUploaded = true;
                }

                this.selectedFile = fileName;
            },

            /**
             * This will upload the selected file to the Firebase cloud db.
             *
             */
            async uploadSelectedFile () {
                // Dynamically import firebase where we need to use it.
                const { default: firebase } = await import('firebase');

                const file = Object.values(this.phaseQuestions4.imageData)[0];

                const storageRef = firebase.storage().ref(`${file.name}`).put(file);

                storageRef.on('state_changed', snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.isUploadingImage = true;
                }, error => {
                    // Temporary
                    console.log(error.message);
                });
            },
        },

        /**
         * Vuelidate validation object for explicitly validating form fields.
         *
         * @link https://vuelidate.js.org/#getting-started
         * @link https://vuelidate.js.org/#validators
         */
        validations: {
            phaseQuestions4: {
                frontDriversLicenseUploaded: {
                    required,
                },
                backDriversLicenseUploaded: {
                    required,
                },
            },
            validationGroup: ['phaseQuestions4'],
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
        align-items: center;
        display: flex;
        justify-content: space-between;
        max-width: 34rem;
        margin: 1rem auto;
        width: 100%;

        > span {
            color: rgba(0, 0, 0, .5);
            font-size: .9rem;
        }
    }

    .uploadingIcon {
        margin: .4rem 0;
    }

    .uploadContainerActions {
        display: flex;

        > button:first-of-type {
            margin-right: .5rem;
        }
    }

    .successMessage {
        color: rgba(0, 0, 0, .5);
        font-size: .9rem;
        margin: .5rem 0;
    }

    @media only screen and (max-width: 567px) {
        .uploadContainer {
            margin-bottom: .5rem;

            .caption {
                margin-bottom: .5rem;
            }
        }

        .uploadContent {
            flex-direction: column;

            > span {
                margin-bottom: .5rem;
            }
        }
    }
</style>