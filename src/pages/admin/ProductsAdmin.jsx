import { useEffect } from 'react'
import { useGetData, useDeleteData } from '../../hooks/useRequestData'

const ProductsAdmin = () => {

  const { error, loading, data: products, getData } = useGetData()
  const { error: errorDelete, loading: loadingDelete, data, deleteData } = useDeleteData()

  useEffect(() => {
    // Kald hook som bruger axios til at hente data
    getData('http://localhost:6540/api/products')

  }, [data])



  // Håndter sletning af produkt ud fra dets id
  const handleDelete = (id, product) => {
    if (window.confirm('Er du sikker på at du vil slette:'+ product ) ) {

      deleteData('http://localhost:6540/api/products/' + id)
    }
  }


  return (
    <div className="products-admin">

      <h1>ADMIN Produkter</h1>

      { (error || errorDelete) && <h2>Der er sket en fejl</h2> }
      { (loading || loadingDelete) && <h2>Der loades...</h2> }

      {
        products && products.products.map((p) =>
          <div className='card bg-dark p-5 my-2'>
            <h2>{ p.productName }</h2>
            <p>{ p.productTeaser }</p>
            <button onClick={ () => handleDelete(p._id) }>Slet</button>
          </div>
        )
      }

    </div>
  )
}


export default ProductsAdmin