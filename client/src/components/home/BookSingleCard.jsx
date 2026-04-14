import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border border-blue-100 rounded-2xl px-5 py-4 m-2 md:m-3 relative hover:shadow-xl hover:-translate-y-1 transition-all bg-white/90 backdrop-blur'>
      <h2 className='absolute top-3 right-3 px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-xl'>
        {book.year}
      </h2>
      <h4 className='my-2 text-xs text-gray-500 break-all'>{book._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-blue-500 text-2xl' />
        <h2 className='my-1 font-bold text-lg text-slate-800 pr-20'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-blue-500 text-2xl' />
        <h2 className='my-1 text-slate-600'>{book.author}</h2>
      </div>
      <p
        className='mt-3 text-sm text-slate-600 leading-6 min-h-[78px]'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {book.description || 'No description added yet.'}
      </p>
      <div className='flex justify-between items-center gap-x-2 mt-2 p-3 rounded-xl bg-slate-50'>
        <BiShow
          className='text-3xl text-blue-700 hover:text-blue-900 cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/book/${book._id}`}>
          <BsInfoCircle className='text-2xl text-emerald-700 hover:text-emerald-900' />
        </Link>
        <Link to={`/update/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-amber-600 hover:text-amber-800' />
        </Link>
        <Link to={`/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-800' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

BookSingleCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default BookSingleCard;