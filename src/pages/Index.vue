<template>
  <Layout>
      <DriverApplication />
  </Layout>
</template>

<script>
export default {
    metaInfo: {
        title: 'Hello, world!'
    },

    components: {
        DriverApplication: () => import('~/components/DriverApplication'),
    }
}
</script>
