import React, {useState} from 'react'
import api from '../../services/api'


export default function Login({ history }){
    const [email, setEmail] = useState('');


    async function handleSubmit(event){
      event.preventDefault();
  
      // email
  
      const response = await api.post('/sessions', {email});
      const { _id} = response.data;
      localStorage.setItem('user', _id);  // salvando o id no banco de dados do navegador
      history.push('/dashboard')
      
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talents</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                id="email" 
                type="email" 
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
        )
}