<script setup>
import Header from '../components/MainHeader.vue';
import MainButton from '../components/MainButton.vue';
import Logo from '../components/MainLogo.vue';
</script>

<template>
  <div class="membership_body w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col">
    <Header>
      <div class="membership_title flex flex-col gap-4 min-h-[100%]">
        <div class="w-full max-w-[100%] md:max-w-[160px]">
        <Logo />
      </div>
        <h1 class="text-6xl !font-aeonik leading-[1em] tracking-[-0.025em] text-balance mt-auto">You bring the hustle.
          <br />We'll bring the power outlets.
        </h1>
      </div>
    </Header>
    <div class="membership_main flex flex-col pt-40 flex-grow justify-end items-stretch">
      <div class="membership_grid grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 items-stretch">
        <div class="membership_perks flex flex-col gap-6">
          <p class="text-sm !font-aeonik-fono uppercase tracking-[0.025em] font-medium">
            What's included
          </p>
          <ul class="membership_perks_list text-4xl !font-aeonik leading-[1em] tracking-[-0.025em]">
            <li>
              <img src="/images/icons/desk-office.svg" alt="Desk icon" class="benefit-icon" />
              <p>Your own fixed desk (no switching, ever)</p>
            </li>
            <li>
              <img src="/images/icons/people.svg" alt="Meeting room icon" class="benefit-icon" />
              <p>Private Meeting Room Access</p>
            </li>
            <li>
              <img src="/images/icons/wifi-full.svg" alt="WiFi icon" class="benefit-icon" />
              <p>Fast Wifi</p>
            </li>
            <li>
              <img src="/images/icons/target.svg" alt="Focus icon" class="benefit-icon" />
              <p>Quiet Focus Zones</p>
            </li>
            <li>
              <img src="/images/icons/chair.svg" alt="Chair icon" class="benefit-icon" />
              <p>Ergonomic Chairs</p>
            </li>
            <li>
              <img src="/images/icons/layout-window.svg" alt="Light icon" class="benefit-icon" />
              <p>Natural Light, Everywhere</p>
            </li>
            <li>
              <img src="/images/icons/blossom.svg" alt="Plant icon" class="benefit-icon" />
              <p>Plants You Don't Have to Water</p>
            </li>
            <li>
              <img src="/images/icons/cup-hot.svg" alt="Coffee icon" class="benefit-icon" />
              <p>Free Coffee, Equipped Kitchenette</p>
            </li>
            <li>
              <img src="/images/icons/unlocked.svg" alt="Secure access icon" class="benefit-icon" />
              <p>Secure Access</p>
            </li>
          </ul>
        </div>
        <div class="membership_pricing flex flex-col gap-6">

          <p class="text-sm !font-aeonik-fono uppercase tracking-[0.025em] font-medium">
            Membership
          </p>

          <div class="membership_pricing-card text-timberwolf bg-raisin-black p-8 flex-grow flex flex-col justify-between items-stretch gap-12">
            <div class="flex flex-col gap-12">
              <p class="text-6xl !font-aeonik leading-[1em] tracking-[-0.025em]">
                $499/month. <br />That's it.
              </p>
              <div class="grid grid-cols-2 gap-8">
                <div class="flex flex-col gap-2">
                  <p class="text-xs text-aeonik-fono font-medium uppercase tracking-[0.025em]">3-month minimum
                    commitment.</p>
                  <p class="text-sm">Because we're building a space for people who actually show up.</p>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xs text-aeonik-fono font-medium uppercase tracking-[0.025em]">Weekday access</p>
                  <p class="text-sm">Monday—Friday, 8am—6pm</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <MainButton variant="light" href="/apply">
                Become a member
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.logo_link) {
  color: var(--color-raisin-black);
}

:deep(.header_container) {
  @media only screen and (max-width: 64rem) {
    --nav-width: 100%;
    grid-template-columns: 1fr;
  }
}

.membership_perks ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.membership_perks ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 0.5em 0;
  border-top: 1px solid var(--color-raisin-black);
}

.membership_perks ul li:last-child {
  padding: 0.5em 0 0 0;
}

.membership_perks ul li img {
  width: 1.125em;
}
</style>