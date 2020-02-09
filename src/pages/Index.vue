<template>
  <Layout>
      <DriverApplication />
  </Layout>
</template>

<script>
export default {
    metaInfo: {
        title: "Become a Take Split Driver | Driver Application"
    },

    components: {
        DriverApplication: () => import('~/components/DriverApplication'),
    }
}
</script>
