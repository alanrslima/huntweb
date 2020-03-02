import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLoading from '../../components/Loading';
import api from '../../services/api';
import './styles.css';

export default function Main() {

  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts(index = 1) {
    setLoading(true);
    const response = await api.get(`/products?page=${index}`);
    const { docs, ...info } = response.data;
    setProducts(docs);
    setLoading(false);
    setPage(index);
    setProductInfo(info)
  }

  function nextPage() {
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    loadProducts(pageNumber);
  }

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadProducts(pageNumber);
  }

  return (
    <div className="product-list">
      <ModalLoading
        visible={loading}
      />
      {products.map(product => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`} >Acessar</Link>
        </article>
      ))}
      <div className="actions">
        <button disabled={page === 1} onClick={prevPage}>Anterior</button>
        <button disabled={page === productInfo.pages} onClick={nextPage}>Próximo</button>
      </div>
    </div>
  )
}