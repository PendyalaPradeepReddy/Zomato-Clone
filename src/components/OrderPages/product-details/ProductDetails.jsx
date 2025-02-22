import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import dbServices from '../../../appwrite/DBconfig'
import Container from '../../container/Container'

function ProductDetails() {
  const { slug } = useParams()
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {

    if (slug) {
      dbServices.getProducts(slug).then((data) => {
        if (data) {
          setProducts(data)
        } else {
          toast.warn("Sorry Products Not Found")
        }
      })
    }
    else {
      navigate("/");
    }
  }, [slug, navigate])

  console.log(products)

  return (
    <>
      <div className="w-full bg-red-800 py-3 pb-14"></div>
      <div className='w-full bg-white'>
        <Container>
          <div className='max-w-6xl mx-auto px-3 py-2 mt-16'>
            <h2 className='text-2xl font-semibold'>Product Details:</h2>
            <div className='flex justify-center items-center gap-20'>
              {/* left small iamge */}
              <div className='flex flex-col gap-3'>
                <img src="https://cloud.appwrite.io/v1/storage/buckets/664510550020ada30a3a/files/664cc05b2e09e3985403/preview?project=6637c9ec00074a52f5a5" alt="" className='h-20 w-20 cursor-pointer rounded' />
         
                <img src="https://cloud.appwrite.io/v1/storage/buckets/664510550020ada30a3a/files/664cc05b2e09e3985403/preview?project=6637c9ec00074a52f5a5" alt="" className='h-20 w-20 cursor-pointer rounded' />
         
                <img src="https://cloud.appwrite.io/v1/storage/buckets/664510550020ada30a3a/files/664cc05b2e09e3985403/preview?project=6637c9ec00074a52f5a5" alt="" className='h-20 w-20 cursor-pointer rounded' />
         
                <img src="https://cloud.appwrite.io/v1/storage/buckets/664510550020ada30a3a/files/664cc05b2e09e3985403/preview?project=6637c9ec00074a52f5a5" alt="" className='h-20 w-20 cursor-pointer rounded' />
         
              </div>
              {/* leeft image */}
              <div>
                <img src="https://cloud.appwrite.io/v1/storage/buckets/664510550020ada30a3a/files/664cc05b2e09e3985403/preview?project=6637c9ec00074a52f5a5" alt="" className=' h-80 rounded ' />
              </div>
              {/* right conent */}
              <div>
                <h3>Mix Veg</h3>
                <p>3 * (381 Rating & 1 Review)</p>
                <p>₹2250</p>
                <p>(Incl. all Taxes)</p>
                <hr />
                <p><span className='line-through'>MRP: ₹2750</span>(Save ₹500, 18.18% off)</p>
                <button>Buy Now</button>
                <p>Key Features: {slug}</p>

              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductDetails