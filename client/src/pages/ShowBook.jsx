import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axiosClient, { getAuthHeaders } from '../api/axiosClient';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/book/${id}`, {
        headers: getAuthHeaders(),
      })
      .then((resp) => {
        setBook(resp.data);
        setLoading(false);
        console.log('book.data response:', resp.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  console.log("book object: ", book.data);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white/90 border border-blue-100 shadow-sm rounded-3xl px-6 md:px-8 pt-6 pb-8 mb-4">
          {Object.keys(book).length === 0 ? (
            <p className="text-gray-500 text-xl">No data available</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Title</label>
                <p className="text-2xl text-slate-800 font-bold">{book.data.title}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Genre</label>
                  <p className="text-lg text-slate-700">{book.data.genre}</p>
                </div>
                <div>
                  <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Author</label>
                  <p className="text-lg text-slate-700">{book.data.author}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Publish Year</label>
                  <p className="text-lg text-slate-700">{book.data.year}</p>
                </div>
                <div>
                  <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Pages</label>
                  <p className="text-lg text-slate-700">{book.data.pages}</p>
                </div>
                <div>
                  <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Publisher</label>
                  <p className="text-lg text-slate-700">{book.data.publisher}</p>
                </div>
              </div>
              <div className='mb-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4'>
                <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Description</label>
                <p className="text-slate-700 mt-2 leading-7 whitespace-pre-wrap">{book.data.description || 'No description added yet.'}</p>
              </div>
              <div className="mb-2">
                <label className="block text-slate-500 text-sm font-semibold uppercase tracking-[0.2em]">Last Update Time</label>
                <p className="text-slate-700">{new Date(book.data.updatedAt).toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
