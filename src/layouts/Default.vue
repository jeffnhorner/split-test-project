<template>
    <v-app light>
        <slot/>
        <p v-bind:class="$style.footer">&copy; 2020 Split Rides, LLC.</p>
    </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style module>
    body {
        font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif;
        margin:0;
        padding:0;
        line-height: 1.5;
    }

    .footer {
        color: rgba(0, 0, 0, .3);
        font-size: .8rem;
    }
</style>
