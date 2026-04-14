import React from 'react'

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30">
  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
</div>
  )
}

export default Spinner