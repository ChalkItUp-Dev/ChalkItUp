import DefaultLayout from '../layouts/default';
import { Link } from '@heroui/link';

function WelcomePage() {
    return (
        <>
            <DefaultLayout title="Chalk It Up">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mb-8">
                        <div className="flex flex-col items-center">
                            <Link href="/" className="flex flex-col">
                                <i className="fa-solid fa-trophy"></i>

                                <h2 className="text-xl font-semibold mb-1 text-black">
                                    Welcome
                                </h2>
                            </Link>
                            <p>
                                Track your billiard scores easily and without
                                complication.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href="/games" className="flex flex-col">
                                <i className="fa-solid fa-trophy"></i>

                                <h2 className="text-xl font-semibold mb-1 text-black">
                                    Track Games
                                </h2>
                            </Link>
                            <p>Record every game and never lose track again.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href="/players" className="flex flex-col">
                                <i className="fa-solid fa-trophy"></i>

                                <h2 className="text-xl font-semibold mb-1 text-black">
                                    View Statistics
                                </h2>
                            </Link>
                            <p>
                                Analyze your performance and that of your
                                friends.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href="/players" className="flex flex-col">
                                <i className="fa-solid fa-trophy"></i>

                                <h2 className="text-xl font-semibold mb-1 text-black">
                                    Compete with Friends
                                </h2>
                            </Link>
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
