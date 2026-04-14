import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';
import axiosClient, { getAuthHeaders } from '../api/axiosClient';
import { useAuth } from '../auth/AuthContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get('/allbooks', {
          headers: getAuthHeaders(),
        });
        setBooks(res.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [user]);

  console.log('books object:', books);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <header className='rounded-3xl border border-blue-100 bg-white/90 backdrop-blur px-6 py-6 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-5'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Digital Shelf</p>
          <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800'>Books List</h1>
          <p className='text-slate-500 mt-1'>Track, review, and manage your collection with richer metadata.</p>
          <p className='text-slate-700 mt-2 font-medium'>
            {user ? `Welcome, ${user.name}.` : 'Login to see your personal book collection.'}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Link to='/create'>
            <button className='flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors'>
              <MdOutlineAddBox className='text-xl mr-1' />
              Add Book
            </button>
          </Link>
          {user ? (
            <button
              className='bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors'
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link to='/login' className='bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors'>
              Login
            </Link>
          )}
        </div>
      </header>

      <section className='mt-6 rounded-2xl bg-white/85 border border-blue-100 p-4 shadow-sm flex flex-wrap justify-between items-center gap-4'>
        <p className='text-sm font-medium text-slate-600'>
          {user ? (
            <>Total books in your shelf: <span className='font-bold text-slate-900'>{books.length}</span></>
          ) : (
            'Your shelf appears after login.'
          )}
        </p>
        <button
          className={`${
            showType === 'table' ? 'bg-blue-700' : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
          } px-4 py-2 rounded-xl text-sm md:text-base text-white font-semibold transition-colors`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`${
            showType === 'card' ? 'bg-blue-700' : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
          } px-4 py-2 rounded-xl text-sm md:text-base text-white font-semibold transition-colors`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </section>

      <div className='mt-6'>
        {loading ? <Spinner /> : showType === 'card' ? <BooksCard books={books} /> : <BooksTable books={books} />}
      </div>
    </div>
  );
};

export default Home;
