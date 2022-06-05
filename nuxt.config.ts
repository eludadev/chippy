import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	build: {
		postcss: {
			postcssOptions: require('./postcss.config.js')
		}
	},
	css: [
		'@/assets/css/main.css'
	]
})
