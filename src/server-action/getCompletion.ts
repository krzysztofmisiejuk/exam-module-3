'use server'
import { Product } from '@/types/types'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// Funkcja do formatowania listy produktów jako tekst
function formatProductList(products: Product[]): string {
	return products
		.map((product) => {
			return `
Nazwa: ${product.name}
Kategoria: ${product.categoryName}
Marka: ${product.brandName}
Opis: ${product.description}
Cena: ${product.price} PLN
Rabat: ${product.discount ? `${product.discount} PLN` : 'Brak'}
Dostępność: ${product.stock} szt.
            `.trim()
		})
		.join('\n\n---\n\n')
}

export async function getCompletion(
	messageHistory: {
		role: 'user' | 'assistant'
		content: string
	}[],
	productList: Product[]
) {
	console.log('List in get completion', productList)

	// Formatowanie listy produktów
	const formattedProductList = formatProductList(productList)

	// Prompt systemowy z listą produktów
	const initialPrompt = {
		role: 'system' as const,
		content: `
Jesteś asystentem w sklepie internetowym. Twoim zadaniem jest pomaganie klientom w doborze odpowiednich produktów na podstawie ich pytań i potrzeb. Poniżej znajduje się lista dostępnych produktów w sklepie. Używaj tej listy, aby udzielać precyzyjnych odpowiedzi, podając szczegóły produktów, takie jak nazwa, cena, rabat, marka, kategoria i dostępność. Jeśli klient pyta o coś, co nie pasuje do listy, poinformuj, że taki produkt nie jest dostępny, ale zaproponuj alternatywy z listy. Odpowiadaj w sposób uprzejmy, zwięzły i profesjonalny.

### Lista produktów:
${formattedProductList}
        `.trim(),
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [initialPrompt, ...messageHistory],
	})

	const messages = [
		...messageHistory,
		response.choices[0].message as unknown as {
			role: 'user' | 'assistant'
			content: string
		},
	]

	return { messages }
}
