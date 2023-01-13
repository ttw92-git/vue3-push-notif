<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ReloadPWA  from '@/components/ReloadPWA.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <div>
        Registered Number is 
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

export default {
  name: "App",
  created() {
    try {
      // firebase
      //   .messaging()
      //   .requestPermission()
      //   .then(() => {
      //     console.log("Notification permission granted");
          firebase
            .messaging()
            .getToken()
            .then((token) => {
              window.console.log("token ", token);
              this.receiveMessage();
            })
            .then(token => {
              this.subscribeTokenToTopic(token, 'allUsers');
            });
      //   })
      //   .catch((err) => {
      //     console.log("Unable to get token ", err);
      //   });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    receiveMessage() {
      try {
        firebase.messaging().onMessage((payload) => {
          console.log("payload ", payload);
        });
      } catch (e) {
        console.log(e);
      }
    },
    subscribeTokenToTopic(token, topic) {
      fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Bearer ya29.a0ARrdaM_15IPCdUYwUYV7-eJdmV3-3txwMhY9pAOYowUcVPGCh7pQvNnBzAznshaPyWh2AYPbGuLkNH7Hy732h74hibpRxPniSi-30B_VhHgdrexW1YH5P5jskqqEVWkF308w2AIRApit4pKMZNj64K3zH_yZ'
        })
      }).then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "'+topic+'"');
      }).catch(error => {
        console.error(error);
      })
    }
  },
};
</script>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
