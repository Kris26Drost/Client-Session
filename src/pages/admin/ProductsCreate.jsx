import { useEffect, useState } from 'react'
import { usePostData } from '../../hooks/useRequestData'

const ProductsCreate = () => {

  // hook til post/opret data til api
  const { error, loading, data, postData } = usePostData()

  const [message, setMessage] = useState()

  useEffect(() => {

    setMessage('Nyt produkt')

    if (data && data.product) {
      document.forms[0].reset();

      setMessage('Nyt produkt er oprettet')

      // document.querySelector('form').reset()
      // document.querySelectorAll('form')[0].reset()
      // document.getElementsByClassName('form')[0].reset()
    }
  }, [data])


  // Send formular-data til API med brug af hook
  const handleSubmit = (e) => {

    e.preventDefault()  //VIGTIG: For at ungså rload af sidnen ved submit!

    let formdata = new FormData(e.target)

    // send til hook som sender til API
    postData('http://localhost:6540/api/products', formdata)
  }


  return (
    <div>
      {
        error && <h2>Der er opstået en fejl</h2>
      }

      {
        loading && <h2>Der loades...</h2>
      }

      {
        message && <h2>{ message }</h2>
      }

      <h1>ProductsCreate</h1>

      <form onSubmit={ handleSubmit } onFocus={() => setMessage()}>
        <div>
          <label> Produktets navn <br />
            <input type="text" name='productName' required plceholder='Produktets navn' />
          </label>
        </div>
        <div>
          <label> Pris <br />
            <input type="text" name='productPrice' required plceholder='Pris' />
          </label>
        </div>
        <div>
          <label> Teaser <br />
            <textarea type="text" name='productTeaser' required plceholder='Kort produktbeskrivelse' />
          </label>
        </div>
        <div>
          <label> Beskrivelse <br />
            <textarea type="text" name='productDescription' required plceholder='Lang produktbeskrivelse' />
          </label>
        </div>
        <div>
          <label> Image <br />
            <input type="file" name='productImage' />
          </label>
        </div>

        <button type='submit'>Opret Produkt</button>

      </form>
    </div>
  )
}

export default ProductsCreate