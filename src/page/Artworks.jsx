import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../component/search_bar/Search_bar'
import Navbar from '../component/Navbar'
import ProductCard from '../component/prodect_card/Product_card'

const Artworks = () => {
      const cards = [1, 2, 3, 4, 5];

  return (
    
<>
<Navbar />
<SearchBar />
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {cards.map((card) => (
          <ProductCard key={card} />
        ))}
      </div>

</>
  )
}

export default Artworks