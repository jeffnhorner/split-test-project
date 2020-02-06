<template>
    <v-app light>
        <slot/>
    </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
    font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif;
    margin:0;
    padding:0;
    line-height: 1.5;
}
</style>
