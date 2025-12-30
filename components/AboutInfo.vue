<template>
  <div class="content-center">
    <h2 class="content-center__title">{{ title }}</h2>
    
     <p class="content-center__text"
            v-for="(paragraphText, index) in text"
            :key="paragraphText + index"
          >
          <br>
            {{ $rt(paragraphText) }}
          </p>
    <img :src="image" :alt="imageAlt" class="content-center__image" >
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  text?: string[] | {} | string | null;
  image?: string;
  imageAlt?: string;
}

withDefaults(defineProps<Props>(), {
    text: null,
    image: null,
    imageAlt: null,
});

</script>

<style scoped lang="scss">
.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 100px auto;
  padding: 0 15px;
  max-width: 100%;

  &__title {
    font-size: $default-head-one-size;
    font-weight: 600;
    margin-bottom: 3rem;
    text-transform: uppercase;
    color: var(--main-blue);
  }

  &__text {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    font-weight: 200;
  }

  &__image {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-top: 15px;
  }
}

.divider {
  max-width: 1000px;
  height: 1px;
  background-color: var(--pc2-blue);
  margin: 0 auto;
}

@media screen and (min-width: $breakpoint_small) {
  .content-center {
    max-width: 700px;

    &__image {
      max-width: 80%;
      margin-top: 20px;
    }
  }
}

@media screen and (min-width: $breakpoint_large) {
  .content-center {
    max-width: 900px;

    &__image {
      max-width: 1200px;
      margin-top: 25px;
    }
  }
}
</style>
