import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <header className="text-center py-10 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
                <h1 className="text-5xl font-extrabold mb-2">Treasure awaits you</h1>
                <p className="text-lg font-light">Play and win big with our exciting games!</p>
            </header>

            {/* Games Section */}
            <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                
                {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Money Coming</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while avoiding the mines. Can you handle the pressure?
                    </p>
                    <Link
                        to="/mc"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div> */}

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Mines</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while avoiding the mines. Can you handle the pressure?
                    </p>
                    <Link
                        to="/mines"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>


                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Alibaba</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning. Can you handle the pressure?
                    </p>
                    <Link
                        to="/alibaba"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Charge Buffalo</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <Link
                        to="/charge-buffalo"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Boxing King</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <Link
                        to="/boxing-king"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Crazy 777</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <Link
                        to="/crazy"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Mega Ace</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <a
                        href="https://mega-ace.vercel.app/"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Play Now
                    </a>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Fortune Gems </h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <a
                        href="https://fortune-gems.vercel.app/"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Play Now
                    </a>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">                   
                    ⭐
                    <h2 className="text-3xl font-bold mb-2">Fortune Gems 2</h2>
                    <p className="text-gray-400 mb-4">
                        Test your luck and uncover treasures while spinning the wheels. Can you handle the pressure?
                    </p>
                    <Link
                        to="https://fortune-games-2.vercel.app/"
                        className="block w-full text-center bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Play Now
                    </Link>
                </div>


                
            </section>

            {/* Footer */}
            <footer className="text-center py-6 bg-gray-800">
                <p className="text-gray-500">&copy; 2024 Casino Royale. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
