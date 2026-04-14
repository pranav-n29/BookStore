import { AiOutlineEdit } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BooksTable = ({books}) => {
  return (
    <>
                <div className='rounded-2xl border border-blue-100 overflow-hidden bg-white/90 backdrop-blur shadow-sm'>
                <table className='table-auto w-full'>
          <thead>
            <tr className='bg-blue-50 text-left'>
              <th className='px-4 py-3 border-b border-blue-100'>No</th>
              <th className='px-4 py-3 border-b border-blue-100'>Title</th>
              <th className='px-4 py-3 border-b border-blue-100 max-md:hidden'>Genre</th>
              <th className='px-4 py-3 border-b border-blue-100 max-md:hidden'>Author</th>
              <th className='px-4 py-3 border-b border-blue-100'>Year</th>
              <th className='px-4 py-3 border-b border-blue-100 max-md:hidden'>Pages</th>
              <th className='px-4 py-3 border-b border-blue-100 max-md:hidden'>Publisher</th>
              <th className='px-4 py-3 border-b border-blue-100 max-lg:hidden'>Description</th>
              <th className='px-4 py-3 border-b border-blue-100'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='hover:bg-slate-50 transition-colors'>
                <td className='border-b border-blue-50 text-slate-500 px-4 py-3'>{index + 1}</td>
                <td className='border-b border-blue-50 text-slate-800 font-semibold px-4 py-3'>{book.title}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3 max-md:hidden'>{book.genre}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3 max-md:hidden'>{book.author}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3'>{book.year}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3 max-md:hidden'>{book.pages}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3 max-md:hidden'>{book.publisher}</td>
                <td className='border-b border-blue-50 text-slate-600 px-4 py-3 max-lg:hidden max-w-[320px] truncate'>
                  {book.description || 'No description'}
                </td>
                <td className='border-b border-blue-50 text-green-500 px-4 py-3'>
                  <div className='flex items-center gap-2'>
                  <Link to={`/update/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-blue-500 hover:text-blue-600' />
                  </Link>
                  <Link to={`/book/${book._id}`}>
                    <FaInfoCircle className='text-2xl text-yellow-500 hover:text-yellow-600' />
                  </Link>
                  <Link to={`/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-500 hover:text-red-600' />
                  </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </>
  )
}

export default BooksTable

BooksTable.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};