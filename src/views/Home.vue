<template>
    <div class="home">
        <div class="input">
            <input
                type="text"
                class="inputModel"
                v-model="SearchKey"
                placeholder="搜尋商店名稱或商店ID"
            />
            <font-awesome-icon
                class="closeIcon"
                icon="times-circle"
                v-show="SearchKey !== ''"
                @click="SearchKey = ''"
            />
            <div
                class="searchbox"
                v-show="SearchKey !== '' && Keyword_Filter.length > 1"
            >
                <ul>
                    <li
                        v-for="item in Keyword_Filter"
                        @click="SearchKey = API_Data[item].item.name"
                        :key="item"
                    >
                        <font-awesome-icon class="searchIcon" icon="search" />
                        {{ API_Data[item].item.name }}
                    </li>
                </ul>
            </div>
        </div>

        <MarketList
            :All_Market_Filter="All_Market_Filter"
            :API_Data="API_Data"
        />
    </div>
</template>

<script>
import MarketList from '@/components/MarketList.vue';

export default {
  name: 'Home',
  components: {
    MarketList,
  },
  data() {
    return {
      API_Data: {},
      MarketName: [],
      SearchKey: '',
    };
  },
  computed: {
    Keyword_Filter() {
      const vm = this;
      return vm.MarketName.filter((item) => {
        if (
          vm.API_Data[item].item.name
            .toLowerCase()
            .indexOf(vm.SearchKey) !== -1
                    && vm.SearchKey !== ''
        ) {
          return vm.API_Data[item].item.name;
        }
        return null;
      });
    },
    All_Market_Filter() {
      const vm = this;
      return vm.MarketName.filter((item) => {
        if (item === vm.SearchKey) {
          return item;
        }
        if (
          vm.API_Data[item].item.name.indexOf(vm.SearchKey) !== -1
                    || vm.API_Data[item].item.name
                      .toLowerCase()
                      .indexOf(vm.SearchKey) !== -1
        ) {
          return item;
        }
        return null;
      });
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get('/biggo_sitetype.json').then((res) => {
        this.API_Data = res.data;
        this.MarketName = Object.keys(res.data);
      });
    },
  },
};
</script>
