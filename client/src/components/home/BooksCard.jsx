import BookSingleCard from './BookSingleCard';
import PropTypes from 'prop-types';

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

BooksCard.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BooksCard;