import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-slate-950/65 backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[720px] max-w-full max-h-[92vh] overflow-y-auto bg-white rounded-2xl p-6 flex flex-col relative border border-blue-100 shadow-2xl'
      >
        <AiOutlineClose
          className='absolute right-5 top-5 text-2xl text-red-500 cursor-pointer hover:text-red-700'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-blue-100 text-blue-700 font-semibold rounded-xl'>
          {book.year}
        </h2>
        <h4 className='my-3 text-xs md:text-sm text-gray-500 break-all'>{book._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-blue-500 text-2xl' />
          <h2 className='my-1 text-2xl font-bold text-slate-800'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-blue-500 text-2xl' />
          <h2 className='my-1 text-lg text-slate-700'>{book.author}</h2>
        </div>
        <div className='mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4'>
          <p className='text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold'>Description</p>
          <p className='mt-2 text-slate-700 leading-7 whitespace-pre-wrap'>
            {book.description || 'No description added yet.'}
          </p>
        </div>
        <p className='mt-4 text-sm text-slate-500'>
          Genre: <span className='font-semibold text-slate-700'>{book.genre}</span> | Publisher:{' '}
          <span className='font-semibold text-slate-700'>{book.publisher}</span>
        </p>
      </div>
    </div>
  );
};

BookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.string,
    publisher: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;