import 'server-only'

const url = process.env.DATA_ENDPOINT_URL!

export async function getData() {
    const res = await fetch(url, {next: {revalidate: 30}})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}