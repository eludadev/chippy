import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	head: {
		meta: [
			{ hid:'description', name:'description', content:'Add this chip input component to your website, at no cost.' },
		    { hid:'og:image', property: 'og:image', content: '/cover.png' },
		    { hid:'twitter:image', property: 'twitter:image', content: '/cover.png' }
		],
		title: 'Chippy Demo',
		charset: 'utf-8',
		viewport: 'width=device-width, initial-scale=1',
		link: [
			{ rel: 'icon', href: '/favicon.ico' }
		]
	},
	build: {
		postcss: {
			postcssOptions: require('./postcss.config.js')
		}
	},
	css: [
		'@/assets/css/main.css'
	]
})
