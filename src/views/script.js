
const myName = 'Adryan Chime'

const alertName = (name) => {
  if(window !== undefined) {
    return alert(name)
  }
}

alertName(myName)

const BASE_API = 'http://localhost:7000' || 'https://ad-hngi8-task-2.herokuapp.com'

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const form = new FormData()
  form.append('fullName', document.querySelector('.fullName').value)
  form.append('email', document.querySelector('.email').value)
  form.append('phone', document.querySelector('.phone').value)
  form.append('message', document.querySelector('.message').value)
  try {
    const res = await fetch(`${BASE_API}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        fullName: document.querySelector('.fullName').value,
        email: document.querySelector('.email').value,
        phone: document.querySelector('.phone').value,
        message: document.querySelector('.message').value
      })
    })
    const a = await res.json()

    if(a.status === 'success') {
      console.log(a)
      document.querySelector('.form-btn').style.background = '#12a950'
      document.querySelector('.form-btn').innerHTML = a.message
      
      setTimeout(() => {
        document.querySelector('.form-btn').removeAttribute('style')
        document.querySelector('.form-btn').innerHTML = 'SUBMIT'
        
      }, 3000);
    }
    if(a.status === 'error') {
      document.querySelector('.form-btn').style.background = '#FF3300'
      document.querySelector('.form-btn').innerHTML = a.message
      
      setTimeout(() => {
        document.querySelector('.form-btn').removeAttribute('style')
        document.querySelector('.form-btn').innerHTML = 'SUBMIT'
        
      }, 2000);
    }
    
  } catch (error) {
    console.log(e)
    
  }

  
})