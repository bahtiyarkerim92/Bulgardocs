<template>
    <section class="recommendation">
        <h1 class="recommendation__title">Trusted by Industry Leaders</h1>
        <Swiper 
            :modules="[Pagination, Autoplay]" :pagination="{
            enabled: true,
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
            dynamicMainBullets: 2,
        }" class="recommendation__swiper" :lazy="true" :creative-effect="{
            prev: {
                shadow: false,
                translate: ['-50%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 1],
            },
        }" :breakpoints="breakpoints"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: true,
          }">
            <swiper-slide
             v-for="(recomendation, i) in exampleContent" :key="recomendation.userName + i"
                class="recommendation__slide">
                <div class="recommendation__content card-apple">
                    <div class="recommendation__image-container">
                        <img 
                        :src="recomendation.userImage" :alt="recomendation.userName"
                            class="recommendation__image"></img>
                    </div>
                    <div class="recommendation__info">
                        <div class="recommendation__rating">
                            <span v-for="(star, index) in 5" :key="index" class="recommendation__star">
                                <component :is="getStarType(recomendation.stars, index)" :filled="''" />
                            </span>
                        </div>
                        <QuoteSVG class="recommendation__quote-svg" :filled="''" />
                        <h3 class="recommendation__username">{{ recomendation.userName }}</h3>
                        <blockquote class="recommendation__quote">
                            <p class="recommendation__text">
                                {{ recomendation.recomendationsText }}
                            </p>
                            <div class="recommendation__footer">
                                <p class="recommendation__company">
                                    Company:
                                    <small v-if="recomendation.companyName">{{ recomendation.companyName }}</small>

                                </p>

                                <img 
                                v-if="recomendation.companyLogo" :src="recomendation.companyLogo" alt="image"
                                    class="recommendation__company-logo">
                            </div>
                        </blockquote>
                    </div>
                </div>
            </swiper-slide>
        </Swiper>
    </section>
</template>

<script setup lang="ts">
import {
    Pagination,
    Autoplay,
} from "swiper/modules";
import starSVG from "./public/svg/star.svg";
import QuoteSVG from "./public/svg/quote.svg";
import startNoFill from './public/svg/starNoFill.svg';
import starHalfSVG from './public/svg/starHalf.svg';


const exampleContent = [
    {
        userImage: '/img/dobromir.jpg',
        stars: 4.5,
        userName: 'Dobromir Ivanov',
        recomendationsText: "This TMS platform streamlines our shipping operations by providing real-time tracking and efficient route optimization, leading to significant cost savings and improved delivery times.",
        companyName: 'Eco Trans',
        companyLogo: '/img/s4t.jpg'
    },

    {
        userImage: '/img/dobromir.jpg',
        stars: 5,
        userName: 'Monika Fecowicz',
        recomendationsText: "The customer support team from Pickup2 is outstanding. They're always available to help with any issues or to provide guidance on how to make the most of the system's features.",
        companyName: 'Falkon International sp. z o.o.',
        companyLogo: '/img/falkon.jpg'
    },
    {
        userImage: '/img/Ivanov.jpg',
        stars: 5,
        userName: 'Ivan Ivanov',
        recomendationsText: "Adopting this TMS has transformed our logistics operations. Its integration capabilities with other tools are seamless, making it an indispensable part of our workflow.",
        companyName: 'Eurocros EOOD',
        companyLogo: '/img/eurocros.jpg'
    },
     {
        userImage: '/img/dobromir.jpg',
        stars: 5,
        userName: 'Łukasz Dobierski',
        recomendationsText: "The customer support team from Pickup2 is exemplary. They're always available to help with any issues and to guide us in leveraging all of the platform's features effectively.",
        companyName: 'Acus Transport Sp. z o.o.',
        companyLogo: '/img/acus.jpg'
    },

];

const getStarType = (rating: number, index: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    if (index < fullStars) {
        return starSVG;
    }
    else if (index === fullStars && hasHalfStar) {
        return starHalfSVG;
    }
    else {
        return startNoFill;
    }
};


const breakpoints = {
    0: {
        slidesPerView: 1,
        spacebetween: 20,
    },

    768: {
        spacebetween: 10,
        slidesPerView: 2,
    },
    1200: {
        spacebetween: 20,
        slidesPerView: 3,
    },
};
</script>

<style scoped lang="scss">
:deep(.swiper-pagination) {
    margin-top: 6rem;
    
    .swiper-pagination-bullet-active {
        background: var(--primary);
    }
}

.recommendation {
    padding: 12rem 2rem;
    max-width: 1200px;
    margin: 0 auto;

    &__title {
        text-align: center;
        margin-bottom: 8rem;
    }

    &__swiper {
        width: 100%;
        height: 100%;
        padding-bottom: 6rem;
    }

    &__slide {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
    }

    &__content {
        position: relative;
        background: #ffffff;
        padding: 4rem 3rem;
        text-align: center;
        width: 100%;
        max-width: 36rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__image-container {
        width: 10rem;
        height: 10rem;
        margin-bottom: 2.5rem;
        overflow: hidden;
        border-radius: 50%;
        border: 4px solid var(--alice-blue);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    &__rating {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        gap: 0.4rem;
    }

    &__star {
        width: 1.8rem;
        height: 1.8rem;
        color: #ff9500;
    }

    &__username {
        font-size: 2rem;
        font-weight: 700;
        color: var(--secondary);
        margin-bottom: 1.5rem;
    }

    &__quote-svg {
        height: 3rem;
        width: 3rem;
        color: var(--primary);
        opacity: 0.2;
        margin-bottom: 2rem;
    }

    &__text {
        font-size: 1.6rem;
        line-height: 1.7;
        color: var(--slate-blue);
        margin-bottom: 3rem;
        font-style: italic;
    }

    &__footer {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-line);
        width: 100%;
        justify-content: center;
    }

    &__company {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--secondary);
        text-align: left;

        small {
            display: block;
            font-size: 1.2rem;
            color: var(--slate-blue);
            font-weight: 400;
        }
    }

    &__company-logo {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: contain;
        border-radius: 0.6rem;
    }
}
</style>