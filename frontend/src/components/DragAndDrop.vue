<script setup >
import { ref } from 'vue'
import axios from 'axios'
const fileList = ref([])
const loading = ref(false)
const uploadApi = async (body) => {
    try {
        let resp = await axios.post('http://localhost:8001/upload', body)
        // if(resp) window.alert("file saved successfully")
        return resp
    } catch (e) {
        window.alert(e)
        throw new Error("Error while uploading images")
    }
}
const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
}
const handleFileSelect = () => {
    const files = this.$refs.fileInput.files;
    handleFiles(files);
}
const handleFiles = (files) => {
    // Process the files (e.g., upload, display, etc.)
    fileList.value.push(...files)
    console.log('Selected Files:', fileList.value);
}

const upload = async () => {
    try {
        loading.value = true
        for (let file of fileList.value) {
            let fd = new FormData()
            fd.append('file', file);
            await uploadApi(fd)
        }
        loading.value = false
        fileList.value = []

        window.alert("File uploaded successfully")
    }
    catch (e) {
        loading.value = false
        window.alert(e)
    }
}

</script>

<template>
    <div class="ma-2">
        <div class="file-drop" @dragover.prevent @drop="handleDrop">
            <p>Drag and drop your files here, or click to select files</p>
            <input type="file" ref="fileInput" @change="handleFileSelect($event)" style="display: none" />
        </div>

        <div class="mt-3">
            <v-btn :disabled="!fileList.length" color="primary" @click="upload()" :loading="loading">
                upload
            </v-btn>
        </div>


        <div class=" mt-2">
            <p>
                Total Files : {{ fileList.length }}
            </p>
            <v-card  v-for="(file, i) in fileList" :key="i" class="pa-3 mt-2" variant="outlined" style="max-width:500px ;">
               
                <div style="display: flex;">
                    <p class="text-caption mr-auto">
                    sr no. : {{ i +1 }}
                </p>
                    <p class="text-caption">
                    Name : {{ file.name }}
                </p>                   
                 <p class="text-caption ml-auto">
                    Size : {{ file.size/1000  }}kb
                </p>

                <!-- <p class="text-caption ml-auto">
                    Status : {{ file.status }}
                </p> -->
                </div>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.file-drop {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.file-drop p {
    margin: 0;
}

.file-drop:hover {
    background-color: #f9f9f9;
}

.doc {
    height: 80px;
    width: 82px;
    border: 2px solid black;
    overflow: hidden;
}

.docList {
    display: flex;
    gap: 2px
}

.mt-2 {
    margin-top: 8px;
}
</style>