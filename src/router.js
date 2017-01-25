import home from './components/home.vue'
import checkin from './components/checkin.vue'
import books from './components/books.vue'
import user from './components/user.vue'

export default [{
    path: '/',
    name: 'home',
    component: home
}, {
    path: '/checkin/:userId',
    name: 'checkin',
    component: checkin
}, {
    path: '/books/:userId',
    name: 'books',
    component: books
}, {
    path: '/user',
    name: 'user',
    component: user
}]