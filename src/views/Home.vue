<!--
 * @Description: 
 * @Autor: fy
 * @Date: 2021-09-27 09:45:20
 * @LastEditors: fy
 * @LastEditTime: 2021-09-29 17:22:28
-->
<template>
    <div>
        <elesigncode :isUpload="false" />
    </div>
</template>

<script>
import elesigncode from '@/components/signature/c-elesigncode.vue'

export default {
    components: { elesigncode }
}
</script>

<style>
</style>