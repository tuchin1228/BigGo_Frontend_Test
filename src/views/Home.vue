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

<style scoped lang="scss">
/* .input {
    position: relative;
    width: 90%;
    max-width: 500px;
    margin: 2vh auto;
}
.input .inputModel {
    display: block;
    width: 100%;
    padding: 5px 10px;
    font-size: 1.6rem;
    border-radius: 5px;
    outline: none;
    border: 2px solid rgb(128, 128, 128);
    transition: 0.3s;
    &:focus {
        border: 2px solid rgb(74, 109, 173);
    }
}
.input .closeIcon {
    position: absolute;
    top: 50%;
    right: 0;
    font-size: 1.2rem;
    transform: translate(-100%, -50%);
    color: rgb(197, 197, 197);
    outline: none;
    &:hover {
        cursor: pointer;
        color: rgb(116, 116, 116);
    }
}
.input .searchbox {
    position: absolute;
    overflow-y: scroll;
    top: 52px;
    left: 50%;
    width: 100%;
    height: 400px;
    transform: translate(-50%, 0%);
    background: rgb(241, 241, 241);
    ul {
        padding: 0;
    }
    ul li {
        padding: 10px;
        list-style: none;
        font-size: 1rem;
        &:hover {
            background: rgb(230, 230, 230);
        }
    }
} */
</style>
