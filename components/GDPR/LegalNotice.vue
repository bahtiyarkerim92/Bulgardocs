<template>
  <Breadcrumb />
  <section class="gdpr">
    <div class="gdpr__container">
      <h1 class="gdpr__title">Legal Notice</h1>
      <p class="gdpr__text">
        PickUp2
        <br />
        Freight Forwarding Company
      </p>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Address:</h3>
        <ol class="gdpr__list">
          <li>Stara Planina 1,</li>
          <li>7900 Omurtag,</li>
          <li>Bulgaria</li>
        </ol>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Contact Information:</h3>
        <ol class="gdpr__list">
          <li>
            Email:
            <a href="mailto:contact@pickup2.com" class="gdpr__link">contact@pickup2.com</a>
          </li>
          <li>
            Website:
            <a href="https://pickup2.com" class="gdpr__link">www.pickup2.com</a>
          </li>
          <li>Phone Number: +359888800330</li>
        </ol>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Legal Representatives:</h3>
        <p class="gdpr__section-text">
          Dobromir Ivanov
          <br />
          Position:Managing Director
        </p>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">VAT Identification Number:</h3>
        <p>BG207937426</p>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Commercial Register:</h3>
        <ol class="gdpr__list">
          <li>Company Registration Number: BG207937426</li>
          <li>Registered at: Registry Agency (Bulgaria)</li>
        </ol>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Responsible for Content (as per § 55 Abs. 2 RStV):</h3>
        <ol class="gdpr__list">
          <li>Dobrimir Ivanov</li>
          <li>PickUp2, Stara Planina 1, 7900 Omurtag, Bulgaria</li>
        </ol>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">EU Dispute Resolution</h3>
        <p class="gdpr__section-text">
          The European Commission provides a platform for online dispute resolution (ODR):
        </p>
        <ol class="gdpr__list">
          <li>
            <a href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>
          </li>
        </ol>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Liability for Content</h3>
        <p class="gdpr__section-text">
          The content on our website has been created with the utmost care. However, we cannot
          guarantee the accuracy, completeness, or timeliness of the content. As a service provider,
          we are responsible for our own content on these pages under the general laws according to
          § 7 Abs.1 TMG (German Telemedia Act). However, according to §§ 8 to 10 TMG, we are not
          obligated to monitor transmitted or stored external information or to investigate
          circumstances that indicate illegal activity. Obligations to remove or block the use of
          information under general law remain unaffected. Any liability in this respect, however,
          is only possible from the time of knowledge of a concrete violation of law. Upon
          notification of such violations, we will remove this content immediately.
        </p>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Liability for Links</h3>
        <p class="gdpr__section-text">
          Our website contains links to external third-party websites. We have no influence on the
          content of these websites, therefore, we cannot assume any liability for such external
          content. The respective provider or operator of the pages is always responsible for the
          content of the linked pages. The linked pages were checked for possible legal violations
          at the time of linking. Illegal content was not recognizable at the time of linking.
          Permanent monitoring of the content of the linked pages is unreasonable without concrete
          evidence of a violation of the law. Upon notification of legal violations, we will remove
          such links immediately.
        </p>
      </div>
      <div class="gdpr__section">
        <h3 class="gdpr__section-title">Copyright</h3>
        <p class="gdpr__section-text">
          The content and works created by the website operators on these pages are subject to
          Bulgarian copyright law. The duplication, editing, distribution, and any kind of use
          outside the limits of copyright require the written consent of the respective author or
          creator. Downloads and copies of this site are only permitted for private, non-commercial
          use. Insofar as the content on this site was not created by the operator, the copyrights
          of third parties are respected. In particular, third-party content is identified as such.
          Should you nevertheless become aware of a copyright infringement, please inform us. Upon
          notification of legal violations, we will remove such content immediately.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  onMounted(() => {
    document.querySelector('.header').style.background = 'var(--main-blue)';
  });
  onBeforeUnmount(() => {
    document.querySelector('.header').style.background = '';
  });
</script>

<style lang="scss" scoped>
  .gdpr {
    margin-top: 100px;
    &__container {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    &__title,
    &__subtitle {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    &__title {
      font-size: $default-head-one-size;
      font-weight: 600;
      color: var(--main-blue);
    }

    &__subtitle {
      font-size: $default-head-two-size;
      font-weight: 500;
    }

    &__text {
      font-size: 1.6rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    &__section {
      margin-bottom: 2rem;
      h4 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 10px auto;
      }
    }

    &__section-title {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    &__section-text {
      font-size: 1.6rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    &__list {
      margin-left: 5rem;
    }

    &__list li {
      list-style-type: disc;
      margin-bottom: 0.5rem;
    }

    &__link {
      color: var(--baby-blue);
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
