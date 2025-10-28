import { useState } from 'react'
import { postJSON } from '../lib/api'
import { useNavigate } from 'react-router-dom'


export default function ContactForm() {
const nav = useNavigate()
const [form, set] = useState({ name:'', email:'', message:'' })
const onChange = e => set(v => ({ ...v, [e.target.name]: e.target.value }))
const submit = async e => {
e.preventDefault()
const ok = await postJSON('/api/contacts', form)
if (ok) nav('/thank-you')
}
const base = { background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', borderRadius:10, padding:'10px 12px' }
return (
<form onSubmit={submit} style={{ display:'grid', gap:10, maxWidth:480 }}>
<input name="name" placeholder="Name" value={form.name} onChange={onChange} required style={base} />
<input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required style={base} />
<textarea name="message" rows="5" placeholder="Message" value={form.message} onChange={onChange} required style={base} />
<button type="submit" style={{ background:'#fff', color:'#000', border:'none', padding:'10px 14px', borderRadius:10 }}>Send</button>
</form>
)
}