<template>
  <v-app dark>
    <v-container grid-list-xl>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs10>
          <v-card class="py-5">
            <v-layout align-center justify-center row>
              <h1>
                404
              </h1>
            </v-layout>
            <v-layout align-center justify-center row>
              <h2>
                A kért oldal nem található
              </h2>
            </v-layout>
            <v-layout align-center justify-center row class="pt-4">
              <router-link to="/admin">
                <v-btn
                  color="info"
                  dark
                >
                  Kezdőoldal
                </v-btn>
              </router-link>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
h1 {
  font-size: 6rem;
}
h2 {
  font-size: 3rem;
}
</style>
