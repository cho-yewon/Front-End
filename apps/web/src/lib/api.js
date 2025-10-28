export async function getJSON(url) {
const r = await fetch(url)
if (!r.ok) throw new Error('Network')
return r.json()
}
export async function postJSON(url, body) {
const r = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) })
return r.ok
}