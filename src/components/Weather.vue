<template>
  <div class="search-wrapper">
    <input type="text" :placeholder="$t('search')" v-model="search" />
  </div>
  <div class="weather-wrapper">
    <transition-group
      class="weather-container"
      v-if="!fetch"
      name="list"
      tag="div"
    >
      <div
        class="weather"
        :class="[station.temperature < 0 ? 'low' : 'normal']"
        v-for="station in findStation"
        :key="station.$id"
      >
        <div class="info">
          <p>
            <strong>{{ $t("weather.region") }}: </strong> {{ station.regio }}
          </p>
          <p>
            <strong>{{ $t("weather.measuring") }}: </strong>
            {{
              station.stationname.substr(station.stationname.indexOf(" ") + 1)
            }}
          </p>
        </div>
        <div class="data">
          <div
            class="temp"
            :class="[station.temperature < 0 ? 'low-temp' : null]"
          >
            {{ station.temperature }}°C
          </div>
          <div class="icon">
            <img
              v-if="station.weatherdescription === 'Zwaar bewolkt'"
              src="../assets/weather/clouds.svg"
            />
            <img
              v-else-if="
                station.weatherdescription === 'Zwaar bewolkt en regen'
              "
              src="../assets/weather/cloud-rain.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Zwaar bewolkt met lichte sneeuwval'
              "
              src="../assets/weather/cloud-snow.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Vrijwel onbewolkt (zonnig/helder)'
              "
              src="../assets/weather/sun.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Afwisselend bewolkt met (mogelijk) wat lichte regen'
              "
              src="../assets/weather/cloud-sun-rain.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Afwisselend bewolkt met lokaal mist(banken)'
              "
              src="../assets/weather/cloud-fog.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Zwaar bewolkt met wat lichte regen'
              "
              src="../assets/weather/cloud-rain.svg"
            />
            <img
              v-else-if="
                station.weatherdescription ===
                  'Mix van opklaringen en middelbare of lage bewolking'
              "
              src="../assets/weather/cloud-sun.svg"
            />
          </div>
        </div>
        <Ads v-slot:default="slotprop">
          <template
            v-if="
              station.stationname
                .substr(station.stationname.indexOf(' ') + 1)
                .toLowerCase() != 'twente'
            "
          >
            <img :src="slotprop.image2" />
          </template>
          <template v-else>
            <img :src="slotprop.image" />
          </template>
        </Ads>
      </div>
    </transition-group>
    <div class="fetching" v-if="fetch"></div>
  </div>
</template>

<script lang="ts">
import Ads from "./Ads.vue";
import { inject, defineComponent } from "vue";

interface Station {
  $id: string;
  stationname: string;
  temperature: number;
  regio: string;
}

export default defineComponent({
  name: "Weather",
  components: {
    Ads
  },
  data() {
    return {
      stations: [] as Station[],
      fetch: true as boolean,
      interval: 0,
      search: "" as string
    };
  },
  async created() {
    this.fetch = true;
    await this.getWeather();
    this.interval = setInterval(
      () => this.getWeather(),
      inject("wachtijd") as number
    );
    this.fetch = false;
  },
  computed: {
    findStation(): Station[] {
      return this.stations.filter(station => {
        return (
          station.stationname
            .substr(station.stationname.indexOf(" ") + 1)
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) !== -1
        );
      });
    }
  },
  methods: {
    async getWeather() {
      const response = await fetch("https://data.buienradar.nl/2.0/feed/json");
      const data = await response.json();
      const stationsRaw: Station[] = [];
      data.actual.stationmeasurements.map((station: Station) => {
        if (station.temperature !== undefined) {
          stationsRaw.push(station);
        }
      });
      stationsRaw.sort(this.compare);
      this.stations = stationsRaw;
    },

    compare(a: Station, b: Station) {
      if (a.temperature > b.temperature) {
        return -1;
      }
      if (a.temperature < b.temperature) {
        return 1;
      }
      return 0;
    }
  }
});
</script>

<style scoped>
.search-wrapper {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-wrapper > input {
  width: 800px;
  height: 40px;
  border-radius: 10px;
  border: 3px solid #003764;
  outline: none;
  font-size: 20px;
  padding: 0 5px;
}

p {
  margin: 0;
  color: #4d4d4d;
}

.fetching {
  margin-top: 50px;
  border: 16px solid #4d4d4d;
  border-top: 16px solid #003764;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.weather-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.weather-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0;
  margin: 20px 0;
  list-style: none;
}
.weather {
  padding: 5px;
  width: 380px;
  margin: 10px 10px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  background-color: #fff;
}

.weather img {
  margin-top: 20px;
  height: 50px;
  width: 100%;
}

.weather-container .list-enter-active,
.weather-container .list-leave-active {
  transition: opacity 0.5s;
  transition-timing-function: ease-in-out;
  opacity: 1;
}

.weather-container .list-enter-from,
.weather-container .list-leave-to {
  transition: opacity 0.5s;
  transition-timing-function: ease-in-out;
  opacity: 0;
}

.weather:hover {
  border-color: #99cc00;
  box-shadow: rgba(153, 204, 0, 0.19) 0px 10px 20px,
    rgba(153, 204, 0, 0.23) 0px 6px 6px;
  transform: translateY(-10px);
}

.low-temp {
  color: #ec0000 !important;
}

.low {
  border: 1px solid #ec0000;
  box-shadow: rgba(236, 0, 0, 0.19) 0px 10px 20px,
    rgba(236, 0, 0, 0.23) 0px 6px 6px;
}

.normal {
  border: 1px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.info {
  background-color: #fff;
}

.data {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 50%;
  text-align: center;
}

.temp {
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #4d4d4d;
}

.icon > img {
  height: 90px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
