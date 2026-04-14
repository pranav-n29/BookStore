import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import axiosClient, { getAuthHeaders } from '../api/axiosClient';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(
        '/create',
        {
          title,
          genre,
          author,
          year,
          pages,
          publisher,
          description,
          category: genre,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      enqueueSnackbar('Book created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || 'Error creating book', { variant: 'error' });
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BackButton />
      <div className="w-full mt-4 p-6 md:p-8 bg-white/90 border border-blue-100 rounded-3xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-800">Add a New Book</h1>
        <p className="text-slate-500 mb-6">Fill all fields so your book appears with full details in cards and modal previews.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-slate-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-slate-700 font-semibold mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
            </div>
            <div>
            <label htmlFor="author" className="block text-slate-700 font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
            <label htmlFor="year" className="block text-slate-700 font-semibold mb-1">
              Publish Year
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
            </div>
            <div>
            <label htmlFor="pages" className="block text-slate-700 font-semibold mb-1">
              Pages
            </label>
            <input
              type="text"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
            </div>
            <div>
            <label htmlFor="publisher" className="block text-slate-700 font-semibold mb-1">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full px-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-slate-700 font-semibold mb-1">Description</label>
            <textarea
              id="description"
              className="border border-blue-100 px-4 py-3 w-full h-36 rounded-xl focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short summary, highlights, and why this book matters..."
              required
              maxLength={1200}
            />
            <p className="text-right text-xs text-slate-500 mt-1">{description.length}/1200</p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
