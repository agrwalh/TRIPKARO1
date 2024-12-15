import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItineraryList from '../components/dashboard/ItineraryList';
import { FaBars } from 'react-icons/fa';

function Dashboard() {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Currency Converter state
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Expense Tracker state
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Review Section state
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // Handling Tic-Tac-Toe game moves
  const handleClick = (index) => {
    const newBoard = gameBoard.slice();
    if (newBoard[index] || calculateWinner(newBoard)) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setGameBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Check for winner in Tic-Tac-Toe
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(gameBoard);

  // Fetch currencies for the Currency Converter
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    loadCurrencies();
  }, []);

  // Handle currency conversion
  const convertCurrency = async () => {
    if (amount === '' || isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      if (!rate) {
        alert(`Conversion rate not available for ${toCurrency}.`);
        return;
      }

      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
    } catch (error) {
      alert('Error fetching conversion rates. Please try again.');
    }
  };

  // Add expense to the list
  const addExpense = () => {
    if (!expenseName || !expenseAmount || isNaN(expenseAmount)) {
      alert('Please provide valid expense name and amount.');
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount).toFixed(2),
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  };

  // Add review to the list
  const addReview = () => {
    if (!reviewText || rating === 0) {
      alert('Please provide a valid review text and rating.');
      return;
    }

    const newReview = {
      text: reviewText,
      rating,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setReviewText('');
    setRating(0);
  };

  // Star Rating Component
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={() => setRating(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-4 space-y-8">
      <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Your Itineraries</h2>
          <div className="flex items-center gap-2">
            <Link
              to="/create-itinerary"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Create New Itinerary
            </Link>
            <FaBars className="text-white ml-2 cursor-pointer" />
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-md mt-6">
          <ItineraryList />
        </div>
      </div>

      {/* Entertainment Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Entertainment</h3>
        <ul className="list-disc pl-6 space-y-2 text-white">
          <li>
            <a
              href="https://in.bookmyshow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Cinema Booking - BookMyShow
            </a>
          </li>
          <li>
            <a
              href="https://www.netflix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Watch Movies Online - Netflix
            </a>
          </li>
          <li>
            <a
              href="https://www.amazon.in/Prime-Video/b?ie=UTF8&node=3010076031"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Watch Movies Online - Amazon Prime Video
            </a>
          </li>
          <li>
            <a
              href="https://www.hotstar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Watch Movies Online - Disney+ Hotstar
            </a>
          </li>
          <li>
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Music Streaming - Spotify
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Watch Videos - YouTube
            </a>
          </li>
        </ul>
      </div>

      {/* Currency Converter Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Currency Converter</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 rounded-md text-black"
            />
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="p-2 rounded-md"
            >
              <option value="USD">USD</option>
            </select>
            <span className="text-white">to</span>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="p-2 rounded-md"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={convertCurrency}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          >
            Convert
          </button>
          {convertedAmount && (
            <div className="mt-4 text-white text-lg">
              Converted Amount: {convertedAmount} {toCurrency}
            </div>
          )}
        </div>
      </div>

      {/* Tic-Tac-Toe Game Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Tic-Tac-Toe</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {gameBoard.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-16 h-16 bg-white text-2xl font-bold rounded-lg focus:outline-none"
            >
              {value}
            </button>
          ))}
        </div>
        {winner && <div className="text-white text-xl font-semibold">Winner: {winner}</div>}
      </div>

      {/* Expense Tracker Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Expense Tracker</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
          <button
            onClick={addExpense}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Expense
          </button>
          <ul className="mt-4 space-y-2 text-white">
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.name}: ${expense.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white mb-4">Leave a Review</h3>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 rounded-md text-black mb-4"
        ></textarea>
        <div className="flex items-center gap-2 mb-4">
          {renderStars(rating)}
        </div>
        <button
          onClick={addReview}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          Submit Review
        </button>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-white">Reviews</h4>
          <ul className="space-y-2 text-white">
            {reviews.map((review, index) => (
              <li key={index}>
                <div>{renderStars(review.rating)}</div>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
