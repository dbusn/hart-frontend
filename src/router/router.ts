import {createWebHistory, createRouter} from "vue-router";
import Home from "@/components/Home.vue";
import Documentation from "@/components/Documentation.vue";
import Phonemes from "@/components/Phonemes.vue";
import Words from "@/components/Words.vue";
import Audio from "@/components/Audio.vue";
import Settings from "@/components/Settings.vue";
import Schedule from "@/components/Schedule.vue";
import WordTest from "@/components/WordTest.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/documentation",
        name: "Documentation",
        component: Documentation
    },
    {
        path: "/phonemes",
        name: "Phonemes",
        component: Phonemes,
    },
    {
        path: "/words",
        name: "Words",
        component: Words,
    },
    {
        path: "/audio",
        name: "Audio",
        component: Audio
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/schedule",
        name: "Schedule",
        component: Schedule,
    },
    {
        path: "/wordTest",
        name: "WordTest",
        component: WordTest,
    }]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
