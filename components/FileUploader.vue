<template>
  <div class="relative">
    <div
      class="relative z-0 flex flex-col items-center justify-center flex-1 bg-gray-100"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        id="assetsFieldHandle"
        ref="file"
        type="file"
        class="absolute w-px h-px overflow-hidden opacity-0"
        accept=".jpg,.jpeg,.png"
        @change="onChange"
      />

      <label
        v-if="selectedFiles.length <= 0"
        for="assetsFieldHandle"
        class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53"
          height="53"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          class="mb-4"
        >
          <path
            d="M51 34.667v10.9c0 1.444-.574 2.83-1.595 3.85S47 51 45.556 51H7.444c-1.444 0-2.83-.574-3.85-1.595S2 47 2 45.556v-10.9M40.1 15.6L26.5 2 12.9 15.6"
          />
          <path d="M26.5 2v32.667" />
        </svg>
        <span>{{ uploadText }}</span>
      </label>
      <img
        v-if="allowMultiple === false && imagePreview != null"
        :src="imagePreview"
        alt="Uploaded image"
      />
      <ul
        v-if="allowMultiple === true && selectedFiles.length > 0"
        v-cloak
        class="mt-4"
      >
        <li
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="p-1 text-sm"
        >
          <span>{{ file.name }}</span>
          <button
            v-if="allowMultiple === true"
            class="ml-2"
            type="button"
            title="Remove file"
            @click="remove(selectedFiles.indexOf(file))"
          >
            {{ removeText }}
          </button>
        </li>
      </ul>
    </div>
    <button
      v-if="
        allowMultiple === false &&
        selectedFiles != null &&
        selectedFiles.length > 0
      "
      class="absolute inset-x-0 bottom-0 z-10 w-full p-2 text-red-600 bg-white"
      type="button"
      title="Remove file"
      @click="remove()"
    >
      {{ removeText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    uploadText: {
      type: String,
      default: "Klik hier om een bestand toe te voegen",
    },
    removeText: {
      type: String,
      default: "Verwijderen",
    },
    allowMultiple: {
      type: Boolean,
      default: false,
    },
    disableOtherDragEvents: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedFiles: [],
      imagePreview: null,
    };
  },
  mounted() {
    if (this.disableOtherDragEvents === true) {
      window.addEventListener("drop", (e) => {
        e.preventDefault();
      });
      window.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
    }
  },
  methods: {
    onChange() {
      this.imagePreview = null;
      if (this.allowMultiple === true) {
        this.selectedFiles = [...this.$refs.file.files];
      } else {
        const firstFile = this.$refs.file.files[0];
        this.selectedFiles = [firstFile];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(firstFile);
        fileReader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
      }
      this.$emit(
        "change",
        this.allowMultiple === true ? this.selectedFiles : this.selectedFiles[0]
      );
    },
    remove(i) {
      this.imagePreview = null;
      if (i != null && i >= 0) {
        this.selectedFiles.splice(i, 1);
      } else {
        this.selectedFiles = [];
        // HACK: Reset input element to allow reuploading a previously deleted file
        this.$refs.file.value = "";
      }
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    isFileOfType(file, filetype) {
      return (
        ((file || {}).fileMimeType &&
          file.fileMimeType.includes(filetype) === true) ||
        ((file || {}).type && file.type.includes(filetype) === true)
      );
    },
  },
};
</script>
