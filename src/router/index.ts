import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListViewVue from '@/views/ListView.vue';
import SearchViewVue from '@/views/SearchView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/:tabName',
            component: ListViewVue
        },
        {
            path: '/search',
            component: SearchViewVue
        }
    ]
});

export default router;
