import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';
import axiosClient, { getAuthHeaders } from '../api/axiosClient';

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/book/${id}`, {
          headers: getAuthHeaders(),
        });
        const { title, genre, author, year, pages, publisher, description: fetchedDescription } = res.data.data;
        setTitle(title);
        setGenre(genre);
        setAuthor(author);
        setYear(year);
        setPages(pages);
        setPublisher(publisher);
        setDescription(fetchedDescription || '');
      } catch (error) {
        enqueueSnackbar('Error fetching book', { variant: 'error' });
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, enqueueSnackbar]);

  if (loading) {
    return <Spinner />;
  }

  const handleEditBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.put(
        `/update/${id}`,
        {
          title,
          genre,
          author,
          year,
          pages,
          publisher,
          description,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      navigate('/');
      enqueueSnackbar('Book updated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error updating book', { variant: 'error' });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 my-4">Update Book</h1>
      <form onSubmit={handleEditBook} className='bg-white/90 border border-blue-100 rounded-3xl p-6 md:p-8 shadow-sm'>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-slate-600">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="genre" className="text-sm font-semibold text-slate-600">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="author" className="text-sm font-semibold text-slate-600">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="year" className="text-sm font-semibold text-slate-600">
              Publish Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="pages" className="text-sm font-semibold text-slate-600">
              Pages
            </label>
            <input
              type="text"
              name="pages"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="publisher" className="text-sm font-semibold text-slate-600">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="border border-blue-100 rounded-xl p-3 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="description" className="text-sm font-semibold text-slate-600">Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border border-blue-100 rounded-xl p-3 w-full mt-1 h-36 outline-none focus:ring-2 focus:ring-blue-200 resize-none'
            maxLength={1200}
            required
          />
          <p className='text-right text-xs text-slate-500 mt-1'>{description.length}/1200</p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl mt-5 transition-colors"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
