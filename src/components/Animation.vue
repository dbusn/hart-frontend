<script setup lang="ts">
import { onMounted } from 'vue';
import { animate, spring, timeline } from 'motion';

export default {
    name: 'Animation',
    props: ['input'], 
    onMounted(props : any) {
        function createConst(i : number, duration : number) {
            const motor = [
                "." + i + ".lightup",
                { color: "purple" },
                {
                    duration: duration,
                    easing: spring(),
                    direction: "alternate"
                }
            ];
            return motor;
        }

        const patterns = props['input'].pattern;
        
    }
}

</script>

<template>
    <div class="motor1"/>
    <div class="motor2"/>
    <div class="motor3"/>
    <div class="motor4"/>
    <div class="motor5"/>
    <div class="motor6"/>
    <div class="motor7"/>
    <div class="motor8"/>
    <div class="motor9"/>
    <div class="motor10"/>
    <div class="motor11"/>
    <div class="motor12"/>
    <div class="motor13"/>
    <div class="motor14"/>
    <div class="motor15"/>
    <div class="motor16"/>
    <div class="motor17"/>
    <div class="motor18"/>
    <div class="motor19"/>
    <div class="motor20"/>
    <div class="motor21"/>
    <div class="motor22"/>
    <div class="motor23"/>
    <div class="motor24"/>
</template>

<style scoped>
.motor1 {
    
}

.motor2 {
    
}

.motor3 {
    
}

.motor4 {
    
}

.motor5 {
    
}

.motor6 {
    
}

.motor7 {
    
}

.motor8 {
    
}

.motor9 {
    
}

.motor10 {
    
}

.motor11 {
    
}

.motor12 {
    
}

.motor13 {
    
}

.motor14 {
    
}

.motor15 {
    
}

.motor16 {
    
}

.motor17 {
    
}

.motor18 {
    
}

.motor19 {
    
}

.motor20 {
    
}

.motor21 {
    
}

.motor22 {
    
}

.motor23 {
    
}

.motor24 {
    
}
</style>