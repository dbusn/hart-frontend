<script setup>
import { onMounted } from 'vue';
import { animate, spring, timeline } from 'motion';

export default {
    props: ['input'], 
    mounted() {
        const motor1 = animate(".1.vibrate", { scale: 1.1 },
        {
            duration: 1,
            easing: spring(),
            repeat: Infinity,
            direction: "alternate",
        });
    }
}

</script>