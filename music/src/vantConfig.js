import {
    Popup,
    Form,
    Field,
    Button,
    Icon,
    Notify,
    Toast,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    Tab,
    Tabs,
    Slider,
    Dialog,
    ImagePreview,
    List,
    cell,
    NavBar,
    Overlay,
} from 'vant'

const vants = [Popup, Form, Field, Button, Icon, Notify,
    Toast, Search, Swipe, SwipeItem, Lazyload,
    Tab, Tabs, Slider, Dialog, ImagePreview, List, cell, NavBar, Overlay
]

export default {
    install(Vue) {
        vants.forEach(Componet => {
            Vue.use(Componet)
        })
    }
}