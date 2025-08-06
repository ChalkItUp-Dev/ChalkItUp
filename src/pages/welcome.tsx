import DefaultLayout from '../layouts/default';
import { FaChartBar, FaTrophy, FaUsers } from 'react-icons/fa';

function WelcomePage() {
    return (
        <>
            <DefaultLayout title="Welcome to Chalk It Up">
                <div className="mt-12">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Track your billiard scores easily and without
                        complication.
                    </p>

                    <div className="grid grid-cols-1 gap-8 max-w-4xl mb-8">
                        <div className="flex flex-col items-center">
                            <FaChartBar
                                size={40}
                                className="text-green-500 mb-2"
                            />
                            <h2 className="text-xl font-semibold mb-1">
                                Track Games
                            </h2>
                            <p>Record every game and never lose track again.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaTrophy
                                size={40}
                                className="text-yellow-500 mb-2"
                            />
                            <h2 className="text-xl font-semibold mb-1">
                                View Statistics
                            </h2>
                            <p>
                                Analyze your performance and that of your
                                friends.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaUsers size={40} className="text-blue-500 mb-2" />
                            <h2 className="text-xl font-semibold mb-1">
                                Compete with Friends
                            </h2>
                            <p>
                                Compare yourself with other players and climb
                                the leaderboard.
                            </p>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}

export default WelcomePage;
