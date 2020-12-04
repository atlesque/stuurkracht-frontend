<template>
  <div v-show="isEmpty === false || showOnEmpty === true" class="flex">
    <button
      class="prev-button"
      :disabled="isPrevButtonActive === false"
      @click="handlePrevPageClick"
    >
      <span class="sr-only">Previous</span>
      <!-- Heroicon name: chevron-left -->
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <ul
      v-show="showNumbers === true && isLoading === false"
      class="flex items-center justify-center page-numbers"
    >
      <li
        v-for="pageNumber in pageNumbersList"
        :key="pageNumber"
        :class="{ 'text-theme-blue font-bold': pageNumber === currentPage + 1 }"
      >
        <button class="p-4" @click="handlePageNumberClick(pageNumber - 1)">
          {{ pageNumber }}
        </button>
      </li>
    </ul>
    <div v-show="isLoading === true" class="flex items-center px-4">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="24px"
        height="30px"
        viewBox="0 0 24 30"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
        class="text-theme-blue-light"
      >
        <rect x="0" y="13" width="4" height="5" fill="currentColor">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0s"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0s"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="10" y="13" width="4" height="5" fill="currentColor">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.15s"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.15s"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" y="13" width="4" height="5" fill="currentColor">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.3s"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.3s"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
    <button
      class="next-button"
      :disabled="isNextButtonActive === false"
      @click="handleNextPageClick"
    >
      <span class="sr-only">Next</span>
      <!-- Heroicon name: chevron-right -->
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="less" scoped>
.prev-button,
.next-button {
  @apply p-4;

  &[disabled] {
    @apply opacity-25;
  }
}
</style>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    showOnEmpty: {
      type: Boolean,
      default: false,
    },
    showNumbers: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    maxPagesVisible: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    isPrevButtonActive() {
      return this.isLoading === false && this.currentPage > 0;
    },
    isNextButtonActive() {
      return this.isLoading === false && this.currentPage + 1 < this.totalPages;
    },
    isEmpty() {
      return (
        this.isPrevButtonActive === false && this.isNextButtonActive === false
      );
    },
    pageNumbersList() {
      const pagers = [];
      // Number before currentPage
      for (
        let i = this.currentPage - this.maxPagesVisible + 1;
        i < this.currentPage;
        i++
      ) {
        if (i >= 0) {
          pagers.push(i + 1);
        }
      }
      // Number after currentPage
      for (
        let j = this.currentPage;
        j < this.currentPage + this.maxPagesVisible;
        j++
      ) {
        if (j < this.totalPages) {
          pagers.push(j + 1);
        }
      }
      return pagers;
    },
  },
  methods: {
    handlePrevPageClick() {
      if (this.isPrevButtonActive === true) {
        this.$emit("change", this.currentPage - 1);
      }
    },
    handleNextPageClick() {
      if (this.isNextButtonActive === true) {
        this.$emit("change", this.currentPage + 1);
      }
    },
    handlePageNumberClick(pageNumber) {
      if (this.isLoading === false) {
        this.$emit("change", pageNumber);
      }
    },
  },
};
</script>
