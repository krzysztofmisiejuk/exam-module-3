import RecomendationCarousel from './RecomendationCarousel'

export default async function Recommendations() {
	const response = await fetch('http://localhost:3000/api/product/random')
	const products = await response.json()

	return <RecomendationCarousel products={products.randomProducts} />
}
